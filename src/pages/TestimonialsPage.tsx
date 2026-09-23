import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  ChevronRight,
  Building2,
  Award
} from 'lucide-react';
import { CONTACT_INFO } from '../constants/contactInfo';
import { ClientLogoTicker } from '../components/ClientLogoTicker';
import type { AppRoute } from '../types/navigation';

interface TestimonialsPageProps {
  onNavigate: (path: AppRoute) => void;
  onOpenConsultation: () => void;
}

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  facility: string;
  location: string;
  category: 'office' | 'medical' | 'warehouse' | 'gym' | 'daycare';
  categoryLabel: string;
  rating: number;
  quote: string;
  date: string;
  highlight: string;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ 
  onNavigate, 
  onOpenConsultation 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const testimonials: TestimonialItem[] = [
    {
      id: 1,
      name: 'Marcus Vance',
      role: 'Director of Facility Operations',
      facility: 'Lexington Corporate Center',
      location: 'Jersey City, NJ',
      category: 'office',
      categoryLabel: 'Corporate Office',
      rating: 5,
      quote: 'Managing 120,000 square feet of class-A office space used to be a continuous headache with vendors failing night shifts. Since onboarding Mirola, our digital supervisor checklists arrive like clockwork at 5:00 AM every morning. Tenant cleanliness complaints dropped to zero in our first month.',
      date: 'Verified Client • 120k Sq. Ft. Commercial Complex',
      highlight: '99.8% Supervisor Audit Score'
    },
    {
      id: 2,
      name: 'Dr. Elena Rostova',
      role: 'Chief Medical Administrator',
      facility: 'Summit Health Ambulatory Pavilion',
      location: 'Paramus, NJ',
      category: 'medical',
      categoryLabel: 'Medical Clinic',
      rating: 5,
      quote: 'Medical compliance in surgical suites leaves zero room for error. Mirola’s technicians understand dwell times, color-coded cross-contamination prevention, and bloodborne pathogen protocols. They maintain the highest standard of any commercial vendor we have ever employed.',
      date: 'Verified Client • Outpatient Surgical Suite',
      highlight: 'Hospital-Grade Terminal Sanitization'
    },
    {
      id: 3,
      name: 'Derek Kowalski',
      role: 'VP of Logistics & Safety',
      facility: 'Apex Global Distribution Hub',
      location: 'Edison, NJ',
      category: 'warehouse',
      categoryLabel: 'Warehouse & Logistics',
      rating: 5,
      quote: 'With heavy forklift traffic and high-bay dust accumulation across 240,000 square feet, regular cleaners could never keep up. Mirola deployed ride-on scrubbers and dedicated industrial crews. Our concrete floors have never looked better, and OSHA slip hazards were completely mitigated.',
      date: 'Verified Client • 240k Sq. Ft. Logistics Facility',
      highlight: 'Zero OSHA Slip Violations'
    },
    {
      id: 4,
      name: 'Sarah Jenkins',
      role: 'General Manager',
      facility: 'MetroFit Premier Athletics',
      location: 'Hoboken, NJ',
      category: 'gym',
      categoryLabel: 'Fitness Center',
      rating: 5,
      quote: 'Member retention in a premium gym lives and dies by locker room sanitation and equipment hygiene. Mirola performs antimicrobial fogging and deep steam extraction on our saunas, showers, and turf areas every single night. Our member cleanliness feedback is at an all-time high.',
      date: 'Verified Client • 35k Sq. Ft. Athletic Center',
      highlight: 'Antimicrobial Shower & Locker Care'
    },
    {
      id: 5,
      name: 'Patricia Morales',
      role: 'Campus Executive Director',
      facility: 'BrightPath Early Learning Academy',
      location: 'Morristown, NJ',
      category: 'daycare',
      categoryLabel: 'Educational Daycare',
      rating: 5,
      quote: 'Parents scrutinize daycare cleanliness relentlessly. Mirola uses Green Seal certified, non-toxic sanitizers that eliminate viral outbreaks without leaving any harsh chemical fumes or residues on toys and cribs. Their consistency provides genuine peace of mind.',
      date: 'Verified Client • Child Care & Early Learning',
      highlight: 'Non-Toxic Pediatric Sanitization'
    },
    {
      id: 6,
      name: 'Jonathan Sterling',
      role: 'Senior Property Manager',
      facility: 'Harborview Financial Tower',
      location: 'Newark, NJ',
      category: 'office',
      categoryLabel: 'Commercial High-Rise',
      rating: 5,
      quote: 'What sets Mirola apart is direct communication. If we have an urgent spill or VIP board meeting scheduled at 7:00 AM, their operations team responds within minutes. They treat our building like their own headquarters.',
      date: 'Verified Client • 18-Story Commercial Tower',
      highlight: 'Dedicated Account Director'
    },
    {
      id: 7,
      name: 'Amanda Brooks',
      role: 'Operations Lead',
      facility: 'Tri-State Cold Storage Logistics',
      location: 'Cranbury, NJ',
      category: 'warehouse',
      categoryLabel: 'Industrial Distribution',
      rating: 5,
      quote: 'Our temperature-controlled distribution facility requires strict adherence to food safety hygiene. Mirola’s crew is uniformed, punctual, and rigorously adheres to safety protocols. A true partner in logistics management.',
      date: 'Verified Client • Food-Grade Storage Hub',
      highlight: 'Food-Grade Hygiene Certified'
    },
    {
      id: 8,
      name: 'David Chen',
      role: 'Managing Director',
      facility: 'New Jersey Orthopedic Surgery Center',
      location: 'Clifton, NJ',
      category: 'medical',
      categoryLabel: 'Medical Suite',
      rating: 5,
      quote: 'Cleanliness in orthopedic recovery suites directly impacts surgical infection metrics. Mirola’s documented ATP swab scores and consistent supervisor audits ensure our facility remains in full state compliance at all times.',
      date: 'Verified Client • Surgical Suite Center',
      highlight: 'Documented ATP Swab Audits'
    }
  ];

  const filteredTestimonials = activeCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === activeCategory);

  return (
    <div className="subpage-wrapper testimonials-standalone-page">
      
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
            <span className="subpage-breadcrumb-current">Testimonials</span>
          </nav>

          <div className="subpage-hero-grid">
            <div className="subpage-hero-copy">
              <div className="subpage-badge">
                <span className="subpage-pulse-dot" />
                <span>VERIFIED ENTERPRISE REVIEWS</span>
              </div>

              <h1 className="subpage-hero-title">
                Trusted by USA’s{' '}
                <span className="subpage-highlight-red">Leading Commercial</span>{' '}
                Properties
              </h1>

              <p className="subpage-hero-subtitle">
                Read verified feedback from facility directors, property managers, and healthcare administrators who trust Mirola Cleaning Services to safeguard their commercial properties every single night.
              </p>

              <div className="subpage-hero-actions">
                <button 
                  type="button" 
                  className="subpage-btn-primary"
                  onClick={onOpenConsultation}
                >
                  <span>Book Free USA Facility Walkthrough</span>
                  <ArrowRight size={16} />
                </button>

                <a href={`tel:${CONTACT_INFO.phoneTel}`} className="subpage-phone-badge">
                  <div className="subpage-phone-icon-circle">
                    <Phone size={15} />
                  </div>
                  <span>{CONTACT_INFO.phoneDisplay}</span>
                </a>
              </div>

              {/* Trust Metrics Chips */}
              <div className="subpage-hero-stats-row">
                <div className="subpage-stat-card">
                  <div className="subpage-stat-num">4.9<span>/5</span></div>
                  <div className="subpage-stat-label">500+ Audited Scores</div>
                </div>
                <div className="subpage-stat-card">
                  <div className="subpage-stat-num">99.4<span>%</span></div>
                  <div className="subpage-stat-label">Client Retention</div>
                </div>
                <div className="subpage-stat-card">
                  <div className="subpage-stat-num">15M<span>+</span></div>
                  <div className="subpage-stat-label">Sq. Ft. Maintained</div>
                </div>
                <div className="subpage-stat-card">
                  <div className="subpage-stat-num">100<span>%</span></div>
                  <div className="subpage-stat-label">Verified Operators</div>
                </div>
              </div>
            </div>

            {/* Hero Right Column: Authentic Commercial Floor Care Photo Showcase */}
            <div className="subpage-hero-media">
              <div className="subpage-hero-image-card">
                <img 
                  src="/images/drive_folder_2/DSC00402.jpg" 
                  alt="High-gloss commercial facility floor care executed by Mirola Cleaning Services" 
                  className="subpage-hero-img"
                />
                <div className="subpage-hero-img-badge">
                  <div className="badge-pulse-indicator" />
                  <div>
                    <div className="img-badge-title">500+ Commercial Facilities Safeguarded</div>
                    <div className="img-badge-subtitle">4.9 / 5.0 Star Verified Client Satisfaction Across USA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CLIENT LOGOS SLIDER (CRISP WHITE) */}
      <section className="subpage-white-section" style={{ padding: '36px 0 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div className="subpage-container">
          <ClientLogoTicker 
            showSubtitle={true} 
            badgeText="CLIENTS WE'VE WORKED FOR"
            subtitle="Commercial Clients & Industry Partners Across the USA"
            description="These are the commercial clients and facilities we've worked for, maintaining pristine inspection standards day in and day out."
          />
        </div>
      </section>

      {/* 3. FILTER TABS & REVIEWS GRID (CRISP WHITE) */}
      <section className="subpage-white-section">
        <div className="subpage-container">
          
          <div className="subpage-section-header text-center">
            <div className="subpage-light-badge">
              <Award size={13} />
              <span>FACILITY TESTIMONIALS</span>
            </div>
            <h2 className="subpage-section-title">
              What Commercial Property Managers Say About Mirola
            </h2>
            <p className="subpage-section-desc center">
              Filter by your facility type to see relevant case feedback and quality metrics from peer commercial operators.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="subpage-filter-bar">
            <button 
              type="button" 
              className={`subpage-filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Facilities ({testimonials.length})
            </button>
            <button 
              type="button" 
              className={`subpage-filter-btn ${activeCategory === 'office' ? 'active' : ''}`}
              onClick={() => setActiveCategory('office')}
            >
              Corporate Offices
            </button>
            <button 
              type="button" 
              className={`subpage-filter-btn ${activeCategory === 'medical' ? 'active' : ''}`}
              onClick={() => setActiveCategory('medical')}
            >
              Medical & Clinical
            </button>
            <button 
              type="button" 
              className={`subpage-filter-btn ${activeCategory === 'warehouse' ? 'active' : ''}`}
              onClick={() => setActiveCategory('warehouse')}
            >
              Warehouses & Logistics
            </button>
            <button 
              type="button" 
              className={`subpage-filter-btn ${activeCategory === 'gym' ? 'active' : ''}`}
              onClick={() => setActiveCategory('gym')}
            >
              Fitness & Athletics
            </button>
            <button 
              type="button" 
              className={`subpage-filter-btn ${activeCategory === 'daycare' ? 'active' : ''}`}
              onClick={() => setActiveCategory('daycare')}
            >
              Educational & Daycare
            </button>
          </div>

          {/* Reviews Grid */}
          <div className="subpage-reviews-grid">
            {filteredTestimonials.map((t) => (
              <div key={t.id} className="subpage-review-card">
                
                <div className="review-card-top">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div className="review-stars-row">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 700, background: '#fee2e2', color: '#c90000', padding: '3px 10px', borderRadius: '9999px', textTransform: 'uppercase' }}>
                      {t.categoryLabel}
                    </span>
                  </div>

                  <p className="review-quote">
                    "{t.quote}"
                  </p>
                </div>

                <div className="review-card-footer">
                  <div>
                    <div className="review-author-name">{t.name}</div>
                    <div className="review-author-meta">{t.role}</div>
                    <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
                      {t.facility} • {t.location}
                    </div>
                  </div>

                  <div className="review-verified-pill">
                    <CheckCircle2 size={12} />
                    <span>Verified</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. COMMERCIAL QUALITY GUARANTEE (LIGHT SLATE #f8fafc) */}
      <section className="subpage-light-section">
        <div className="subpage-container">
          
          <div className="subpage-section-header text-center">
            <div className="subpage-light-badge">
              <ShieldCheck size={13} />
              <span>THE MIROLA PLEDGE</span>
            </div>
            <h2 className="subpage-section-title">
              Our 3-Part Commercial Quality Commitment
            </h2>
            <p className="subpage-section-desc center">
              Every contract is backed by measurable SLAs, dedicated account leadership, and immediate issue resolution.
            </p>
          </div>

          <div className="subpage-pillars-grid">
            
            <div className="subpage-pillar-card">
              <div className="pillar-icon-box">
                <ShieldCheck size={24} />
              </div>
              <h3 className="pillar-title">100% Shift Satisfaction Guarantee</h3>
              <p className="pillar-text">
                If any zone fails to meet agreed cleanliness standards, we dispatch a dedicated supervisor crew to re-clean within 24 hours at zero additional cost.
              </p>
              <ul className="pillar-bullets">
                <li className="pillar-bullet-item">
                  <CheckCircle2 size={16} className="bullet-check" />
                  <span>Immediate corrective re-clean SLA</span>
                </li>
                <li className="pillar-bullet-item">
                  <CheckCircle2 size={16} className="bullet-check" />
                  <span>Transparent credit protocol if standards are unmet</span>
                </li>
              </ul>
            </div>

            <div className="subpage-pillar-card">
              <div className="pillar-icon-box">
                <Building2 size={24} />
              </div>
              <h3 className="pillar-title">Dedicated Regional Account Director</h3>
              <p className="pillar-text">
                No automated call centers or junior dispatchers. You receive the direct mobile phone number of a senior operations director who oversees your building.
              </p>
              <ul className="pillar-bullets">
                <li className="pillar-bullet-item">
                  <CheckCircle2 size={16} className="bullet-check" />
                  <span>Monthly in-person walkthrough reviews</span>
                </li>
                <li className="pillar-bullet-item">
                  <CheckCircle2 size={16} className="bullet-check" />
                  <span>Direct text & phone escalation line</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 5. RED CTA BANNER */}
      <section className="subpage-cta-banner-red">
        <div className="subpage-container">
          <div className="cta-banner-copy">
            <h2>Ready to Experience Commercial Cleaning Without Compromise?</h2>
            <p>
              Schedule a comprehensive on-site facility walk-through and receive a tailored, transparent scope of work within 24 hours.
            </p>
          </div>
          <div className="cta-banner-actions">
            <button 
              type="button" 
              className="cta-banner-btn-white"
              onClick={onOpenConsultation}
            >
              <span>Book Your Free Walkthrough</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
