import React, { useState } from 'react';
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';
import { CONTACT_INFO } from '../constants/contactInfo';
import { submitLeadDirect } from '../services/formSubmission';

interface FooterSectionProps {
  onOpenConsultation: () => void;
  onNavigate?: (path: string) => void;
  onOpenLegal?: (type: 'terms' | 'privacy' | 'compliance') => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ 
  onOpenConsultation, 
  onNavigate,
  onOpenLegal
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [deactivatedMsg, setDeactivatedMsg] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setIsSubmitting(true);
      setDeactivatedMsg('');
      const res = await submitLeadDirect({
        fullName: 'Prospective Commercial Client',
        email: emailInput.trim(),
        formType: 'Footer Quick Estimate Request',
        message: 'Quick estimate requested via website footer estimate banner.'
      });
      setIsSubmitting(false);
      if (!res.success) {
        setDeactivatedMsg(res.message || 'There was an issue submitting your request. Please call our team at (732) 592-9222.');
        return;
      }
      setSubscribed(true);
    }
  };

  const handleLink = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      const el = document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="site-footer" id="footer">
      <div className="footer-container">
        
        {/* Large Floating CTA Banner */}
        <div className="footer-cta-banner scroll-reveal-scale">
          <div className="cta-banner-content">
            <div className="cta-badge">
              <ShieldCheck size={16} />
              <span>PREMIER COMMERCIAL SPECIALISTS</span>
            </div>

            <h2 className="cta-title">
              Ready for a Spotless, Healthier Commercial Environment?
            </h2>

            <p className="cta-subtitle">
              Join over 500+ satisfied corporate facilities nationwide. Schedule your complimentary site audit today.
            </p>

            {subscribed ? (
              <div className="cta-success-msg">
                <CheckCircle2 size={20} color="#c90000" />
                <span>Thank you! Our facility director will contact you promptly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="cta-form-row">
                <input 
                  type="email" 
                  required
                  placeholder="Enter your corporate email address..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="cta-email-input"
                />
                <button type="submit" className="cta-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Free Estimate</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}

            {deactivatedMsg && (
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid #ef4444',
                color: '#fee2e2',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: 600,
                marginTop: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                <span>⚠️ {deactivatedMsg}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="footer-columns-grid scroll-reveal-stagger">
          
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-brand-header" onClick={() => handleLink('/')} style={{ cursor: 'pointer' }}>
              <img 
                src="/images/logo.jpg" 
                alt="Mirola Cleaning Services Logo" 
                className="footer-logo-img"
              />
              <span className="footer-brand-name">Mirola</span>
            </div>

            <p className="footer-brand-desc">
              Mirola Cleaning Services delivers hospital-grade sanitization, automated floor care, and precision janitorial facility management nationwide.
            </p>

            <div className="footer-contact-items">
              <a href={`tel:${CONTACT_INFO.phoneTel}`} className="footer-contact-row" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Phone size={15} />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </a>
              <a href={`mailto:${CONTACT_INFO.email}`} className="footer-contact-row" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Mail size={15} />
                <span>{CONTACT_INFO.email}</span>
              </a>
              <div className="footer-contact-row">
                <MapPin size={15} />
                <span>{CONTACT_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><button type="button" className="footer-text-btn" onClick={() => handleLink('/')}>Home</button></li>
              <li><button type="button" className="footer-text-btn" onClick={() => handleLink('/services/janitorial')}>Janitorial Services</button></li>
              <li><button type="button" className="footer-text-btn" onClick={() => handleLink('/services/floor-care')}>Floor Care & Strip/Wax</button></li>
              <li><button type="button" className="footer-text-btn" onClick={() => handleLink('/services/sanitation')}>Sanitation Services</button></li>
              <li><button type="button" className="footer-text-btn" onClick={() => handleLink('/about')}>About Us</button></li>
              <li><button type="button" className="footer-text-btn" onClick={() => handleLink('/testimonials')}>Testimonials</button></li>
              <li><button type="button" className="footer-text-btn" onClick={() => handleLink('/contact')}>Contact Us</button></li>
            </ul>
          </div>

          {/* Janitorial Building Types */}
          <div className="footer-col">
            <h4 className="footer-col-title">Building Types</h4>
            <ul className="footer-links-list">
              <li><button type="button" className="footer-text-btn" onClick={() => handleLink('/services/janitorial/daycare')}>Daycare Cleaning</button></li>
              <li><button type="button" className="footer-text-btn" onClick={() => handleLink('/services/janitorial/gym')}>Gym Cleaning</button></li>
              <li><button type="button" className="footer-text-btn" onClick={() => handleLink('/services/janitorial/warehouse')}>Warehouse Cleaning</button></li>
              <li><button type="button" className="footer-text-btn" onClick={() => handleLink('/services/janitorial/office')}>Office Cleaning</button></li>
              <li><button type="button" className="footer-text-btn" onClick={() => handleLink('/services/janitorial/medical')}>Medical Cleaning</button></li>
            </ul>
          </div>



        </div>

        {/* Footer Divider */}
        <div className="footer-bottom-divider" />

        {/* Bottom Copyright Row */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Mirola Cleaning Services LLC. All Rights Reserved. Fully Bonded & Insured.
          </div>
          <div className="footer-legal-links">
            <a href="#terms" onClick={(e) => { e.preventDefault(); onOpenLegal ? onOpenLegal('terms') : onOpenConsultation(); }}>Terms of Service</a>
            <span className="legal-separator">•</span>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); onOpenLegal ? onOpenLegal('privacy') : onOpenConsultation(); }}>Privacy Policy</a>
            <span className="legal-separator">•</span>
            <a href="#compliance" onClick={(e) => { e.preventDefault(); onOpenLegal ? onOpenLegal('compliance') : onOpenConsultation(); }}>Safety Compliance</a>
          </div>
        </div>

        {/* Giant Architectural Watermark Text Across Footer */}
        <div className="footer-watermark" aria-hidden="true">
          <span>MIROLA</span>
        </div>

      </div>
    </footer>
  );
};
