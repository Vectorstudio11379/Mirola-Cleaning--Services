import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  ChevronRight
} from 'lucide-react';
import { CONTACT_INFO } from '../constants/contactInfo';
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
  avatar: string;
  quote: string;
  date: string;
  highlight: string;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ onNavigate, onOpenConsultation }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const testimonials: TestimonialItem[] = [
    {
      id: 1,
      name: 'Carlos Martinez',
      role: 'Founder & CEO',
      facility: 'Uptown Corporate Center',
      location: 'Jersey City, USA',
      category: 'office',
      categoryLabel: 'Corporate Office',
      rating: 5,
      avatar: 'CM',
      quote: 'I’ve managed corporate properties across the USA for over twelve years, and none compare to Mirola Cleaning Services. From our initial walkthrough, their operations were seamless. Our polished marble lobbies, 4 floors of executive suites, and conference rooms have never looked crisper. Tenant satisfaction scores increased immediately.',
      date: 'Verified Client • 3-Year Contract',
      highlight: 'Flawless Marble & Executive Care'
    },
    {
      id: 2,
      name: 'David Thompson',
      role: 'Director of Facility Operations',
      facility: 'Apex Healthcare Plaza',
      location: 'Newark, USA',
      category: 'medical',
      categoryLabel: 'Medical Clinic',
      rating: 5,
      avatar: 'DT',
      quote: 'In an outpatient medical center, hospital-grade disinfection is non-negotiable. Mirola’s healthcare cleaning team executes terminal disinfection to the highest CDC standard. Their digital checklist audits and ATP surface verification give our clinical compliance board absolute confidence.',
      date: 'Verified Client • Medical Facility',
      highlight: 'CDC & HIPAA Terminal Compliance'
    },
    {
      id: 3,
      name: 'James Walker',
      role: 'Senior Logistics Operations Manager',
      facility: 'Metro Distribution Center',
      location: 'Edison, USA',
      category: 'warehouse',
      categoryLabel: 'Logistics Warehouse',
      rating: 5,
      avatar: 'JW',
      quote: 'Maintaining a 160,000 sq ft distribution hub during 24/7 fulfillment operations is a logistical challenge. Mirola’s industrial crew operates ride-on auto-scrubbers and high-bay dusters around our shift changes without a single second of operational downtime. Zero slip incidents since onboarding them.',
      date: 'Verified Client • 160k Sq Ft Logistics',
      highlight: 'Zero Downtime Shift Execution'
    },
    {
      id: 4,
      name: 'Elena Rostova',
      role: 'Managing Partner',
      facility: 'Vantage Legal Tower',
      location: 'Paramus, USA',
      category: 'office',
      categoryLabel: 'Corporate Office',
      rating: 5,
      avatar: 'ER',
      quote: 'Our law firm hosts high-profile clients every day. Mirola ensures our conference rooms, glass partitions, and hardwood floors are pristine every morning before our doors open. Their crew is strictly vetted, respects confidential desk documents, and executes nightly without fail.',
      date: 'Verified Client • Corporate Law Campus',
      highlight: 'Strict Confidentiality & Nightly Precision'
    },
    {
      id: 5,
      name: 'Marcus Vance',
      role: 'Regional Managing Director',
      facility: 'IronCore Athletic Club',
      location: 'Hoboken, USA',
      category: 'gym',
      categoryLabel: 'Fitness Center',
      rating: 5,
      avatar: 'MV',
      quote: 'Sweat, odor, and moisture buildup will ruin a fitness club’s reputation in weeks if not aggressively managed. Mirola eradicated all lingering locker room odors and keeps our rubber weight areas and cardio touchscreens sanitized twice daily. Member reviews mention our cleanliness constantly.',
      date: 'Verified Client • High-Traffic Fitness Center',
      highlight: 'Odor & Sweat Defense'
    },
    {
      id: 6,
      name: 'Sarah Jenkins',
      role: 'Preschool Director',
      facility: 'BrightPath Early Learning Center',
      location: 'Morristown, USA',
      category: 'daycare',
      categoryLabel: 'Daycare & School',
      rating: 5,
      avatar: 'SJ',
      quote: 'Finding a cleaning service that balances hospital-level germ kill rates with 100% child-safe, non-toxic botanicals seemed impossible until we found Mirola. Our classrooms, toy bins, and nap cots are sanitized daily with zero caustic fumes or residues. Our parent committee couldn’t be happier.',
      date: 'Verified Client • Pediatric Certified',
      highlight: '100% Pediatric Safe Chemistry'
    },
    {
      id: 7,
      name: 'Robert Sterling',
      role: 'VP of Commercial Real Estate',
      facility: 'Summit Financial Campus',
      location: 'Princeton, USA',
      category: 'office',
      categoryLabel: 'Corporate Office',
      rating: 5,
      avatar: 'RS',
      quote: 'Mirola provided a transparent, itemized proposal within 24 hours of our site walkthrough. Their day porter staff is impeccably uniformed, proactive, and communicates in real-time through their client dispatch portal. Switching our portfolio to them was one of the easiest operational decisions we’ve made.',
      date: 'Verified Client • Multi-Tenant Campus',
      highlight: 'Itemized Pricing & Proactive Porters'
    },
    {
      id: 8,
      name: 'Dr. Michael Chen',
      role: 'Chief Medical Officer',
      facility: 'Horizon Outpatient Surgical Suites',
      location: 'Clifton, USA',
      category: 'medical',
      categoryLabel: 'Medical Clinic',
      rating: 5,
      avatar: 'MC',
      quote: 'Cleanliness in surgical recovery suites is a matter of patient safety. Mirola’s technicians understand dwell times, color-coded cross-contamination prevention, and bloodborne pathogen protocols. They maintain the highest standard of any commercial vendor we have employed.',
      date: 'Verified Client • Surgical Suite Center',
      highlight: 'Verified Dwell Time Standards'
    }
  ];

  const filteredTestimonials = activeCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === activeCategory);

  return (
    <div className="service-page-wrapper testimonials-standalone-page">
      {/* 1. Header & Breadcrumbs Section */}
      <section className="service-hero-section">
        <div className="service-page-container">
          
          <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
            <button type="button" className="breadcrumb-link" onClick={() => onNavigate('/')}>
              Home
            </button>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">Testimonials</span>
          </nav>

          <div className="service-hero-grid">
            <div className="service-hero-copy scroll-reveal-left">
              <div className="service-page-badge">
                <span className="badge-pulse-dot" />
                <span>VERIFIED ENTERPRISE REVIEWS</span>
              </div>

              <h1 className="service-hero-title">
                Trusted by USA’s <span className="service-hero-highlight">Leading Commercial</span> Properties
              </h1>

              <p className="service-hero-subtitle">
                Over 500+ corporate offices, outpatient healthcare centers, logistics hubs, and fitness chains depend on Mirola Cleaning Services for spotless standards, responsive day porters, and complete peace of mind.
              </p>

              {/* Social Proof Rating Capsule */}
              <div className="rating-summary-capsule" style={{ marginBottom: '28px' }}>
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span className="rating-score">4.9 / 5.0</span>
                <span className="rating-dot">•</span>
                <span className="rating-count">500+ Verified Corporate Clients</span>
              </div>

              <div className="service-hero-actions">
                <button 
                  type="button" 
                  className="service-primary-cta"
                  onClick={onOpenConsultation}
                >
                  <span>Book Free USA Facility Walkthrough</span>
                  <ArrowRight size={16} />
                </button>

                <a href={`tel:${CONTACT_INFO.phoneTel}`} className="service-phone-link">
                  <div className="phone-icon-pill">
                    <Phone size={16} />
                  </div>
                  <div className="phone-text-group">
                    <span className="phone-label">Direct Facility Line</span>
                    <span className="phone-number">{CONTACT_INFO.phoneDisplay}</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: Key Trust Badges */}
            <div className="service-hero-media scroll-reveal-right">
              <div className="testimonials-trust-card">
                <div className="trust-card-header">
                  <ShieldCheck size={28} color="#c90000" />
                  <div>
                    <h3>100% Satisfaction Guarantee</h3>
                    <p>Every shift verified by supervisor audit checklists.</p>
                  </div>
                </div>

                <div className="trust-checklist">
                  <div className="trust-check-row">
                    <CheckCircle2 size={16} color="#c90000" />
                    <span>Background-checked, bonded, and insured cleaning technicians</span>
                  </div>
                  <div className="trust-check-row">
                    <CheckCircle2 size={16} color="#c90000" />
                    <span>Transparent, itemized scope-of-work proposals within 24 hours</span>
                  </div>
                  <div className="trust-check-row">
                    <CheckCircle2 size={16} color="#c90000" />
                    <span>Dedicated regional facility account director for direct contact</span>
                  </div>
                  <div className="trust-check-row">
                    <CheckCircle2 size={16} color="#c90000" />
                    <span>24/7 priority dispatch for urgent facility spill response</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Filter Tabs & Reviews Grid */}
      <section className="testimonials-grid-section">
        <div className="service-page-container">
          
          {/* Facility Type Filter Tabs */}
          <div className="testimonials-filter-bar scroll-reveal">
            <button 
              type="button" 
              className={`filter-tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Facilities ({testimonials.length})
            </button>
            <button 
              type="button" 
              className={`filter-tab-btn ${activeCategory === 'office' ? 'active' : ''}`}
              onClick={() => setActiveCategory('office')}
            >
              Corporate Office
            </button>
            <button 
              type="button" 
              className={`filter-tab-btn ${activeCategory === 'medical' ? 'active' : ''}`}
              onClick={() => setActiveCategory('medical')}
            >
              Medical & Clinical
            </button>
            <button 
              type="button" 
              className={`filter-tab-btn ${activeCategory === 'warehouse' ? 'active' : ''}`}
              onClick={() => setActiveCategory('warehouse')}
            >
              Logistics & Warehouse
            </button>
            <button 
              type="button" 
              className={`filter-tab-btn ${activeCategory === 'gym' ? 'active' : ''}`}
              onClick={() => setActiveCategory('gym')}
            >
              Fitness Centers
            </button>
            <button 
              type="button" 
              className={`filter-tab-btn ${activeCategory === 'daycare' ? 'active' : ''}`}
              onClick={() => setActiveCategory('daycare')}
            >
              Daycare & Schools
            </button>
          </div>

          {/* Reviews Cards Grid */}
          <div className="testimonials-cards-grid scroll-reveal-stagger" style={{ marginTop: '30px' }}>
            {filteredTestimonials.map((rev) => (
              <div key={rev.id} className="testimonial-card">
                <div className="card-top-category-row">
                  <span className="testimonial-category-pill">{rev.categoryLabel}</span>
                  <span className="testimonial-highlight-tag">{rev.highlight}</span>
                </div>

                <div className="card-stars" style={{ margin: '14px 0 10px' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>

                <p className="card-quote-text" style={{ fontSize: '14.5px', lineHeight: '1.65' }}>
                  “{rev.quote}”
                </p>

                <div className="card-author-row" style={{ marginTop: '20px' }}>
                  <div className="author-avatar-circle">
                    {rev.avatar}
                  </div>
                  <div className="author-info">
                    <div className="author-name">{rev.name}</div>
                    <div className="author-role">{rev.role}, {rev.facility}</div>
                    <div className="author-location">{rev.location} • {rev.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Bottom CTA Box */}
      <section className="service-cta-banner-section">
        <div className="service-page-container">
          <div className="service-bottom-cta-box scroll-reveal-scale">
            <div className="cta-box-glow" />
            <div className="cta-box-content">
              <div className="cta-box-badge">
                <ShieldCheck size={16} />
                <span>JOIN OVER 500+ SATISFIED FACILITIES</span>
              </div>
              <h2 className="cta-box-title">
                Experience the Difference a Professional Commercial Cleaning Partner Makes
              </h2>
              <p className="cta-box-subtitle">
                Schedule your complimentary on-site facility audit today. We evaluate high-touch surfaces, review square footage, and deliver a tailored proposal within 24 hours.
              </p>
              <div className="cta-box-actions">
                <button 
                  type="button" 
                  className="cta-box-primary-btn"
                  onClick={onOpenConsultation}
                >
                  <span>Request Free Facility Walkthrough</span>
                  <ArrowRight size={16} />
                </button>
                <button 
                  type="button" 
                  className="cta-box-secondary-btn"
                  onClick={() => onNavigate('/contact')}
                >
                  <span>Contact Our Operations Team</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
