import React, { useState } from 'react';
import { Menu, X, Phone, Mail, Sparkles, Shield, Building2 } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="navbar-container">
        {/* Floating pill navigation badge matching the reference */}
        <div 
          className="nav-pill-badge" 
          onClick={() => setIsOpen(!isOpen)} 
          role="button"
          tabIndex={0}
          aria-label="Toggle navigation menu"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsOpen(!isOpen);
            }
          }}
        >
          {/* Official Mirola Logo Mark */}
          <div className="brand-logo-icon">
            <img 
              src="/images/logo.jpg" 
              alt="Mirola Cleaning Services" 
              className="navbar-brand-logo-img" 
            />
          </div>

          <span className="brand-pill-title">Mirola</span>

          <div className="nav-hamburger-icon">
            {isOpen ? <X size={17} strokeWidth={2.5} /> : <Menu size={17} strokeWidth={2.5} />}
          </div>
        </div>

        {/* Quick NJ Direct Hotline / Secondary Contact indicator */}
        <div className="nav-quick-contact">
          <button 
            type="button" 
            className="nav-quote-btn"
            onClick={onOpenConsultation}
          >
            NJ Service Hub: <span className="highlight">Available 24/7</span>
          </button>
        </div>
      </header>

      {/* Backdrop overlay for menu drawer */}
      {isOpen && (
        <div className="menu-backdrop" onClick={() => setIsOpen(false)} />
      )}

      {/* Slide-out Menu Drawer */}
      <aside className={`nav-menu-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-brand">
            <div className="brand-logo-icon large">
              <img 
                src="/images/logo.jpg" 
                alt="Mirola Cleaning Services Logo" 
                className="drawer-brand-logo-img" 
              />
            </div>
            <div>
              <div className="drawer-title">Mirola Cleaning Services</div>
              <div className="drawer-subtitle">New Jersey's Commercial Specialists</div>
            </div>
          </div>
          <button 
            type="button" 
            className="drawer-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="drawer-nav">
          <div className="drawer-section-label">SERVICES</div>
          <a href="#commercial" className="drawer-nav-item" onClick={() => setIsOpen(false)}>
            <Building2 size={18} />
            <div>
              <div className="item-title">Corporate & Office Cleaning</div>
              <div className="item-desc">Nightly janitorial & day porter solutions</div>
            </div>
          </a>
          <a href="#medical" className="drawer-nav-item" onClick={() => setIsOpen(false)}>
            <Shield size={18} />
            <div>
              <div className="item-title">Medical & Healthcare Sanitation</div>
              <div className="item-desc">Hospital-grade terminal disinfection</div>
            </div>
          </a>
          <a href="#floors" className="drawer-nav-item" onClick={() => setIsOpen(false)}>
            <Sparkles size={18} />
            <div>
              <div className="item-title">Floor Stripping, Waxing & Buffing</div>
              <div className="item-desc">Industrial marble, tile & concrete care</div>
            </div>
          </a>
        </nav>

        <div className="drawer-footer">
          <div className="drawer-contact-info">
            <div className="contact-row">
              <Phone size={15} />
              <span>(201) 555-MIROLA / New Jersey</span>
            </div>
            <div className="contact-row">
              <Mail size={15} />
              <span>inquiries@mirolacleaning.com</span>
            </div>
          </div>

          <button 
            type="button" 
            className="drawer-cta-btn"
            onClick={() => {
              setIsOpen(false);
              onOpenConsultation();
            }}
          >
            Book Free NJ Consultation
          </button>
        </div>
      </aside>
    </>
  );
};
