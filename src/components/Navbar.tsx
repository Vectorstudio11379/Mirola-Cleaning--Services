import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  Sparkles, 
  Shield, 
  Building2, 
  ChevronDown, 
  ChevronRight,
  Baby, 
  Dumbbell, 
  Boxes, 
  ShieldCheck, 
  Layers,
  Home
} from 'lucide-react';
import { CONTACT_INFO } from '../constants/contactInfo';
interface NavbarProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPath = '/', 
  onNavigate, 
  onOpenConsultation 
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [isServicesPinned, setIsServicesPinned] = useState(false);
  const [janitorialHovered, setJanitorialHovered] = useState(false);
  const [mobileJanitorialExpanded, setMobileJanitorialExpanded] = useState(true);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseEnterTrigger = () => {
    clearCloseTimeout();
    setServicesMenuOpen(true);
  };

  const handleMouseLeaveTrigger = () => {
    if (!isServicesPinned) {
      clearCloseTimeout();
      closeTimeoutRef.current = setTimeout(() => {
        setServicesMenuOpen(false);
        setJanitorialHovered(false);
      }, 300);
    }
  };

  const handleToggleServicesClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearCloseTimeout();
    if (servicesMenuOpen && isServicesPinned) {
      setServicesMenuOpen(false);
      setIsServicesPinned(false);
      setJanitorialHovered(false);
    } else {
      setServicesMenuOpen(true);
      setIsServicesPinned(true);
    }
  };

  // Close desktop dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        clearCloseTimeout();
        setServicesMenuOpen(false);
        setIsServicesPinned(false);
        setJanitorialHovered(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearCloseTimeout();
    };
  }, []);

  const handleLinkClick = (path: string) => {
    clearCloseTimeout();
    setDrawerOpen(false);
    setServicesMenuOpen(false);
    setIsServicesPinned(false);
    setJanitorialHovered(false);
    if (path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate(path);
    } else {
      const el = document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSectionScroll = (sectionId: string) => {
    clearCloseTimeout();
    setDrawerOpen(false);
    setServicesMenuOpen(false);
    setIsServicesPinned(false);
    setJanitorialHovered(false);

    if (currentPath !== '/' && onNavigate) {
      onNavigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="navbar-container">
        {/* Floating pill navigation badge */}
        <div className="nav-pill-badge-extended" ref={dropdownRef}>
          
          {/* Official Mirola Logo Mark & Title -> navigates Home */}
          <div 
            className="brand-logo-group"
            onClick={() => handleLinkClick('/')}
            role="button"
            tabIndex={0}
            title="Return to Mirola Homepage"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleLinkClick('/');
            }}
          >
            <div className="brand-logo-icon">
              <img 
                src="/images/logo.jpg" 
                alt="Mirola Cleaning Services" 
                className="navbar-brand-logo-img" 
              />
            </div>
            <span className="brand-pill-title">Mirola</span>
          </div>

          <div className="nav-pill-divider" />

          {/* Desktop Nav Items */}
          <nav className="desktop-pill-nav">
            <button 
              type="button" 
              className={`pill-nav-btn ${currentPath === '/' ? 'active' : ''}`}
              onClick={() => handleLinkClick('/')}
            >
              Home
            </button>

            {/* Services Dropdown Trigger */}
            <div 
              className="services-dropdown-trigger-wrap"
              onMouseEnter={handleMouseEnterTrigger}
              onMouseLeave={handleMouseLeaveTrigger}
            >
              <button 
                type="button" 
                className={`pill-nav-btn services-btn ${currentPath.startsWith('/services') || servicesMenuOpen ? 'active' : ''}`}
                onClick={handleToggleServicesClick}
                aria-expanded={servicesMenuOpen}
              >
                <span>Services</span>
                <ChevronDown size={14} className={`chevron-icon ${servicesMenuOpen ? 'rotate' : ''}`} />
              </button>

              {/* Desktop Floating Dropdown Menu */}
              {servicesMenuOpen && (
                <div 
                  className="desktop-services-mega-dropdown"
                  onMouseEnter={clearCloseTimeout}
                  onMouseLeave={handleMouseLeaveTrigger}
                >
                  <div className="dropdown-column main-services-col">
                    <div className="dropdown-col-label">CORE SERVICES</div>

                    {/* 1. Janitorial Services with Submenu Trigger */}
                    <div 
                      className={`dropdown-service-item has-sub ${janitorialHovered || currentPath.includes('/services/janitorial') ? 'highlighted' : ''}`}
                      onMouseEnter={() => setJanitorialHovered(true)}
                      onClick={() => handleLinkClick('/services/janitorial')}
                    >
                      <div className="item-icon-box">
                        <Sparkles size={18} />
                      </div>
                      <div className="item-text-wrap">
                        <div className="item-head-row">
                          <span className="item-title">Janitorial Services</span>
                          <span className="item-badge-pill">5 Building Types</span>
                        </div>
                        <p className="item-desc">Recurring commercial facility care tailored by building type</p>
                      </div>
                      <ChevronRight size={16} className="sub-arrow" />
                    </div>

                    {/* 2. Floor Care and Strip and Wax Services */}
                    <div 
                      className={`dropdown-service-item ${currentPath === '/services/floor-care' ? 'active' : ''}`}
                      onMouseEnter={() => setJanitorialHovered(false)}
                      onClick={() => handleLinkClick('/services/floor-care')}
                    >
                      <div className="item-icon-box">
                        <Layers size={18} />
                      </div>
                      <div className="item-text-wrap">
                        <div className="item-head-row">
                          <span className="item-title">Floor Care & Strip and Wax Services</span>
                        </div>
                        <p className="item-desc">Rotary stripping, high-gloss VCT finish, burnishing & polishing</p>
                      </div>
                    </div>

                    {/* 3. Sanitation Services */}
                    <div 
                      className={`dropdown-service-item ${currentPath === '/services/sanitation' ? 'active' : ''}`}
                      onMouseEnter={() => setJanitorialHovered(false)}
                      onClick={() => handleLinkClick('/services/sanitation')}
                    >
                      <div className="item-icon-box">
                        <Shield size={18} />
                      </div>
                      <div className="item-text-wrap">
                        <div className="item-head-row">
                          <span className="item-title">Sanitation Services</span>
                        </div>
                        <p className="item-desc">Hospital-grade terminal disinfection & antimicrobial misting</p>
                      </div>
                    </div>
                  </div>

                  {/* Sub-flyout column for Janitorial Building Types */}
                  {janitorialHovered && (
                    <div className="dropdown-column sub-buildings-col">
                      <div className="dropdown-col-label">JANITORIAL BUILDING SPECIALTIES</div>

                      <div 
                        className="dropdown-sub-item"
                        onClick={(e) => { e.stopPropagation(); handleLinkClick('/services/janitorial/daycare'); }}
                      >
                        <div className="sub-icon"><Baby size={16} /></div>
                        <div>
                          <div className="sub-title">Daycare Cleaning</div>
                          <div className="sub-sub">Non-toxic, pediatric-safe sanitization</div>
                        </div>
                        <span className="sub-pill">Child-Safe</span>
                      </div>

                      <div 
                        className="dropdown-sub-item"
                        onClick={(e) => { e.stopPropagation(); handleLinkClick('/services/janitorial/gym'); }}
                      >
                        <div className="sub-icon"><Dumbbell size={16} /></div>
                        <div>
                          <div className="sub-title">Gym Cleaning</div>
                          <div className="sub-sub">Cardio, weights, saunas & locker rooms</div>
                        </div>
                        <span className="sub-pill">High-Touch</span>
                      </div>

                      <div 
                        className="dropdown-sub-item"
                        onClick={(e) => { e.stopPropagation(); handleLinkClick('/services/janitorial/warehouse'); }}
                      >
                        <div className="sub-icon"><Boxes size={16} /></div>
                        <div>
                          <div className="sub-title">Warehouse Cleaning</div>
                          <div className="sub-sub">Concrete scrubbing & high-bay dusting</div>
                        </div>
                        <span className="sub-pill">Industrial</span>
                      </div>

                      <div 
                        className="dropdown-sub-item"
                        onClick={(e) => { e.stopPropagation(); handleLinkClick('/services/janitorial/office'); }}
                      >
                        <div className="sub-icon"><Building2 size={16} /></div>
                        <div>
                          <div className="sub-title">Office Cleaning</div>
                          <div className="sub-sub">Workstations, boardrooms & day porters</div>
                        </div>
                        <span className="sub-pill">Corporate</span>
                      </div>

                      <div 
                        className="dropdown-sub-item"
                        onClick={(e) => { e.stopPropagation(); handleLinkClick('/services/janitorial/medical'); }}
                      >
                        <div className="sub-icon"><ShieldCheck size={16} /></div>
                        <div>
                          <div className="sub-title">Medical Cleaning</div>
                          <div className="sub-sub">CDC/OSHA terminal disinfection</div>
                        </div>
                        <span className="sub-pill">EPA Grade</span>
                      </div>

                      <div 
                        className="dropdown-view-all-sub"
                        onClick={(e) => { e.stopPropagation(); handleLinkClick('/services/janitorial'); }}
                      >
                        <span>View All Janitorial Building Solutions →</span>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

            <button 
              type="button" 
              className={`pill-nav-btn ${currentPath === '/about' ? 'active' : ''}`}
              onClick={() => handleLinkClick('/about')}
            >
              About
            </button>

            <button 
              type="button" 
              className={`pill-nav-btn ${currentPath === '/testimonials' ? 'active' : ''}`}
              onClick={() => handleLinkClick('/testimonials')}
            >
              Testimonials
            </button>

            <button 
              type="button" 
              className={`pill-nav-btn ${currentPath === '/contact' ? 'active' : ''}`}
              onClick={() => handleLinkClick('/contact')}
            >
              Contact
            </button>
          </nav>

          <div className="nav-pill-divider" />

          {/* Drawer Hamburger Toggle Icon */}
          <div 
            className="nav-hamburger-icon"
            onClick={() => setDrawerOpen(!drawerOpen)}
            role="button"
            tabIndex={0}
            aria-label="Toggle all navigation options"
          >
            {drawerOpen ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}
          </div>
        </div>

        {/* Quick USA Direct Hotline / CTA button */}
        <div className="nav-quick-contact">
          <button 
            type="button" 
            className="nav-quote-btn"
            onClick={onOpenConsultation}
          >
            Book Free Walkthrough
          </button>
        </div>
      </header>

      {/* Backdrop overlay for menu drawer */}
      {drawerOpen && (
        <div className="menu-backdrop" onClick={() => setDrawerOpen(false)} />
      )}

      {/* Slide-out Menu Drawer */}
      <aside className={`nav-menu-drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-brand" onClick={() => handleLinkClick('/')}>
            <div className="brand-logo-icon large">
              <img 
                src="/images/logo.jpg" 
                alt="Mirola Cleaning Services Logo" 
                className="drawer-brand-logo-img" 
              />
            </div>
            <div>
              <div className="drawer-title">Mirola Cleaning Services</div>
              <div className="drawer-subtitle">USA's Commercial Specialists</div>
            </div>
          </div>
          <button 
            type="button" 
            className="drawer-close-btn"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="drawer-nav">
          <button 
            type="button" 
            className={`drawer-nav-item ${currentPath === '/' ? 'active' : ''}`}
            onClick={() => handleLinkClick('/')}
          >
            <Home size={18} />
            <div>
              <div className="item-title">Home</div>
              <div className="item-desc">Return to landing page</div>
            </div>
          </button>

          <div className="drawer-section-label">OUR SERVICES</div>

          {/* 1. Janitorial Services Accordion */}
          <div className="drawer-accordion-block">
            <div 
              className={`drawer-accordion-header ${currentPath.includes('/services/janitorial') ? 'active' : ''}`}
              onClick={() => setMobileJanitorialExpanded(!mobileJanitorialExpanded)}
            >
              <div className="accordion-left">
                <Sparkles size={18} color="#c90000" />
                <div>
                  <div className="item-title">Janitorial Services</div>
                  <div className="item-desc">Commercial facility care by building type</div>
                </div>
              </div>
              <ChevronDown 
                size={16} 
                className={`accordion-chevron ${mobileJanitorialExpanded ? 'open' : ''}`} 
              />
            </div>

            {mobileJanitorialExpanded && (
              <div className="drawer-sub-items-list">
                <button 
                  type="button" 
                  className={`drawer-sub-link ${currentPath === '/services/janitorial/daycare' ? 'active' : ''}`}
                  onClick={() => handleLinkClick('/services/janitorial/daycare')}
                >
                  <Baby size={16} />
                  <span>Daycare Cleaning</span>
                  <span className="drawer-mini-tag">Child-Safe</span>
                </button>

                <button 
                  type="button" 
                  className={`drawer-sub-link ${currentPath === '/services/janitorial/gym' ? 'active' : ''}`}
                  onClick={() => handleLinkClick('/services/janitorial/gym')}
                >
                  <Dumbbell size={16} />
                  <span>Gym Cleaning</span>
                  <span className="drawer-mini-tag">Fitness</span>
                </button>

                <button 
                  type="button" 
                  className={`drawer-sub-link ${currentPath === '/services/janitorial/warehouse' ? 'active' : ''}`}
                  onClick={() => handleLinkClick('/services/janitorial/warehouse')}
                >
                  <Boxes size={16} />
                  <span>Warehouse Cleaning</span>
                  <span className="drawer-mini-tag">Logistics</span>
                </button>

                <button 
                  type="button" 
                  className={`drawer-sub-link ${currentPath === '/services/janitorial/office' ? 'active' : ''}`}
                  onClick={() => handleLinkClick('/services/janitorial/office')}
                >
                  <Building2 size={16} />
                  <span>Office Cleaning</span>
                  <span className="drawer-mini-tag">Corporate</span>
                </button>

                <button 
                  type="button" 
                  className={`drawer-sub-link ${currentPath === '/services/janitorial/medical' ? 'active' : ''}`}
                  onClick={() => handleLinkClick('/services/janitorial/medical')}
                >
                  <ShieldCheck size={16} />
                  <span>Medical Cleaning</span>
                  <span className="drawer-mini-tag">Clinical</span>
                </button>

                <button 
                  type="button" 
                  className="drawer-sub-overview-btn"
                  onClick={() => handleLinkClick('/services/janitorial')}
                >
                  <span>Explore All Janitorial Building Types →</span>
                </button>
              </div>
            )}
          </div>

          {/* 2. Floor Care and Strip and Wax */}
          <button 
            type="button" 
            className={`drawer-nav-item ${currentPath === '/services/floor-care' ? 'active' : ''}`}
            onClick={() => handleLinkClick('/services/floor-care')}
          >
            <Layers size={18} />
            <div>
              <div className="item-title">Floor Care and Strip & Wax Services</div>
              <div className="item-desc">Rotary stripping, high-gloss VCT waxing & diamond polish</div>
            </div>
          </button>

          {/* 3. Sanitation Services */}
          <button 
            type="button" 
            className={`drawer-nav-item ${currentPath === '/services/sanitation' ? 'active' : ''}`}
            onClick={() => handleLinkClick('/services/sanitation')}
          >
            <Shield size={18} />
            <div>
              <div className="item-title">Sanitation Services</div>
              <div className="item-desc">Hospital-grade terminal disinfection & misting</div>
            </div>
          </button>

          <div className="drawer-section-label">PAGES & COMPANY</div>
          <button 
            type="button" 
            className={`drawer-nav-item-simple ${currentPath === '/about' ? 'active' : ''}`} 
            onClick={() => handleLinkClick('/about')}
          >
            About Mirola
          </button>
          <button 
            type="button" 
            className={`drawer-nav-item-simple ${currentPath === '/testimonials' ? 'active' : ''}`} 
            onClick={() => handleLinkClick('/testimonials')}
          >
            Client Testimonials
          </button>
          <button 
            type="button" 
            className={`drawer-nav-item-simple ${currentPath === '/contact' ? 'active' : ''}`} 
            onClick={() => handleLinkClick('/contact')}
          >
            Contact & Walkthrough
          </button>
          <button type="button" className="drawer-nav-item-simple" onClick={() => handleSectionScroll('faq')}>
            Frequently Asked Questions
          </button>
        </nav>

        <div className="drawer-footer">
          <div className="drawer-contact-info">
            <a href={`tel:${CONTACT_INFO.phoneTel}`} className="contact-row" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Phone size={15} />
              <span>{CONTACT_INFO.phoneDisplay}</span>
            </a>
            <a href={`mailto:${CONTACT_INFO.email}`} className="contact-row" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Mail size={15} />
              <span>{CONTACT_INFO.email}</span>
            </a>
          </div>

          <button 
            type="button" 
            className="drawer-cta-btn"
            onClick={() => {
              setDrawerOpen(false);
              onOpenConsultation();
            }}
          >
            Book Free USA Consultation
          </button>
        </div>
      </aside>
    </>
  );
};
