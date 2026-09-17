import React from 'react';
import { 
  Building2, 
  Dumbbell, 
  Baby, 
  Boxes, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  Shield,
  Layers,
  CheckCircle2
} from 'lucide-react';
import type { AppRoute } from '../types/navigation';

interface JanitorialPageProps {
  onNavigate: (path: AppRoute) => void;
  onOpenConsultation: () => void;
}

const buildingTypes = [
  {
    id: 'daycare',
    title: 'Daycare & Preschool Cleaning',
    path: '/services/janitorial/daycare' as AppRoute,
    icon: <Baby size={28} />,
    tag: 'Child-Safe Non-Toxic',
    image: '/images/thumb_DSC03742.jpg',
    description: 'Hospital-grade, non-toxic sanitization for classrooms, play mats, nurseries, and dining zones with zero chemical residue.',
    features: ['EPA-registered pediatric safe disinfectant', 'Daily toy & nap cot sanitization', 'Outbreak prevention protocols']
  },
  {
    id: 'gym',
    title: 'Gym & Fitness Center Cleaning',
    path: '/services/janitorial/gym' as AppRoute,
    icon: <Dumbbell size={28} />,
    tag: 'High-Touch Sanitized',
    image: '/images/drive_folder_2/DSC00162.jpg',
    description: 'Specialized sweat, fungus, and odor mitigation across free weights, cardio equipment, saunas, and modern locker facilities.',
    features: ['Cardio console & touchscreen disinfection', 'Locker room & tile shower antimicrobial care', 'Rubber mat & synthetic turf deep scrub']
  },
  {
    id: 'warehouse',
    title: 'Warehouse & Logistics Cleaning',
    path: '/services/janitorial/warehouse' as AppRoute,
    icon: <Boxes size={28} />,
    tag: 'Industrial Strength',
    image: '/images/warehouse_cleaning_hero.jpg',
    description: 'Heavy-duty concrete sweeping, high-bay overhead dusting, loading dock hygiene, and high-capacity industrial waste management.',
    features: ['Ride-on auto-scrubber concrete care', 'High-reach racking & beam dusting', 'OSHA compliant slip-hazard mitigation']
  },
  {
    id: 'office',
    title: 'Corporate Office Cleaning',
    path: '/services/janitorial/office' as AppRoute,
    icon: <Building2 size={28} />,
    tag: 'Executive Standards',
    image: '/images/drive_folder_2/DSC00318.jpg',
    description: 'Nightly janitorial, day porter presence, workstation touchpoint disinfection, executive boardrooms, and sanitized pantries.',
    features: ['HEPA commercial vacuuming', 'Boardroom & workstation hygiene', 'Restroom restock & odor control']
  },
  {
    id: 'medical',
    title: 'Medical & Clinical Facility Cleaning',
    path: '/services/janitorial/medical' as AppRoute,
    icon: <ShieldCheck size={28} />,
    tag: 'Hospital-Grade Terminal',
    image: '/images/medical_cleaning_hero.png',
    description: 'CDC, OSHA, and HIPAA-compliant healthcare sanitation engineered for surgical suites, medical labs, and patient exam rooms.',
    features: ['Color-coded microfiber cross-contamination defense', 'Terminal cleaning & bio-burden elimination', 'Bloodborne pathogen certified staff']
  }
];

