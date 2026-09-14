import React, { useState } from 'react';
import { Phone, Mail, MapPin, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    facilityType: 'Office / Corporate Headquarters',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        
        {/* Left Column: Contact Copy & Trust Badges */}
        <div className="contact-info-column">
          <div className="contact-pill-badge">
            <span className="contact-dot" />
            <span className="contact-badge-text">GET IN TOUCH</span>
          </div>

          <h2 className="contact-headline">
            Book your free commercial inspection & tailored estimate.
          </h2>

          <p className="contact-description">
            Experience the gold standard of New Jersey facility maintenance. Our commercial directors conduct comprehensive walkthroughs and provide transparent, itemized proposals within 24 hours.
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
                <div className="perk-title">Statewide New Jersey Coverage</div>
                <div className="perk-desc">Rapid dispatch teams across Bergen, Hudson, Essex, Morris, and all NJ counties.</div>
              </div>
            </div>
          </div>

          <div className="direct-contact-capsule">
            <a href="tel:2015556476" className="direct-contact-row">
              <Phone size={16} />
              <span>Direct Dispatch: <strong>(201) 555-MIROLA</strong></span>
            </a>
            <a href="mailto:inquiries@mirolacleaning.com" className="direct-contact-row">
              <Mail size={16} />
              <span>Email: <strong>inquiries@mirolacleaning.com</strong></span>
            </a>
          </div>
        </div>

        {/* Right Column: Deep Forest Green Form Box */}
        <div className="contact-form-column">
          <div className="contact-form-card">
            {isSubmitted ? (
              <div className="contact-success-state">
                <div className="success-icon-badge">
                  <CheckCircle2 size={48} color="#c90000" />
                </div>
                <h3>Proposal Request Received!</h3>
                <p>
                  Thank you, <strong>{formData.fullName || 'there'}</strong>. Our New Jersey commercial operations director will contact you for <strong>{formData.company || 'your facility'}</strong> within 2 hours to coordinate your inspection walkthrough.
                </p>
                <button 
                  type="button" 
                  className="reset-form-btn"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Inquiry
                </button>
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

                <div className="input-group full-width">
                  <label htmlFor="contact-facilityType">Facility Classification</label>
                  <select 
                    id="contact-facilityType"
                    value={formData.facilityType}
                    onChange={(e) => setFormData({ ...formData, facilityType: e.target.value })}
                  >
                    <option value="Office / Corporate Headquarters">Office / Corporate Headquarters</option>
                    <option value="Medical & Healthcare Clinic">Medical & Healthcare Clinic</option>
                    <option value="Industrial / Warehouse Facility">Industrial / Warehouse Facility</option>
                    <option value="Educational / Campus Center">Educational / Campus Center</option>
                    <option value="Retail / Commercial Showroom">Retail / Commercial Showroom</option>
                  </select>
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

                <button type="submit" className="form-submit-btn">
                  <span>Submit Walkthrough Request</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
