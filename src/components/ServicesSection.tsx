import React, { useState } from 'react';
import { 
  ArrowRight, 
  Plus, 
  Building2, 
  Shield, 
  Sparkles, 
  Layers, 
  Baby, 
  Dumbbell, 
  Boxes, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';
import type { AppRoute } from '../types/navigation';

interface ServicesSectionProps {
  onOpenConsultation: () => void;
  onNavigate: (path: AppRoute) => void;
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
  pagePath: AppRoute;
  subBuildings?: {
    name: string;
    path: AppRoute;
    icon: React.ReactNode;
  }[];
}

const servicesData: ServiceItem[] = [
  {
    id: 'janitorial',
    number: '01',
    title: 'Janitorial Services',
    shortDesc: 'Tailored recurring commercial facility care customized by specific building occupancy.',
    fullDesc: 'Ensure a pristine, hygienic, and compliant workplace tailored to your exact facility type. Click any building specialty below to explore dedicated scopes of work, trained crews, and inspection protocols.',
    tags: ['Daily & Nightly', '5 Building Types', 'Dedicated Porters'],
    image: '/images/drive_folder_2/DSC00550.jpg',
    icon: <Sparkles size={20} />,
    pagePath: '/services/janitorial',
    subBuildings: [
      { name: 'Daycare Cleaning', path: '/services/janitorial/daycare', icon: <Baby size={14} /> },
      { name: 'Gym Cleaning', path: '/services/janitorial/gym', icon: <Dumbbell size={14} /> },
      { name: 'Warehouse Cleaning', path: '/services/janitorial/warehouse', icon: <Boxes size={14} /> },
      { name: 'Office Cleaning', path: '/services/janitorial/office', icon: <Building2 size={14} /> },
      { name: 'Medical Cleaning', path: '/services/janitorial/medical', icon: <ShieldCheck size={14} /> },
    ]
  },
  {
    id: 'floor-care',
    number: '02',
    title: 'Floor Care and Strip & Wax Services',
    shortDesc: 'Rotary stripping, high-gloss VCT waxing, high-speed burnishing & terrazzo restoration.',
    fullDesc: 'Restore dull, scuffed, and high-traffic commercial corridors to brilliant, mirror-like clarity. Our rotary stripping units remove yellowed wax down to the bare tile, applying 5 coats of 25%+ high-solid polymer finish for extraordinary reflection and ASTM slip-resistant safety.',
    tags: ['High-Gloss VCT', 'Diamond Polish', 'Slip-Resistant'],
    image: '/images/drive_folder_2/DSC03844.jpg',
    icon: <Layers size={20} />,
    pagePath: '/services/floor-care'
  },
  {
    id: 'sanitation',
    number: '03',
    title: 'Sanitation Services',
    shortDesc: 'Hospital-grade terminal disinfection, touchpoint bio-barriers & electrostatic misting.',
    fullDesc: 'Keep your facility safe from viral outbreaks and pathogens with EPA List N hospital germicides, 360-degree electrostatic antimicrobial misting, and ATP bioluminescence verification that neutralizes 99.99% of bacteria and viruses on contact.',
    tags: ['EPA List N', 'Electrostatic Mist', '99.99% Kill'],
    image: '/images/drive_folder_2/DSC00402.jpg',
    icon: <Shield size={20} />,
    pagePath: '/services/sanitation'
  }
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onOpenConsultation, 
  onNavigate 
}) => {
  const [activeServiceId, setActiveServiceId] = useState<string>('janitorial');

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        
        {/* Section Header */}
        <div className="services-header-row">
          <div className="services-header-left">
            <div className="services-pill-badge">
              <span className="services-dot" />
              <span className="services-badge-text">OUR EXPERT COMMERCIAL SERVICES</span>
            </div>
            <h2 className="services-headline">
              Specialized commercial cleaning engineered for <span className="accent-lime">USA enterprises</span>.
            </h2>
          </div>

          <div className="services-header-right">
            <button 
              type="button" 
              className="services-view-all-btn"
              onClick={() => onNavigate('/services/janitorial')}
              aria-label="Explore all commercial solutions"
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

                      {/* Sub-buildings pills if Janitorial */}
                      {service.subBuildings && (
                        <div className="janitorial-sub-buildings-box">
                          <div className="sub-buildings-label">
                            <span>SELECT BUILDING TYPE FOR DEDICATED SCOPE:</span>
                          </div>
                          <div className="sub-buildings-pills-row">
                            {service.subBuildings.map((b, idx) => (
                              <button
                                key={idx}
                                type="button"
                                className="sub-building-nav-pill"
                                onClick={() => onNavigate(b.path)}
                                title={`View dedicated ${b.name} page`}
                              >
                                {b.icon}
                                <span>{b.name}</span>
                                <ArrowRight size={12} className="pill-arrow" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

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
                          onClick={() => onNavigate(service.pagePath)}
                        >
                          <span>View Full {service.title} Page</span>
                          <span className="btn-arrow-circle">
                            <ArrowRight size={14} />
                          </span>
                        </button>
                        <button 
                          type="button" 
                          className="service-inspection-secondary-btn"
                          onClick={onOpenConsultation}
                        >
                          <Sparkles size={14} className="btn-sparkle-icon" />
                          <span>Get Free Estimate</span>
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
                        <CheckCircle2 size={14} color="#c90000" />
                        <span>Certified USA Specialists</span>
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
