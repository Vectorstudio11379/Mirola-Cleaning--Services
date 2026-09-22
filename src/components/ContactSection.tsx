import React, { useState } from 'react';
import { Phone, Mail, MapPin, ShieldCheck, CheckCircle2, Check, ExternalLink, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { FACILITY_OPTIONS } from './ConsultationModal';
import { CONTACT_INFO } from '../constants/contactInfo';
import { submitLeadDirect } from '../services/formSubmission';

const TARGET_EMAIL = CONTACT_INFO.email;

export const ContactSection: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [gmailLink, setGmailLink] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    facilityTypes: ['Office / Corporate Building'] as string[],
    message: ''
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.facilityTypes.length === 0) {
      setErrorMsg('Please select at least one facility classification.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const res = await submitLeadDirect({
      fullName: formData.fullName,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      facilityTypes: formData.facilityTypes,
      message: formData.message,
      formType: 'Commercial Facility Walkthrough'
    });

    setIsSubmitting(false);
    setStatusMessage(res.message);
    if (res.gmailUrl) setGmailLink(res.gmailUrl);
    setIsSubmitted(true);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        
        {/* Left Column: Contact Copy & Trust Badges */}
        <div className="contact-info-column scroll-reveal-left">
          <div className="contact-pill-badge">
            <span className="contact-dot" />
            <span className="contact-badge-text">GET IN TOUCH</span>
          </div>

          <h2 className="contact-headline">
            Book your free commercial inspection & tailored estimate.
          </h2>

          <p className="contact-description">
            Experience the gold standard of USA facility maintenance. Our commercial directors conduct comprehensive walkthroughs and provide transparent, itemized proposals within 24 hours.
          </p>

          <div className="contact-perks-list">
            <div className="contact-perk-item">
              <div className="perk-icon-circle">
                <ShieldCheck size={18} />
              </div>
              <div className="perk-text-group">
                <div className="perk-title">100% Bonded & Insured Staff</div>
                <div className="perk-desc">Full general liability, workers comp, and background verification.</div>
              </div>
            </div>

            <div className="contact-perk-item">
              <div className="perk-icon-circle">
                <MapPin size={18} />
              </div>
              <div className="perk-text-group">
                <div className="perk-title">Nationwide USA Coverage</div>
                <div className="perk-desc">Rapid dispatch teams operating across all commercial sectors throughout the USA.</div>
              </div>
            </div>
          </div>

          <div className="direct-contact-capsule">
            <a href={`tel:${CONTACT_INFO.phoneTel}`} className="direct-contact-row">
              <Phone size={16} />
              <span>Direct Dispatch: <strong>{CONTACT_INFO.phoneDisplay}</strong></span>
            </a>
            <a href={`mailto:${TARGET_EMAIL}`} className="direct-contact-row">
              <Mail size={16} />
              <span>Email: <strong>{TARGET_EMAIL}</strong></span>
            </a>
          </div>
        </div>

        {/* Right Column: Luxury Obsidian Form Box */}
        <div className="contact-form-column scroll-reveal-right">
          <div className="contact-form-card">
            {isSubmitted ? (
              <div className="contact-success-state">
                <div className="success-icon-badge">
                  <CheckCircle2 size={48} color="#c90000" />
                </div>
                <h3>Walkthrough Request Dispatched!</h3>
                <p>
                  Thank you, <strong>{formData.fullName || 'there'}</strong>. {statusMessage || `Your commercial facility walkthrough request has been sent directly to our operations directors at ${TARGET_EMAIL}.`}
                </p>

                <div className="gmail-summary-box">
                  <div className="gmail-summary-header">Submitted Facility Scope</div>
                  <div className="gmail-summary-row">
                    <span className="summary-label">Facility / Company:</span>
                    <span className="summary-val">{formData.company || 'Not specified'}</span>
                  </div>
                  <div className="gmail-summary-row">
                    <span className="summary-label">Corporate Email:</span>
                    <span className="summary-val">{formData.email}</span>
                  </div>
                  <div className="gmail-summary-row">
                    <span className="summary-label">Direct Phone:</span>
                    <span className="summary-val">{formData.phone || 'Not provided'}</span>
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
                  Our regional operations manager will review your facility specifications and contact you within 24 hours to coordinate the on-site walkthrough.
                </p>

                <div className="modal-actions-group">
                  <button 
                    type="button" 
                    className="modal-secondary-btn"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        company: '',
                        email: '',
                        phone: '',
                        facilityTypes: ['Office / Corporate Building'],
                        message: ''
                      });
                    }}
                  >
                    Submit Another Request
                  </button>
                  {gmailLink && (
                    <a 
                      href={gmailLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="modal-secondary-btn"
                    >
                      <ExternalLink size={14} />
                      <span>Also Open in Gmail</span>
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-card-header">
                  <h3>Schedule Facility Walkthrough</h3>
                  <p>Zero commitment. Fast 2-hour response guarantee.</p>
                </div>

                <div className="form-input-grid">
                  <div className="input-group">
                    <label htmlFor="contact-fullName">Full Name</label>
                    <input 
                      id="contact-fullName"
                      type="text" 
                      required 
                      placeholder="e.g. Marcus Vance"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="contact-company">Company / Building Name</label>
                    <input 
                      id="contact-company"
                      type="text" 
                      required 
                      placeholder="e.g. Apex Corporate Center"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="contact-email">Corporate Email</label>
                    <input 
                      id="contact-email"
                      type="email" 
                      required 
                      placeholder="m.vance@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="contact-phone">Direct Phone</label>
                    <input 
                      id="contact-phone"
                      type="tel" 
                      required 
                      placeholder="(201) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
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

                <div className="input-group full-width">
                  <label htmlFor="contact-message">Specific Cleaning Priorities (Optional)</label>
                  <textarea 
                    id="contact-message"
                    rows={2}
                    placeholder="Floor stripping, nightly janitorial, day porter support..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>DISPATCHING REQUEST...</span>
                    </>
                  ) : (
                    <>
                      <span>CONFIRM FACILITY WALKTHROUGH</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
                <div className="dispatch-hint-note">
                  ✓ Direct dispatch to operations • 100% confidential • 24-hr response guarantee
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
