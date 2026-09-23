import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  FileText,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import type { AppRoute } from '../types/navigation';
import { CONTACT_INFO } from '../constants/contactInfo';

export interface GalleryPhoto {
  src: string;
  alt: string;
  caption: string;
  tag?: string;
}

export interface ServiceFeature {
  title: string;
  desc: string;
  icon: React.ReactNode;
  highlight?: string;
}

export interface ChecklistCategory {
  category: string;
  items: string[];
}

export interface ServicePageLayoutProps {
  currentPath: AppRoute;
  breadcrumbs: { label: string; path?: AppRoute }[];
  badgeText: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  heroImage: string;
  heroImageCaption: string;
  stats: { value: string; label: string }[];
  overviewHeading: string;
  overviewParagraphs: string[];
  features: ServiceFeature[];
  gallery: GalleryPhoto[];
  checklistHeading?: string;
  checklistIntro?: string;
  checklists: ChecklistCategory[];
  faqItems?: { q: string; a: string }[];
  relatedBuildingLinks?: { title: string; path: AppRoute; icon: React.ReactNode; desc: string }[];
  onNavigate: (path: AppRoute) => void;
  onOpenConsultation: () => void;
}

export const ServicePageLayout: React.FC<ServicePageLayoutProps> = ({
  breadcrumbs,
  badgeText,
  title,
  titleHighlight,
  subtitle,
  heroImage,
  heroImageCaption,
  stats,
  overviewHeading,
  overviewParagraphs,
  features,
  gallery,
  checklistHeading = "Scope of Work & Protocol Checklist",
  checklistIntro = "Our rigorous cleaning methodology ensures no touchpoint is overlooked during routine and deep sanitation cycles.",
  checklists,
  faqItems = [],
  relatedBuildingLinks = [],
  onNavigate,
  onOpenConsultation,
}) => {
  return (
    <div className="service-page-wrapper">
      
      {/* 1. Header & Breadcrumbs Bar */}
      <section className="service-hero-section">
        <div className="service-page-container">
          
          <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
            <button 
              type="button" 
              className="breadcrumb-link" 
              onClick={() => onNavigate('/')}
            >
              Home
            </button>
            {breadcrumbs.map((b, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight size={14} className="breadcrumb-separator" />
                {b.path ? (
                  <button 
                    type="button" 
                    className="breadcrumb-link" 
                    onClick={() => b.path && onNavigate(b.path)}
                  >
                    {b.label}
                  </button>
                ) : (
                  <span className="breadcrumb-current">{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          <div className="service-hero-grid">
            
            {/* Left Column: Hero Copy & CTA */}
            <div className="service-hero-copy scroll-reveal-left">
              <div className="service-page-badge">
                <span className="badge-pulse-dot" />
                <span>{badgeText}</span>
              </div>

              <h1 className="service-hero-title">
                {title} <span className="service-hero-highlight">{titleHighlight}</span>
              </h1>

              <p className="service-hero-subtitle">{subtitle}</p>

              <div className="service-hero-actions">
                <button 
                  type="button" 
                  className="service-primary-cta"
                  onClick={onOpenConsultation}
                >
                  <span>Request Custom Proposal</span>
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

              {/* Stat badges */}
              <div className="service-hero-stats scroll-reveal-stagger">
                {stats.map((stat, idx) => (
                  <div key={idx} className="service-stat-card">
                    <div className="stat-val">{stat.value}</div>
                    <div className="stat-lbl">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Prominent Feature Image with Trust Pill */}
            <div className="service-hero-media scroll-reveal-right">
              <div className="hero-image-frame">
                <img 
                  src={heroImage} 
                  alt={title} 
                  className="service-hero-main-img" 
                />
                <div className="hero-image-glass-card">
                  <div className="glass-card-icon">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <div className="glass-card-title">Commercial Grade Standard</div>
                    <div className="glass-card-sub">{heroImageCaption}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Editorial Overview Section */}
      <section className="service-overview-section">
        <div className="service-page-container">
          <div className="overview-card-wrapper scroll-reveal">
            <div className="overview-header-row">
              <div className="overview-badge">
                <Sparkles size={16} />
                <span>CLEANING EXCELLENCE SPECIFICATION</span>
              </div>
              <h2 className="overview-headline">{overviewHeading}</h2>
            </div>

            <div className="overview-body-grid">
              <div className="overview-text-col">
                {overviewParagraphs.map((p, idx) => (
                  <p key={idx} className="overview-para">{p}</p>
                ))}
              </div>

              <div className="overview-highlights-box scroll-reveal-scale">
                <h4 className="highlights-box-title">Why Commercial Facilities Trust Mirola</h4>
                <ul className="highlights-list">
                  <li>
                    <CheckCircle2 size={18} className="hl-check" />
                    <div>
                      <strong>Dedicated Account Manager</strong>
                      <p>Direct communication and prompt response for customized scheduling.</p>
                    </div>
                  </li>
                  <li>
                    <CheckCircle2 size={18} className="hl-check" />
                    <div>
                      <strong>EPA-Registered & Eco-Friendly</strong>
                      <p>Hospital-grade germicides safe for high-traffic environments and children.</p>
                    </div>
                  </li>
                  <li>
                    <CheckCircle2 size={18} className="hl-check" />
                    <div>
                      <strong>Rigorous Quality Inspections</strong>
                      <p>Digital supervisor auditing logs to maintain 100% compliance standards.</p>
                    </div>
                  </li>
                  <li>
                    <CheckCircle2 size={18} className="hl-check" />
                    <div>
                      <strong>Fully Bonded & Insured ($2M+)</strong>
                      <p>Complete peace of mind covering commercial enterprise operations.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Specialized Protocols & Capabilities Grid */}
      <section className="service-features-section">
        <div className="service-page-container">
          <div className="features-header-center scroll-reveal">
            <span className="section-pill-label">COMPREHENSIVE PROTOCOLS</span>
            <h2 className="features-section-title">Built for Stringent Industrial Standards</h2>
            <p className="features-section-desc">
              Every facility type requires distinct sanitization chemistry, cadence, and equipment. Here is how our team executes:
            </p>
          </div>

          <div className="service-features-grid scroll-reveal-stagger">
            {features.map((feat, idx) => (
              <div key={idx} className="feature-item-card">
                <div className="feature-icon-wrapper">
                  {feat.icon}
                </div>
                {feat.highlight && (
                  <span className="feature-badge-tag">{feat.highlight}</span>
                )}
                <h3 className="feature-title">{feat.title}</h3>
                <p className="feature-desc">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Authentic Google Drive Photo Gallery */}
      {gallery.length > 0 && (
        <section className="service-gallery-section">
          <div className="service-page-container">
            <div className="gallery-header-row scroll-reveal">
              <div>
                <span className="section-pill-label">ON-SITE DOCUMENTATION</span>
                <h2 className="gallery-section-title">Authentic Facility Clean Showcase</h2>
                <p className="gallery-section-desc">
                  Real photos of Mirola specialists actively executing commercial service contracts nationwide.
                </p>
              </div>
              <button 
                type="button" 
                className="gallery-audit-cta"
                onClick={onOpenConsultation}
              >
                <span>Schedule Walkthrough</span>
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="gallery-masonry-grid scroll-reveal-stagger">
              {gallery.map((photo, idx) => (
                <div key={idx} className={`gallery-card card-span-${idx % 3 === 0 ? 'large' : 'normal'}`}>
                  <div className="gallery-img-container">
                    <img 
                      src={photo.src} 
                      alt={photo.alt} 
                      className="gallery-photo"
                      loading="lazy"
                    />
                    <div className="gallery-overlay">
                      {photo.tag && <span className="gallery-photo-tag">{photo.tag}</span>}
                      <p className="gallery-caption">{photo.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Scope of Work / Cleaning Checklist */}
      {checklists.length > 0 && (
        <section className="service-checklist-section">
          <div className="service-page-container">
            <div className="checklist-container-box scroll-reveal">
              <div className="checklist-top-intro">
                <div className="checklist-badge">
                  <FileText size={16} />
                  <span>DETAILED SPECIFICATIONS</span>
                </div>
                <h2 className="checklist-title">{checklistHeading}</h2>
                <p className="checklist-desc">{checklistIntro}</p>
              </div>

              <div className="checklist-categories-grid scroll-reveal-stagger">
                {checklists.map((group, idx) => (
                  <div key={idx} className="checklist-category-card">
                    <h3 className="category-card-title">{group.category}</h3>
                    <ul className="category-items-list">
                      {group.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="category-list-item">
                          <CheckCircle2 size={16} className="item-check-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. Facility FAQ Section */}
      {faqItems.length > 0 && (
        <section className="service-faq-section">
          <div className="service-page-container">
            <div className="faq-box-wrapper scroll-reveal">
              <div className="faq-header">
                <span className="section-pill-label">COMMON QUESTIONS</span>
                <h2 className="service-faq-title">Frequently Asked Questions</h2>
              </div>
              <div className="service-faq-list scroll-reveal-stagger">
                {faqItems.map((item, idx) => (
                  <div key={idx} className="service-faq-card">
                    <h4 className="faq-q">{item.q}</h4>
                    <p className="faq-a">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. Related Building Types & Services Switcher */}
      {relatedBuildingLinks.length > 0 && (
        <section className="related-services-section">
          <div className="service-page-container">
            <div className="related-header scroll-reveal">
              <span className="section-pill-label">EXPLORE OTHER COMMERCIAL SECTORS</span>
              <h2 className="related-title">Complete Janitorial & Building Care Solutions</h2>
            </div>

            <div className="related-cards-grid scroll-reveal-stagger">
              {relatedBuildingLinks.map((rel, idx) => (
                <div 
                  key={idx} 
                  className="related-service-card"
                  onClick={() => onNavigate(rel.path)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onNavigate(rel.path);
                    }
                  }}
                >
                  <div className="related-icon-box">{rel.icon}</div>
                  <h4 className="related-card-title">{rel.title}</h4>
                  <p className="related-card-desc">{rel.desc}</p>
                  <span className="related-card-link">
                    <span>View Building Page</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Bottom High-Impact CTA Banner */}
      <section className="service-bottom-cta-section">
        <div className="service-page-container">
          <div className="bottom-cta-inner scroll-reveal-scale">
            <div className="cta-highlight-badge">
              <Clock size={15} />
              <span>CUSTOM CONTRACTS • DAILY, NIGHTLY OR ON-DEMAND</span>
            </div>
            <h2 className="cta-headline">
              Ready to Upgrade the Cleanliness & Health of Your Facility?
            </h2>
            <p className="cta-subheadline">
              Book a complimentary walkthrough with a Mirola facility specialist. We will inspect your premises, evaluate traffic patterns, and deliver a transparent scope-of-work quote within 24 hours.
            </p>
            <div className="cta-buttons-wrap">
              <button 
                type="button" 
                className="cta-book-btn"
                onClick={onOpenConsultation}
              >
                <span>Schedule Free Inspection Walkthrough</span>
                <ArrowRight size={16} />
              </button>
              <button 
                type="button" 
                className="cta-return-home-btn"
                onClick={() => onNavigate('/')}
              >
                <ArrowLeft size={16} />
                <span>Return to Main Website</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
