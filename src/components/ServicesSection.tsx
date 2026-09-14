import React, { useState } from 'react';
import { ArrowRight, Plus, Building2, Shield, Sparkles, Layers } from 'lucide-react';

interface ServicesSectionProps {
  onOpenConsultation: () => void;
}

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  tags: string[];
  image: string;
  icon: React.ReactNode;
}

const servicesData: ServiceItem[] = [
  {
    id: 'office',
    number: '01',
    title: 'Corporate & Commercial Office Cleaning',
    shortDesc: 'Nightly janitorial, day porter solutions & comprehensive workstation hygiene.',
    fullDesc: 'Enjoy a consistently fresh, sanitized, and welcoming workplace with routine or deep recurring commercial cleaning solutions engineered for New Jersey enterprises.',
    tags: ['Reliable', 'Spotless', 'Personalized'],
    image: '/images/service-office.jpg',
    icon: <Building2 size={20} />
  },
  {
    id: 'medical',
    number: '02',
    title: 'Medical & Healthcare Facility Sanitation',
    shortDesc: 'Hospital-grade terminal disinfection, bio-burden mitigation & compliance.',
    fullDesc: 'Keep your clinical environment 100% compliant and sterile with EPA-registered hospital-grade disinfectants, color-coded microfiber systems, and CDC protocol execution.',
    tags: ['Hospital-Grade', 'Terminal Clean', 'CDC Compliant'],
    image: '/images/service-medical.jpg',
    icon: <Shield size={20} />
  },
  {
    id: 'floors',
    number: '03',
    title: 'Industrial Floor Stripping, Waxing & Buffing',
    shortDesc: 'Diamond polishing, terrazzo restoration, high-gloss VCT wax & concrete sealing.',
    fullDesc: 'Perfect for high-traffic corridors and corporate lobbies. Our specialized multi-speed rotary machinery strips worn finishes and seals floors with mirror-finish polymer coats.',
    tags: ['High-Gloss', 'Diamond Polish', 'Slip-Resistant'],
    image: '/images/service-floors.jpg',
    icon: <Sparkles size={20} />
  },
  {
    id: 'custom',
    number: '04',
    title: 'Custom Janitorial Packages & Day Porters',
    shortDesc: 'Tailored multi-facility management, event support & flexible schedules.',
    fullDesc: 'Need something unique? Choose the frequencies, specialized zones, and continuous day porter presence that matter most, and we will build a turnkey operational schedule.',
    tags: ['Flexible', 'Tailored', 'Convenient'],
    image: '/images/cleaner-video-thumb.jpg',
    icon: <Layers size={20} />
  }
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenConsultation }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>('office');

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        
        {/* Section Header */}
        <div className="services-header-row">
          <div className="services-header-left">
            <div className="services-pill-badge">
              <span className="services-dot" />
              <span className="services-badge-text">OUR EXPERT SERVICES</span>
            </div>
            <h2 className="services-headline">
              From corporate headquarters to specialized medical suites, we deliver <span className="accent-lime">tailored solutions</span> that shine.
            </h2>
          </div>

          <div className="services-header-right">
            <button 
              type="button" 
              className="services-view-all-btn"
              onClick={onOpenConsultation}
              aria-label="Request custom service proposal"
            >
              <span>Explore All Solutions</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Interactive Accordion / Expandable Cards */}
        <div className="services-accordion-list">
          {servicesData.map((service) => {
            const isActive = activeServiceId === service.id;

            return (
              <div 
                key={service.id} 
                className={`service-accordion-item ${isActive ? 'active' : 'collapsed'}`}
              >
                {isActive ? (
                  /* Expanded Active Card (White Box with Photo & Details) */
                  <div className="service-expanded-card">
                    <div className="expanded-content-col">
                      <div className="expanded-meta-row">
                        <div className="service-icon-box">{service.icon}</div>
                        <span className="service-number-tag">{service.number}</span>
                      </div>

                      <h3 className="expanded-service-title">{service.title}</h3>
                      <p className="expanded-service-desc">{service.fullDesc}</p>

                      {/* Tag Pills */}
                      <div className="service-tags-row">
                        {service.tags.map((tag, idx) => (
                          <span key={idx} className="service-tag-pill">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="expanded-cta-row">
                        <button 
                          type="button" 
                          className="service-book-btn"
                          onClick={onOpenConsultation}
                        >
                          <span>Schedule Free Inspection</span>
                          <span className="btn-arrow-circle">
                            <ArrowRight size={14} />
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="expanded-image-col">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="service-feature-img"
                      />
                      <div className="expanded-img-badge">
                        <span>Certified NJ Specialists</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Collapsed Card Row */
                  <div 
                    className="service-collapsed-row"
                    onClick={() => setActiveServiceId(service.id)}
                    role="button"
                    tabIndex={0}
                    aria-expanded="false"
                    aria-label={`Expand details for ${service.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveServiceId(service.id);
                      }
                    }}
                  >
                    <div className="collapsed-left">
                      <span className="collapsed-number">{service.number}</span>
                      <div className="collapsed-title-group">
                        <h3 className="collapsed-title">{service.title}</h3>
                        <p className="collapsed-desc">{service.shortDesc}</p>
                      </div>
                    </div>

                    <div className="collapsed-toggle-icon">
                      <Plus size={20} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
