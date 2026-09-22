import React, { useState } from 'react';
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO } from '../constants/contactInfo';
interface FooterSectionProps {
  onOpenConsultation: () => void;
  onNavigate?: (path: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ 
  onOpenConsultation, 
  onNavigate 
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
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
              <span>USA'S COMMERCIAL SPECIALISTS</span>
            </div>

            <h2 className="cta-title">
              Ready for a Spotless, Healthier Commercial Environment?
            </h2>

            <p className="cta-subtitle">
              Join over 500+ satisfied corporate facilities across the USA. Schedule your complimentary site audit today.
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
                <button type="submit" className="cta-submit-btn">
                  <span>Get Free Estimate</span>
                  <ArrowRight size={16} />
                </button>
              </form>
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
              Mirola Cleaning Services delivers hospital-grade sanitization, automated floor care, and precision janitorial facility management across the USA.
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
              <li><a href="#about" onClick={(e) => { e.preventDefault(); handleLink('/'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>About Us</a></li>
              <li><a href="#testimonials" onClick={(e) => { e.preventDefault(); handleLink('/'); setTimeout(() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Testimonials</a></li>
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
            <a href="#terms" onClick={(e) => { e.preventDefault(); onOpenConsultation(); }}>Terms of Service</a>
            <span className="legal-separator">•</span>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); onOpenConsultation(); }}>Privacy Policy</a>
            <span className="legal-separator">•</span>
            <a href="#security" onClick={(e) => { e.preventDefault(); onOpenConsultation(); }}>Safety Compliance</a>
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
