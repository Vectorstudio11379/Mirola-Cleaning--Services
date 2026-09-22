import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Check, 
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    facilityType: 'Office Building',
    squareFootage: '10,000 - 25,000 sq ft',
    frequency: 'Daily / Nightly',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const result = await submitLeadDirect({
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      facilityTypes: [formData.facilityType],
      squareFootage: formData.squareFootage,
      message: `Preferred Frequency: ${formData.frequency}\nNotes: ${formData.notes || 'None'}`,
      formType: 'Dedicated Contact & Dispatch Page (/contact)'
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setErrorMessage(result.message || 'There was a problem submitting your request. Please call us directly.');
    }
  };

  return (
    <div className="subpage-wrapper contact-standalone-page">
      
      {/* 1. HERO SECTION (BLACK & RED) */}
      <section className="subpage-hero-dark">
        <div className="subpage-container">
          
          <nav className="subpage-breadcrumbs" aria-label="Breadcrumb">
            <button 
              type="button" 
              className="subpage-breadcrumb-btn" 
              onClick={() => onNavigate('/')}
            >
              Home
            </button>
            <ChevronRight size={14} className="subpage-breadcrumb-sep" />
            <span className="subpage-breadcrumb-current">Contact & Dispatch</span>
          </nav>

          <div className="subpage-hero-grid">
            <div className="subpage-hero-copy">
              <div className="subpage-badge">
                <span className="subpage-pulse-dot" />
                <span>DIRECT FACILITY DISPATCH & INQUIRIES</span>
              </div>

              <h1 className="subpage-hero-title">
                Connect Directly with{' '}
                <span className="subpage-highlight-red">Mirola Facility Operations</span>
              </h1>

              <p className="subpage-hero-subtitle">
                Have an immediate facility spill or want to book an on-site walkthrough? Reach our regional operations team directly. We provide tailored, fixed-rate scopes of work within 24 hours.
              </p>

              <div className="subpage-hero-actions">
                <a href={`tel:${CONTACT_INFO.phoneTel}`} className="subpage-btn-primary" style={{ textDecoration: 'none' }}>
                  <Phone size={16} />
                  <span>Call Dispatch: {CONTACT_INFO.phoneDisplay}</span>
                </a>

                <a href={`mailto:${CONTACT_INFO.email}`} className="subpage-phone-badge">
                  <Mail size={15} color="#c90000" />
                  <span>{CONTACT_INFO.email}</span>
                </a>
              </div>

              {/* Quick SLA Chips */}
              <div className="subpage-hero-stats-row">
                <div className="subpage-stat-card">
                  <div className="subpage-stat-num">&lt; 60<span>m</span></div>
                  <div className="subpage-stat-label">Emergency SLA</div>
                </div>
                <div className="subpage-stat-card">
                  <div className="subpage-stat-num">24/7</div>
                  <div className="subpage-stat-label">Live Dispatch</div>
                </div>
                <div className="subpage-stat-card">
                  <div className="subpage-stat-num">0<span>$</span></div>
                  <div className="subpage-stat-label">Free On-Site Survey</div>
                </div>
                <div className="subpage-stat-card">
                  <div className="subpage-stat-num">24<span>h</span></div>
                  <div className="subpage-stat-label">Proposal Delivery</div>
                </div>
              </div>
            </div>

            {/* Hero Right Column: Authentic Commercial Photo Showcase */}
            <div className="subpage-hero-media">
              <div className="subpage-hero-image-card">
                <img 
                  src="/images/drive_folder_2/DSC00501.jpg" 
                  alt="Mirola commercial cleaning specialists on site in uniform" 
                  className="subpage-hero-img"
                />
                <div className="subpage-hero-img-badge">
                  <div className="badge-pulse-indicator" />
                  <div>
                    <div className="img-badge-title">Direct USA Facility Operations</div>
                    <div className="img-badge-subtitle">100% Bonded, Insured & Background-Vetted Crews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CONTACT DETAILS & INSPECTION FORM (CRISP WHITE) */}
      <section className="subpage-white-section">
        <div className="subpage-container">
          
          <div className="subpage-contact-split">
            
            {/* Left Column: Direct Dispatch Channels */}
            <div className="contact-info-panel">
              <div className="subpage-section-header">
                <div className="subpage-light-badge">
                  <Sparkles size={12} />
                  <span>DIRECT ACCESS</span>
                </div>
                <h2 className="subpage-section-title" style={{ fontSize: '1.9rem' }}>
                  Operational Headquarters & Dispatch Lines
                </h2>
                <p className="subpage-section-desc">
                  Commercial cleaning is an operational partnership. Reach our operations management directly without sitting on automated telephone queues.
                </p>
              </div>

              {/* Phone Box */}
              <div className="contact-channel-box">
                <div className="channel-box-icon">
                  <Phone size={22} />
                </div>
                <div>
                  <div className="channel-box-title">Direct Facility Hotline</div>
                  <a href={`tel:${CONTACT_INFO.phoneTel}`} className="channel-box-value">
                    {CONTACT_INFO.phoneDisplay}
                  </a>
                  <div className="channel-box-sub">
                    Live operator response • Mon-Sun 24/7
                  </div>
                </div>
              </div>

              {/* Email Box */}
              <div className="contact-channel-box">
                <div className="channel-box-icon">
                  <Mail size={22} />
                </div>
                <div>
                  <div className="channel-box-title">Operations Inbox</div>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="channel-box-value" style={{ wordBreak: 'break-all' }}>
                    {CONTACT_INFO.email}
                  </a>
                  <div className="channel-box-sub">
                    Directly delivered to Google Workspace Operations
                  </div>
                </div>
              </div>

              {/* Coverage Area Box */}
              <div className="contact-channel-box">
                <div className="channel-box-icon">
                  <MapPin size={22} />
                </div>
                <div>
                  <div className="channel-box-title">Service Coverage</div>
                  <div className="channel-box-value">
                    {CONTACT_INFO.address}
                  </div>
                  <div className="channel-box-sub">
                    Regional hubs across New Jersey, New York, Pennsylvania & Nationwide accounts
                  </div>
                </div>
              </div>

              {/* SLA Guarantee Card */}
              <div 
                style={{ 
                  background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', 
                  border: '1.5px solid #fecaca', 
                  borderRadius: '16px', 
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px'
                }}
              >
                <div 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '10px', 
                    background: '#c90000', 
                    color: '#ffffff',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0 
                  }}
                >
                  <Clock size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: '#991b1b', marginBottom: '4px' }}>
                    60-Minute Emergency Dispatch SLA
                  </div>
                  <p style={{ fontSize: '13.5px', color: '#7f1d1d', margin: 0, lineHeight: 1.5 }}>
                    Urgent facility biohazard spills, water line breaks, or pre-inspection sanitization routes receive guaranteed rapid dispatch within one hour.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Lead Generation & Walkthrough Form */}
            <div className="contact-form-card">
              
              {isSubmitted ? (
                <div className="contact-success-box">
                  <div className="success-icon-ring">
                    <Check size={32} />
                  </div>
                  <h3 className="success-title">Walkthrough Request Received!</h3>
                  <p className="success-desc">
                    Thank you, <strong>{formData.name}</strong>. Your facility inspection request has been dispatched directly to our operations team. An account director will contact you shortly to confirm the scheduled walkthrough time.
                  </p>
                  <button
                    type="button"
                    className="subpage-btn-primary"
                    style={{ margin: '0 auto' }}
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        facilityType: 'Office Building',
                        squareFootage: '10,000 - 25,000 sq ft',
                        frequency: 'Daily / Nightly',
                        notes: ''
                      });
                    }}
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="form-card-heading">Schedule Your Facility Walkthrough</h3>
                  <p className="form-card-sub">
                    Fill out the parameters below for an on-site survey and a transparent fixed-rate proposal.
                  </p>

                  {errorMessage && (
                    <div 
                      style={{ 
                        background: '#fef2f2', 
                        border: '1px solid #fecaca', 
                        borderRadius: '10px', 
                        padding: '12px 16px', 
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: '#991b1b',
                        fontSize: '13.5px'
                      }}
                    >
                      <AlertCircle size={18} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="contact-form-grid">
                    
                    {/* Full Name */}
                    <div className="contact-form-field">
                      <label htmlFor="contact-name">Full Name *</label>
                      <input 
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Marcus Vance"
                        className="contact-form-input"
                      />
                    </div>

                    {/* Email */}
                    <div className="contact-form-field">
                      <label htmlFor="contact-email">Corporate Email *</label>
                      <input 
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name@company.com"
                        className="contact-form-input"
                      />
                    </div>

                    {/* Phone */}
                    <div className="contact-form-field">
                      <label htmlFor="contact-phone">Direct Phone *</label>
                      <input 
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(732) 000-0000"
                        className="contact-form-input"
                      />
                    </div>

                    {/* Company */}
                    <div className="contact-form-field">
                      <label htmlFor="contact-company">Facility / Company Name *</label>
                      <input 
                        id="contact-company"
                        type="text"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="e.g. Apex Distribution Hub"
                        className="contact-form-input"
                      />
                    </div>

                    {/* Facility Type */}
                    <div className="contact-form-field">
                      <label htmlFor="contact-facility">Facility Type</label>
                      <select 
                        id="contact-facility"
                        name="facilityType"
                        value={formData.facilityType}
                        onChange={handleInputChange}
                        className="contact-form-select"
                      >
                        {FACILITY_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Square Footage */}
                    <div className="contact-form-field">
                      <label htmlFor="contact-sqft">Approximate Square Footage</label>
                      <select 
                        id="contact-sqft"
                        name="squareFootage"
                        value={formData.squareFootage}
                        onChange={handleInputChange}
                        className="contact-form-select"
                      >
                        <option value="Under 5,000 sq ft">Under 5,000 sq ft</option>
                        <option value="5,000 - 10,000 sq ft">5,000 - 10,000 sq ft</option>
                        <option value="10,000 - 25,000 sq ft">10,000 - 25,000 sq ft</option>
                        <option value="25,000 - 50,000 sq ft">25,000 - 50,000 sq ft</option>
                        <option value="50,000 - 100,000 sq ft">50,000 - 100,000 sq ft</option>
                        <option value="100,000+ sq ft">100,000+ sq ft</option>
                      </select>
                    </div>

                    {/* Frequency */}
                    <div className="contact-form-field full-span">
                      <label htmlFor="contact-freq">Desired Cleaning Frequency</label>
                      <select 
                        id="contact-freq"
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleInputChange}
                        className="contact-form-select"
                      >
                        <option value="Daily / Nightly">Daily / Nightly Janitorial</option>
                        <option value="3-5 Times Per Week">3-5 Times Per Week</option>
                        <option value="1-2 Times Per Week">1-2 Times Per Week</option>
                        <option value="One-Time Deep Clean / Strip & Wax">One-Time Deep Clean / Strip & Wax</option>
                        <option value="Immediate Emergency Sanitization">Immediate Emergency Sanitization</option>
                      </select>
                    </div>

                    {/* Notes */}
                    <div className="contact-form-field full-span">
                      <label htmlFor="contact-notes">Special Requirements / Cleanliness Challenges (Optional)</label>
                      <textarea 
                        id="contact-notes"
                        name="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Specify key areas: locker rooms, medical prep areas, high-traffic corridors, burnishing..."
                        className="contact-form-textarea"
                      />
                    </div>

                  </div>

                  <button 
                    type="submit" 
                    className="contact-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Dispatching to Operations...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Walkthrough Request</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px', fontSize: '12px', color: '#64748b' }}>
                    <ShieldCheck size={14} color="#16a34a" />
                    <span>Delivered directly to Google Workspace Operations • Zero Spam Promise</span>
                  </div>

                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* 3. WHAT TO EXPECT & MINI FAQ (LIGHT SLATE #f8fafc) */}
      <section className="subpage-light-section">
        <div className="subpage-container">
          
          <div className="subpage-section-header text-center">
            <div className="subpage-light-badge">
              <HelpCircle size={13} />
              <span>THE WALKTHROUGH PROCESS</span>
            </div>
            <h2 className="subpage-section-title">
              What Happens After You Request an Inspection?
            </h2>
            <p className="subpage-section-desc center">
              We respect your schedule with a streamlined, 3-step onboarding protocol designed for commercial property managers.
            </p>
          </div>

          <div className="subpage-pillars-grid">
            
            <div className="subpage-pillar-card">
              <div className="pillar-icon-box">
                <span style={{ fontWeight: 800, fontSize: '18px' }}>1</span>
              </div>
              <h3 className="pillar-title">30-Minute Physical Survey</h3>
              <p className="pillar-text">
                An experienced operations director visits your property to map square footage, high-touch zones, floor substrate conditions, and compliance requirements.
              </p>
              <div style={{ fontSize: '13px', color: '#64748b' }}>
                ✓ Scheduled at your convenience, day or evening.
              </div>
            </div>

            <div className="subpage-pillar-card">
              <div className="pillar-icon-box">
                <span style={{ fontWeight: 800, fontSize: '18px' }}>2</span>
              </div>
              <h3 className="pillar-title">Transparent Fixed-Rate Proposal</h3>
              <p className="pillar-text">
                Within 24 hours, you receive a transparent scope of work with guaranteed fixed pricing, shift checklists, and documented chemical safety data sheets.
              </p>
              <div style={{ fontSize: '13px', color: '#64748b' }}>
                ✓ No hidden surcharges or surprise supply fees.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. RED CTA BANNER */}
      <section className="subpage-cta-banner-red">
        <div className="subpage-container">
          <div className="cta-banner-copy">
            <h2>Prefer to Discuss Your Scope of Work Over the Phone?</h2>
            <p>
              Speak with a commercial cleaning specialist right now to schedule an immediate walkthrough.
            </p>
          </div>
          <div className="cta-banner-actions">
            <a 
              href={`tel:${CONTACT_INFO.phoneTel}`}
              className="cta-banner-btn-white"
              style={{ textDecoration: 'none' }}
            >
              <Phone size={16} />
              <span>Call: {CONTACT_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
