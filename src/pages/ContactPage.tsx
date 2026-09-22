import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Check, 
  ExternalLink, 
  AlertCircle, 
  Loader2, 
  ArrowRight,
  Sparkles,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { CONTACT_INFO } from '../constants/contactInfo';
import { submitLeadDirect } from '../services/formSubmission';
import { FACILITY_OPTIONS } from '../components/ConsultationModal';
import type { AppRoute } from '../types/navigation';

interface ContactPageProps {
  onNavigate: (path: AppRoute) => void;
  onOpenConsultation: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
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
    squareFootage: '5,000 - 15,000 sq ft',
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
      squareFootage: formData.squareFootage,
      message: formData.message,
      formType: 'Dedicated Contact Page Walkthrough Request'
    });

    setIsSubmitting(false);
    setStatusMessage(res.message);
    if (res.gmailUrl) setGmailLink(res.gmailUrl);
    setIsSubmitted(true);
  };

  const contactFaqs = [
    {
      q: 'How fast can Mirola conduct an on-site facility inspection?',
      a: 'Our commercial directors can typically conduct an on-site walkthrough within 24 to 48 hours of your request. Comprehensive, itemized proposals are delivered within 24 hours following the site visit.'
    },
    {
      q: 'Do you require long-term binding contracts?',
      a: 'No. We offer flexible month-to-month commercial service agreements backed by our 100% satisfaction guarantee, as well as annual contracts with preferred rate discounts.'
    },
    {
      q: 'How do you ensure keycard security and alarm code protection?',
      a: 'We implement strict chain-of-custody protocols for physical keys and encrypted digital storage for alarm codes. Supervisors perform timestamped audits for every facility lockup.'
    },
    {
      q: 'Can Mirola provide daytime porter staffing in addition to nightly cleaning?',
      a: 'Yes. We provide full-time, part-time, and split-shift day porters who maintain restrooms, restock consumables, handle cafeteria turnover, and greet guests in professional Mirola uniform.'
    }
  ];

  return (
    <div className="service-page-wrapper contact-standalone-page">
      {/* 1. Header & Breadcrumbs Section */}
      <section className="service-hero-section">
        <div className="service-page-container">
          
          <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
            <button type="button" className="breadcrumb-link" onClick={() => onNavigate('/')}>
              Home
            </button>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">Contact Us</span>
          </nav>

          <div className="service-hero-grid">
            <div className="service-hero-copy scroll-reveal-left">
              <div className="service-page-badge">
                <span className="badge-pulse-dot" />
                <span>NATIONWIDE COMMERCIAL DISPATCH</span>
              </div>

              <h1 className="service-hero-title">
                Book Your Free Commercial <span className="service-hero-highlight">Site Walkthrough</span> & Proposal
              </h1>

              <p className="service-hero-subtitle">
                Connect directly with Mirola’s commercial operations team. We conduct thorough on-site facility audits and deliver transparent, itemized service proposals within 24 hours.
              </p>

              {/* Direct Info Pills Row */}
              <div className="contact-quick-pills-row">
                <a href={`tel:${CONTACT_INFO.phoneTel}`} className="quick-pill-link">
                  <Phone size={16} />
                  <span>{CONTACT_INFO.phoneDisplay}</span>
                </a>
                <a href={`mailto:${CONTACT_INFO.email}`} className="quick-pill-link">
                  <Mail size={16} />
                  <span>{CONTACT_INFO.email}</span>
                </a>
                <div className="quick-pill-link static">
                  <Clock size={16} />
                  <span>24/7 Rapid Emergency Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Cards Grid */}
            <div className="service-hero-media scroll-reveal-right">
              <div className="contact-channels-card">
                <div className="channel-item">
                  <div className="channel-icon-circle">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="channel-label">Direct Facility Dispatch</div>
                    <a href={`tel:${CONTACT_INFO.phoneTel}`} className="channel-val">
                      {CONTACT_INFO.phoneDisplay}
                    </a>
                    <div className="channel-sub">Live operations coordinators available 24/7</div>
                  </div>
                </div>

                <div className="channel-item">
                  <div className="channel-icon-circle">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="channel-label">Official Inquiries & Proposals</div>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="channel-val">
                      {CONTACT_INFO.email}
                    </a>
                    <div className="channel-sub">2-hour business response guarantee</div>
                  </div>
                </div>

                <div className="channel-item">
                  <div className="channel-icon-circle">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="channel-label">Regional Coverage</div>
                    <div className="channel-val static">{CONTACT_INFO.address}</div>
                    <div className="channel-sub">Operating across corporate hubs throughout the USA</div>
                  </div>
                </div>

                <div className="channel-item">
                  <div className="channel-icon-circle">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <div className="channel-label">Compliance & Security</div>
                    <div className="channel-val static">100% Bonded & Insured</div>
                    <div className="channel-sub">Full liability, workers’ comp & background screening</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Main Form & Walkthrough Request Section */}
      <section className="contact-form-section" style={{ padding: '80px 0 100px', background: '#0a0a0a' }}>
        <div className="service-page-container">
          
          <div className="contact-form-layout-grid">
            
            {/* Left Column: What to Expect During Walkthrough */}
            <div className="walkthrough-expectations-col scroll-reveal-left">
              <div className="expectations-pill">
                <Sparkles size={14} color="#c90000" />
                <span>WHAT TO EXPECT</span>
              </div>
              <h2 className="expectations-heading">
                Comprehensive On-Site Inspection With Zero Obligation
              </h2>
              <p className="expectations-desc">
                We believe in tailored commercial proposals, not generic square-foot estimates. During your 20-minute site visit, our operations director will:
              </p>

              <div className="expectation-steps-list">
                <div className="step-item">
                  <div className="step-num">1</div>
                  <div>
                    <h4>Assess Surface Substrates & High-Touch Zones</h4>
                    <p>Identify specialized flooring (VCT, concrete, terrazzo), glass partitions, and critical sanitation touchpoints.</p>
                  </div>
                </div>

                <div className="step-item">
                  <div className="step-num">2</div>
                  <div>
                    <h4>Evaluate Foot-Traffic & Occupancy Schedules</h4>
                    <p>Align cleaning frequency (nightly, bi-weekly, or day porter presence) around your team’s operating hours.</p>
                  </div>
                </div>

                <div className="step-item">
                  <div className="step-num">3</div>
                  <div>
                    <h4>Deliver an Itemized Scope of Work Within 24 Hours</h4>
                    <p>Transparent pricing, chemical SDS specifications, and assigned supervisor credentials with zero hidden fees.</p>
                  </div>
                </div>
              </div>

              {/* FAQ Accordion snippet */}
              <div className="contact-mini-faqs" style={{ marginTop: '40px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '18px', color: '#ffffff' }}>Walkthrough Questions</h3>
                {contactFaqs.map((faq, idx) => (
                  <div key={idx} className="mini-faq-card">
                    <div className="mini-faq-q">
                      <HelpCircle size={15} color="#c90000" />
                      <span>{faq.q}</span>
                    </div>
                    <div className="mini-faq-a">{faq.a}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Booking Form */}
            <div className="contact-form-col scroll-reveal-right">
              <div className="contact-form-card" style={{ maxWidth: '640px', margin: '0 auto' }}>
                {isSubmitted ? (
                  <div className="contact-success-state">
                    <div className="success-icon-badge">
                      <CheckCircle2 size={48} color="#c90000" />
                    </div>
                    <h3>Walkthrough Request Dispatched!</h3>
                    <p>
                      Thank you, <strong>{formData.fullName || 'there'}</strong>. {statusMessage || `Your commercial facility walkthrough request has been dispatched directly to our operations directors at ${CONTACT_INFO.email}.`}
                    </p>

                    <div className="gmail-summary-box">
                      <div className="gmail-summary-header">Submitted Facility Details</div>
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
                      <div className="gmail-summary-row">
                        <span className="summary-label">Estimated Size:</span>
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
                      Our regional operations manager will contact you within 24 hours at <strong>{formData.phone || formData.email}</strong> to coordinate the on-site walkthrough.
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
                            squareFootage: '5,000 - 15,000 sq ft',
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
                      <p>Zero commitment. Direct dispatch to regional operations.</p>
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
                          placeholder="e.g. Apex Health Center"
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
                          placeholder="(732) 592-9222"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>

                      <div className="input-group full-width">
                        <label htmlFor="contact-sqft">Approximate Facility Size</label>
                        <select 
                          id="contact-sqft"
                          value={formData.squareFootage}
                          onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
                        >
                          <option value="Under 2,500 sq ft">Under 2,500 sq ft (Studio / Boutique Suite)</option>
                          <option value="2,500 - 5,000 sq ft">2,500 - 5,000 sq ft (Medium Office / Clinic)</option>
                          <option value="5,000 - 15,000 sq ft">5,000 - 15,000 sq ft (Corporate Floor / Gym)</option>
                          <option value="15,000 - 50,000 sq ft">15,000 - 50,000 sq ft (Multi-Floor / School)</option>
                          <option value="50,000+ sq ft">50,000+ sq ft (Industrial Campus / Warehouse)</option>
                        </select>
                      </div>
                    </div>

                    {/* Facility Checklist Multi-Select */}
                    <div className="facility-checklist-group">
                      <div className="checklist-group-header">
                        <span>Facility Classification (Select All That Apply):</span>
                        <span className="checklist-selected-count">
                          {formData.facilityTypes.length} Selected
                        </span>
                      </div>
                      
                      <div className="facility-checkbox-grid">
                        {FACILITY_OPTIONS.map((facility) => {
                          const isSelected = formData.facilityTypes.includes(facility);
                          return (
                            <label 
                              key={facility} 
                              className={`facility-checkbox-card ${isSelected ? 'checked' : ''}`}
                            >
                              <input 
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleFacilityType(facility)}
                                className="hidden-checkbox"
                              />
                              <div className="custom-check-box">
                                {isSelected && <Check size={12} strokeWidth={3} />}
                              </div>
                              <span className="facility-name-label">{facility}</span>
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
                        rows={3}
                        placeholder="Floor stripping, nightly janitorial, day porter support, terminal healthcare disinfection..."
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

        </div>
      </section>
    </div>
  );
};
