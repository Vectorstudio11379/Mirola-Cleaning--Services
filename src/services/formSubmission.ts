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

  // 1. If Web3Forms access key is configured in contactInfo, use Web3Forms
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
          from_name: payload.fullName || 'Mirola Website Visitor',
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
      console.warn('Web3Forms dispatch error, falling back to local mailer:', err);
    }
  }

  // 2. Try the primary PHP mailer endpoint (/api/contact.php)
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
      return {
        success: true,
        message: data.message || 'Your commercial request was dispatched directly to our facility director. We will contact you within 24 hours.'
      };
    }
  } catch (err) {
    console.warn('Direct server endpoint unavailable:', err);
  }

  // 3. In Vite Local Dev environment, simulate success so forms can be tested locally
  if (import.meta.env.DEV) {
    return {
      success: true,
      message: '[Local Development] Lead recorded successfully. (On live server, this emails mirolacleaning@mirolaenterprises.com directly).'
    };
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
