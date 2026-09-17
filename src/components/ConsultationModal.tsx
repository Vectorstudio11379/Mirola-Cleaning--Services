import React, { useState } from 'react';
import { X, CheckCircle2, MapPin, Check, ExternalLink, Mail, AlertCircle } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FACILITY_OPTIONS = [
  'Office / Corporate Building',
  'Medical / Healthcare Center',
  'Industrial / Warehouse Facility',
  'Educational / Campus Property',
  'Retail / Commercial Showroom',
  'Fitness Center / Gym',
];

const TARGET_EMAIL = 'inquiries@mirolacleaning.com';

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [gmailLink, setGmailLink] = useState('');
  const [mailtoLink, setMailtoLink] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    facilityTypes: ['Office / Corporate Building'] as string[],
    squareFootage: '5,000 - 15,000 sq ft',
    notes: '',
  });

  if (!isOpen) return null;

  const toggleFacilityType = (type: string) => {
    setFormData(prev => {
      const exists = prev.facilityTypes.includes(type);
      const next = exists 
        ? prev.facilityTypes.filter(t => t !== type)
        : [...prev.facilityTypes, type];
      if (next.length > 0) setErrorMsg('');
      return { ...prev, facilityTypes: next };
    });
  };

  const generateEmailData = () => {
    const subject = `Facility Consultation Request - ${formData.company || formData.fullName || 'Commercial Client'}`;
    const facilityList = formData.facilityTypes.length > 0
      ? formData.facilityTypes.map(f => `  • ${f}`).join('\n')
      : '  • Commercial Facility (Standard)';

    const body = 
`Hello Mirola Commercial Cleaning Team,

I would like to request an on-site commercial facility consultation and estimate. Here are our facility specifications:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FACILITY CONSULTATION DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Full Name: ${formData.fullName}
• Company / Facility Name: ${formData.company}
• Corporate Email: ${formData.email}
• Direct Phone: ${formData.phone}
• Approximate Area: ${formData.squareFootage}

FACILITY CLASSIFICATION(S):
${facilityList}

SPECIFIC CLEANING PRIORITIES / NOTES:
${formData.notes.trim() ? formData.notes.trim() : 'Standard commercial janitorial walkthrough requested.'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Please contact me to arrange an on-site walkthrough.

Thank you,
${formData.fullName}
${formData.company ? `${formData.company}\n` : ''}${formData.phone}`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(TARGET_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const mailtoUrl = `mailto:${encodeURIComponent(TARGET_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    return { gmailUrl, mailtoUrl };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.facilityTypes.length === 0) {
      setErrorMsg('Please select at least one facility classification.');
      return;
    }

    const { gmailUrl, mailtoUrl } = generateEmailData();
    setGmailLink(gmailUrl);
    setMailtoLink(mailtoUrl);

    // Automatically open Gmail compose in a new tab
    try {
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Browser popup fallback handled by confirmation UI
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="modal-close-icon" 
          onClick={onClose}
          aria-label="Close consultation modal"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="modal-success-state">
            <div className="success-icon-badge">
              <CheckCircle2 size={46} color="#c90000" />
            </div>
            <h3>Consultation Draft Opened in Gmail!</h3>
            <p>
              Thank you, <strong>{formData.fullName || 'there'}</strong>. We have opened a new tab with your prefilled facility details in <strong>Gmail</strong> addressed to <strong>{TARGET_EMAIL}</strong>.
            </p>

            <div className="gmail-summary-box">
              <div className="gmail-summary-header">Consultation Summary</div>
              <div className="gmail-summary-row">
                <span className="summary-label">Company / Facility:</span>
                <span className="summary-val">{formData.company || 'Not specified'}</span>
              </div>
              <div className="gmail-summary-row">
                <span className="summary-label">Estimated Area:</span>
                <span className="summary-val">{formData.squareFootage}</span>
              </div>
              <div className="gmail-summary-header" style={{ marginTop: '10px' }}>Facility Classifications:</div>
              <div className="gmail-summary-chips">
                {formData.facilityTypes.map((type) => (
                  <span key={type} className="gmail-chip">
                    <Check size={11} strokeWidth={3} />
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <p className="gmail-instruction-note">
              Please switch to your Gmail tab and click <strong>Send</strong> to dispatch your walkthrough request directly to our commercial operations team.
            </p>

            <div className="modal-actions-group">
              {gmailLink && (
                <a 
                  href={gmailLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="modal-gmail-btn"
                >
                  <ExternalLink size={16} />
                  <span>Re-open in Gmail</span>
                </a>
              )}
              <div className="modal-secondary-actions">
                {mailtoLink && (
                  <a href={mailtoLink} className="modal-secondary-btn">
                    <Mail size={14} />
                    <span>Open in Default Mail</span>
                  </a>
                )}
                <button type="button" className="modal-secondary-btn" onClick={handleReset}>
                  Done / Close
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="modal-header">
              <div className="modal-tag">
                <img src="/images/logo.jpg" alt="Mirola Logo" style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'contain' }} />
                <span>MIROLA COMMERCIAL SERVICES</span>
              </div>
              <h2>Book Your Free Consultation</h2>
              <p>Specialized commercial janitorial & sanitation analysis for USA businesses.</p>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input 
                  id="fullName"
                  type="text" 
                  required 
                  placeholder="e.g. Marcus Vance"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="company">Company / Facility Name</label>
                <input 
                  id="company"
                  type="text" 
                  required 
                  placeholder="e.g. Apex Financial USA"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Corporate Email</label>
                <input 
                  id="email"
                  type="email" 
                  required 
                  placeholder="m.vance@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Direct Phone Number</label>
                <input 
                  id="phone"
                  type="tel" 
                  required 
                  placeholder="(201) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group full-width" style={{ marginBottom: '14px' }}>
              <label htmlFor="squareFootage">Approximate Area</label>
              <select 
                id="squareFootage"
                value={formData.squareFootage}
                onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
              >
                <option value="Under 5,000 sq ft">Under 5,000 sq ft</option>
                <option value="5,000 - 15,000 sq ft">5,000 - 15,000 sq ft</option>
                <option value="15,000 - 50,000 sq ft">15,000 - 50,000 sq ft</option>
                <option value="50,000+ sq ft">50,000+ sq ft</option>
              </select>
            </div>

            {/* Facility Classification Multi-Select Checklist */}
            <div className="facility-checklist-container">
              <div className="facility-checklist-header">
                <label>Facility Classification</label>
                <span className="facility-checklist-hint">(Select all that apply)</span>
              </div>
              <div className="facility-checklist-grid">
                {FACILITY_OPTIONS.map((option) => {
                  const isChecked = formData.facilityTypes.includes(option);
                  return (
                    <label 
                      key={option} 
                      className={`facility-checkbox-card ${isChecked ? 'is-checked' : ''}`}
                    >
                      <input 
                        type="checkbox"
                        className="facility-checkbox-input"
                        checked={isChecked}
                        onChange={() => toggleFacilityType(option)}
                      />
                      <span className="facility-checkbox-custom">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="facility-checkbox-label">{option}</span>
                    </label>
                  );
                })}
              </div>
              {errorMsg && (
                <div className="facility-checklist-error">
                  <AlertCircle size={14} />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            <div className="form-group full-width">
              <label htmlFor="notes">Specific Cleaning Priorities (Optional)</label>
              <textarea 
                id="notes"
                rows={2}
                placeholder="Nightly recurring service, specialized electrostatic disinfection, high-gloss floor polishing..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <div className="modal-trust-bar">
              <MapPin size={14} color="#94a3b8" />
              <span>Serving commercial facilities across the USA • Fully Bonded & Insured</span>
            </div>

            <button type="submit" className="modal-submit-btn">
              <span>SUBMIT & OPEN IN GMAIL</span>
              <ExternalLink size={15} />
            </button>
            <div className="dispatch-hint-note">
              ✓ Prepares your consultation draft in Gmail with prefilled specifications
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

