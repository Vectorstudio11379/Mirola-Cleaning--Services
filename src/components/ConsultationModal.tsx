import React, { useState } from 'react';
import { X, CheckCircle2, MapPin, Check, ExternalLink, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../constants/contactInfo';
import { submitLeadDirect } from '../services/formSubmission';

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

const TARGET_EMAIL = CONTACT_INFO.email;

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
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
      squareFootage: formData.squareFootage,
      message: formData.notes,
      formType: 'Commercial Consultation Request'
    });

    setIsSubmitting(false);
    setStatusMessage(res.message);
    if (res.gmailUrl) setGmailLink(res.gmailUrl);
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
              <h3>Consultation Request Dispatched!</h3>
              <p>
                Thank you, <strong>{formData.fullName || 'there'}</strong>. {statusMessage || `Your commercial facility consultation request has been sent directly to our operations directors at ${TARGET_EMAIL}.`}
              </p>

              <div className="gmail-summary-box">
                <div className="gmail-summary-header">Consultation Summary</div>
                <div className="gmail-summary-row">
                  <span className="summary-label">Company / Facility:</span>
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
                Our regional operations director will review your building specifications and contact you within 24 hours to coordinate the on-site walkthrough.
              </p>

              <div className="modal-actions-group">
                <button type="button" className="modal-secondary-btn" onClick={handleReset}>
                  Done / Close
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

            <button type="submit" className="modal-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>DISPATCHING REQUEST...</span>
                </>
              ) : (
                <>
                  <span>CONFIRM CONSULTATION REQUEST</span>
                  <ArrowRight size={15} />
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
  );
};