export const JanitorialPage: React.FC<JanitorialPageProps> = ({ onNavigate, onOpenConsultation }) => {
  return (
    <div className="service-page-wrapper janitorial-hub-page">
      
      {/* 1. Hero Banner */}
      <section className="service-hero-section">
        <div className="service-page-container">
          
          <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
            <button type="button" className="breadcrumb-link" onClick={() => onNavigate('/')}>
              Home
            </button>
            <span className="breadcrumb-separator">/</span>
            <button type="button" className="breadcrumb-link" onClick={() => onNavigate('/services/janitorial')}>
              Services
            </button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Janitorial Services</span>
          </nav>

          <div className="service-hero-grid">
            <div className="service-hero-copy scroll-reveal-left">
              <div className="service-page-badge">
                <span className="badge-pulse-dot" />
                <span>COMMERCIAL JANITORIAL SPECIALISTS</span>
              </div>

              <h1 className="service-hero-title">
                Comprehensive Commercial <span className="service-hero-highlight">Janitorial Services</span>
              </h1>

              <p className="service-hero-subtitle">
                Tailored recurring cleaning schedules, day porter management, and turnkey facility maintenance across the USA. Select your specific building type below to explore dedicated protocols and scope of work.
              </p>

              <div className="service-hero-actions">
                <button 
                  type="button" 
                  className="service-primary-cta"
                  onClick={onOpenConsultation}
                >
                  <span>Book Free USA Facility Walkthrough</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="service-hero-stats scroll-reveal-stagger">
                <div className="service-stat-card">
                  <div className="stat-val">5+</div>
                  <div className="stat-lbl">Facility Types Specialized</div>
                </div>
                <div className="service-stat-card">
                  <div className="stat-val">24/7</div>
                  <div className="stat-lbl">Nightly & Day Porter Crews</div>
                </div>
                <div className="service-stat-card">
                  <div className="stat-val">100%</div>
                  <div className="stat-lbl">Quality Audit Guarantee</div>
                </div>
              </div>
            </div>

            <div className="service-hero-media scroll-reveal-right">
              <div className="hero-image-frame">
                <img 
                  src="/images/drive_folder_2/DSC00550.jpg" 
                  alt="Mirola Cleaning Services Uniformed Staff" 
                  className="service-hero-main-img" 
                />
                <div className="hero-image-glass-card">
                  <div className="glass-card-icon">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <div className="glass-card-title">Trained, Bonded & Insured Crew</div>
                    <div className="glass-card-sub">Serving Commercial Facilities Nationwide in the USA</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Interactive Building Types Showcase Grid */}
      <section className="janitorial-buildings-section">
        <div className="service-page-container">
          <div className="features-header-center scroll-reveal">
            <span className="section-pill-label">BUILDING TYPES WE SPECIALIZE IN</span>
            <h2 className="features-section-title">Select Your Facility Type for Dedicated Protocols</h2>
            <p className="features-section-desc">
              Every building operates under distinct occupancy rhythms and hygiene standards. Choose your property type to view customized specifications and photo galleries.
            </p>
          </div>

          <div className="building-cards-large-grid scroll-reveal-stagger">
            {buildingTypes.map((b) => (
              <div 
                key={b.id} 
                className="building-large-card"
                onClick={() => onNavigate(b.path)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onNavigate(b.path);
                }}
              >
                <div className="building-card-media-wrap">
                  <img src={b.image} alt={b.title} className="building-card-img" />
                  <span className="building-card-tag">{b.tag}</span>
                  <div className="building-card-icon-floating">
                    {b.icon}
                  </div>
                </div>

                <div className="building-card-content">
                  <h3 className="building-card-title">{b.title}</h3>
                  <p className="building-card-desc">{b.description}</p>
                  
                  <ul className="building-card-features">
                    {b.features.map((feat, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={15} color="#c90000" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="building-card-action-bar">
                    <span className="view-page-cta">
                      <span>Explore {b.title}</span>
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Cross Services Row */}
      <section className="related-services-section">
        <div className="service-page-container">
          <div className="related-header scroll-reveal">
            <span className="section-pill-label">OTHER CORE SPECIALTIES</span>
            <h2 className="related-title">Complete Floor Care & Terminal Sanitation</h2>
          </div>

          <div className="related-cards-grid scroll-reveal-stagger">
            <div 
              className="related-service-card"
              onClick={() => onNavigate('/services/floor-care')}
              role="button"
              tabIndex={0}
            >
              <div className="related-icon-box"><Layers size={24} /></div>
              <h4 className="related-card-title">Floor Care and Strip & Wax Services</h4>
              <p className="related-card-desc">Rotary scrubbing, high-gloss VCT finish, burnishing, marble polishing & terrazzo restoration.</p>
              <span className="related-card-link">
                <span>View Floor Care Page</span>
                <ArrowRight size={14} />
              </span>
            </div>

            <div 
              className="related-service-card"
              onClick={() => onNavigate('/services/sanitation')}
              role="button"
              tabIndex={0}
            >
              <div className="related-icon-box"><Shield size={24} /></div>
              <h4 className="related-card-title">Sanitation Services</h4>
              <p className="related-card-desc">Hospital-grade terminal disinfection, electrostatic misting, high-touch pathogen barriers & clean-room protocols.</p>
              <span className="related-card-link">
                <span>View Sanitation Page</span>
                <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom CTA */}
      <section className="service-bottom-cta-section">
        <div className="service-page-container">
          <div className="bottom-cta-inner scroll-reveal-scale">
            <div className="cta-highlight-badge">
              <Clock size={15} />
              <span>CUSTOM COMMERCIAL CONTRACTS • 24/7 SUPPORT</span>
            </div>
            <h2 className="cta-headline">
              Ready for a Tailored Janitorial Program for Your USA Facility?
            </h2>
            <p className="cta-subheadline">
              Speak with our operations director to build a customized daily or nightly cleaning scope designed around your exact square footage and operational schedule.
            </p>
            <div className="cta-buttons-wrap">
              <button 
                type="button" 
                className="cta-book-btn"
                onClick={onOpenConsultation}
              >
                <span>Request Custom Proposal</span>
                <ArrowRight size={16} />
              </button>
              <button 
                type="button" 
                className="cta-return-home-btn"
                onClick={() => onNavigate('/')}
              >
                <span>Return to Home</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
