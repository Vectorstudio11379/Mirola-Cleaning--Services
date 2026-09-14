import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Clock, MapPin } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    facilityType: 'Office / Corporate Building',
    squareFootage: '5,000 - 15,000 sq ft',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
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
            <h3>Consultation Request Received!</h3>
            <p>
              Thank you, <strong>{formData.fullName || 'there'}</strong>. Our New Jersey commercial cleaning director will review your facility details for <strong>{formData.company || 'your business'}</strong> and contact you within 2 hours.
            </p>
            <div className="modal-perks">
              <div className="perk-item">
                <ShieldCheck size={16} color="#c90000" />
                <span>Custom Site Inspection Included</span>
              </div>
              <div className="perk-item">
                <Clock size={16} color="#c90000" />
                <span>Zero Commitment Estimate</span>
              </div>
            </div>
            <button type="button" className="modal-done-btn" onClick={handleReset}>
              Close Window
            </button>
          </div>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="modal-header">
              <div className="modal-tag">
                <img src="/images/logo.jpg" alt="Mirola Logo" style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'contain' }} />
                <span>MIROLA COMMERCIAL SERVICES</span>
              </div>
              <h2>Book Your Free Consultation</h2>
              <p>Specialized commercial janitorial & sanitation analysis for New Jersey businesses.</p>
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
                  placeholder="e.g. Apex Financial NJ"
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

              <div className="form-group">
                <label htmlFor="facilityType">Facility Classification</label>
                <select 
                  id="facilityType"
                  value={formData.facilityType}
                  onChange={(e) => setFormData({ ...formData, facilityType: e.target.value })}
                >
                  <option value="Office / Corporate Building">Office / Corporate Building</option>
                  <option value="Medical / Healthcare Center">Medical / Healthcare Center</option>
                  <option value="Industrial / Warehouse Facility">Industrial / Warehouse Facility</option>
                  <option value="Educational / Campus Property">Educational / Campus Property</option>
                  <option value="Retail / Showroom Space">Retail / Showroom Space</option>
                </select>
              </div>

              <div className="form-group">
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
              <span>Serving all New Jersey counties • Fully Bonded & Insured</span>
            </div>

            <button type="submit" className="modal-submit-btn">
              SUBMIT CONSULTATION REQUEST
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
