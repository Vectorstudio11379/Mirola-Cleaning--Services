import { CONTACT_INFO } from '../constants/contactInfo';

export interface LeadSubmissionPayload {
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  facilityTypes?: string[];
  squareFootage?: string;
  message?: string;
  formType: string;
}

export interface SubmissionResult {
  success: boolean;
  message: string;
  error?: string;
  mailtoUrl?: string;
  gmailUrl?: string;
}

/**
 * Generate fallback mailto & Gmail draft links in case of offline/network issues
 */
export function generateEmailLinks(payload: LeadSubmissionPayload) {
  const subject = `[Mirola Website Request] ${payload.formType} - ${payload.company || payload.fullName || 'Commercial Client'}`;
  const facilities = payload.facilityTypes && payload.facilityTypes.length > 0 
    ? payload.facilityTypes.map(f => `  • ${f}`).join('\n')
    : '  • Commercial Facility (Standard)';

  const body = 
`Hello Mirola Commercial Cleaning Team,

I would like to request an on-site facility inspection and proposal.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FACILITY WALKTHROUGH DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Full Name: ${payload.fullName}
• Company / Property: ${payload.company || 'N/A'}
• Corporate Email: ${payload.email}
• Direct Phone: ${payload.phone || 'N/A'}
${payload.squareFootage ? `• Estimated Area: ${payload.squareFootage}\n` : ''}
FACILITY CLASSIFICATION(S):
${facilities}

SPECIFIC PRIORITIES / SCOPE:
${payload.message?.trim() ? payload.message.trim() : 'Standard commercial janitorial walkthrough requested.'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Please contact me to coordinate next steps.

Best regards,
${payload.fullName}
${payload.company ? `${payload.company}\n` : ''}${payload.phone || ''}`;

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_INFO.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const mailtoUrl = `mailto:${encodeURIComponent(CONTACT_INFO.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return { gmailUrl, mailtoUrl, subject, body };
}

/**
 * Submit lead directly in background
 */
export async function submitLeadDirect(payload: LeadSubmissionPayload): Promise<SubmissionResult> {
  const { gmailUrl, mailtoUrl } = generateEmailLinks(payload);

  // Form deactivation check
  if (!CONTACT_INFO.formsActive) {
    return {
      success: false,
      message: CONTACT_INFO.formsDeactivatedMessage || 'Forms have been temporarily deactivated. Please call our 24/7 team at (732) 592-9222 or email mirolacleaning@mirolaenterprises.com.',
      gmailUrl,
      mailtoUrl
    };
  }

  // 1. Primary custom server mailer endpoint with branded HTML template & company logo
  try {
    const response = await fetch(CONTACT_INFO.formEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json().catch(() => ({ success: true }));
      if (data.success) {
        return {
          success: true,
          message: data.message || 'Your commercial request was dispatched directly to our facility director. We will contact you within 24 hours.'
        };
      }
    }
  } catch (err) {
    console.warn('Primary server endpoint unavailable, attempting fallback:', err);
  }

  // 2. Fallback to Web3Forms if on localhost/preview and primary server is unavailable
  if (CONTACT_INFO.web3FormsAccessKey) {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: CONTACT_INFO.web3FormsAccessKey,
          subject: `[Mirola Website Lead] ${payload.formType}: ${payload.company || payload.fullName}`,
          from_name: 'Mirola Cleaning Services',
          from_email: CONTACT_INFO.email,
          replyto: payload.email,
          ...payload,
          facilityTypes: (payload.facilityTypes || []).join(', ')
        })
      });

      const resJson = await response.json();
      if (response.ok && resJson.success) {
        return {
          success: true,
          message: 'Your facility consultation request was received successfully! Our operations director will contact you promptly.'
        };
      }
    } catch (err) {
      console.warn('Web3Forms dispatch error:', err);
    }
  }

  // 4. Return graceful fallback with pre-filled Gmail & mailto links if offline or unhosted
  return {
    success: false,
    message: 'Unable to dispatch directly to server. Click below to send your prefilled request directly via email.',
    error: 'Network connection issue',
    gmailUrl,
    mailtoUrl
  };
}
