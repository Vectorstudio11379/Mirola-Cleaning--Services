import React, { useState } from 'react';
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FooterSectionProps {
  onOpenConsultation: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenConsultation }) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="site-footer" id="footer">
      <div className="footer-container">
        
        {/* Large Floating CTA Banner */}
        <div className="footer-cta-banner">
          <div className="cta-banner-content">
            <div className="cta-badge">
              <ShieldCheck size={16} />
              <span>NEW JERSEY'S COMMERCIAL SPECIALISTS</span>
            </div>

            <h2 className="cta-title">
              Ready for a Spotless, Healthier Commercial Environment?
            </h2>

            <p className="cta-subtitle">
              Join over 500+ satisfied corporate facilities across New Jersey. Schedule your complimentary site audit today.
            </p>

            {subscribed ? (
              <div className="cta-success-msg">
                <CheckCircle2 size={20} color="#34d399" />
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
        <div className="footer-columns-grid">
          
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-brand-header">
              <img 
                src="/images/logo.jpg" 
                alt="Mirola Cleaning Services Logo" 
                className="footer-logo-img"
              />
              <span className="footer-brand-name">Mirola</span>
            </div>

            <p className="footer-brand-desc">
              Mirola Cleaning Services delivers hospital-grade sanitization, automated floor care, and precision janitorial facility management across New Jersey.
            </p>

            <div className="footer-contact-items">
              <div className="footer-contact-row">
                <Phone size={15} />
                <span>(201) 555-MIROLA / New Jersey</span>
              </div>
              <div className="footer-contact-row">
                <Mail size={15} />
                <span>inquiries@mirolacleaning.com</span>
              </div>
              <div className="footer-contact-row">
                <MapPin size={15} />
                <span>Serving All 21 New Jersey Counties</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#hero">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#pricing">Pricing Plans</a></li>
              <li><a href="#why-choose">Why Choose Us</a></li>
              <li><a href="#testimonials">Client Reviews</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">Expert Services</h4>
            <ul className="footer-links-list">
              <li><a href="#services">Corporate Office Cleaning</a></li>
              <li><a href="#services">Medical Facility Sanitation</a></li>
              <li><a href="#services">Floor Stripping & Waxing</a></li>
              <li><a href="#services">Day Porter Services</a></li>
              <li><a href="#services">Post-Construction Cleanup</a></li>
              <li><a href="#services">Carpet Steam Extraction</a></li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="footer-col">
            <h4 className="footer-col-title">NJ Service Hubs</h4>
            <ul className="footer-links-list">
              <li><span>Bergen County</span></li>
              <li><span>Hudson County</span></li>
              <li><span>Essex County</span></li>
              <li><span>Morris County</span></li>
              <li><span>Union County</span></li>
              <li><span>Passaic & Middlesex</span></li>
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
