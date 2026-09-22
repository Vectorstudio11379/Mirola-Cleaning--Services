import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  Award, 
  Leaf, 
  Clock, 
  Play, 
  X,
  ChevronRight,
  CheckCircle2,
  Users
} from 'lucide-react';
import { CONTACT_INFO } from '../constants/contactInfo';
import { ClientLogoTicker } from '../components/ClientLogoTicker';
import type { AppRoute } from '../types/navigation';

interface AboutPageProps {
  onNavigate: (path: AppRoute) => void;
  onOpenConsultation: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ 
  onNavigate, 
  onOpenConsultation 
}) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <div className="subpage-wrapper about-standalone-page">
      
      {/* 1. HERO SECTION (BLACK & RED) */}
      <section className="subpage-hero-dark">
        <div className="subpage-container">
          
          {/* Breadcrumb Navigation */}
          <nav className="subpage-breadcrumbs" aria-label="Breadcrumb">
            <button 
              type="button" 
              className="subpage-breadcrumb-btn" 
              onClick={() => onNavigate('/')}
            >
              Home
            </button>
            <ChevronRight size={14} className="subpage-breadcrumb-sep" />
            <span className="subpage-breadcrumb-current">About Us</span>
          </nav>

          <div className="subpage-hero-split-grid">
            
            {/* Left Column: Headlines & Actions */}
            <div className="subpage-hero-content">
              <div className="subpage-badge">
                <span className="subpage-pulse-dot" />
                <span>ABOUT MIROLA CLEANING SERVICES</span>
              </div>

              <h1 className="subpage-hero-title">
                Setting the Gold Standard for{' '}
                <span className="subpage-highlight-red">Commercial Hygiene</span>{' '}
                Across the USA
              </h1>

              <p className="subpage-hero-subtitle">
                Founded on medical-grade precision, hospital-grade chemistry, and unwavering operational accountability, Mirola Cleaning Services partners with leading corporate, healthcare, logistics, and educational facilities to deliver spotless, safer environments.
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

              {/* 4 Stat Cards */}
              <div className="subpage-hero-stats-row">
                <div className="subpage-stat-card">
                  <div className="subpage-stat-num">500<span>+</span></div>
                  <div className="subpage-stat-label">Audited Facilities</div>
                </div>
                <div className="subpage-stat-card">
                  <div className="subpage-stat-num">99.4<span>%</span></div>
                  <div className="subpage-stat-label">Client Retention</div>
                </div>
                <div className="subpage-stat-card">
                  <div className="subpage-stat-num">24/7</div>
                  <div className="subpage-stat-label">Emergency SLA</div>
                </div>
                <div className="subpage-stat-card">
                  <div className="subpage-stat-num">100<span>%</span></div>
                  <div className="subpage-stat-label">W2 Vetted Crew</div>
                </div>
              </div>
            </div>

            {/* Right Column: Uniformed Cleaning Crew Image */}
            <div className="subpage-hero-media">
              <div className="subpage-hero-img-wrap">
                <img 
                  src="/images/drive_folder_2/DSC00550.jpg" 
                  alt="Uniformed Mirola commercial cleaning crew on duty" 
                  className="subpage-hero-img"
                />
                <div className="subpage-hero-img-badge">
                  <Sparkles size={15} color="#c90000" />
                  <span>Uniformed & Background-Verified Facility Crew</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. CLIENT LOGOS SLIDER SECTION (CRISP WHITE) */}
      <section className="subpage-white-section" style={{ padding: '36px 0 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div className="subpage-container">
          <ClientLogoTicker 
            showSubtitle={true} 
            subtitle="TRUSTED BY PREMIER COMMERCIAL FACILITIES & NATIONAL BRANDS" 
          />
        </div>
      </section>

      {/* 3. EDITORIAL STORY & ETHOS SECTION (CRISP WHITE) */}
      <section className="subpage-white-section">
        <div className="subpage-container">
          <div className="about-story-split-grid">
            
            <div className="about-story-tag-col">
              <div className="subpage-light-badge">
                <span className="subpage-pulse-dot" />
                <span>OUR COMMERCIAL ETHOS</span>
              </div>
            </div>

            <div className="about-story-content-col">
              <h2 className="about-story-headline">
                Discover how our commitment to quality, reliability, and eco-friendly practices transforms spaces into healthier environments. We bring peace of mind to our clients, ensuring every facility meets the highest standards of cleanliness.
              </h2>

              <div className="about-story-paragraphs">
                <p>
                  At Mirola Cleaning Services, we believe that clean environments are foundational to commercial productivity, employee well-being, and brand reputation. What began as a dedicated janitorial operation has expanded into a full-scale commercial cleaning network trusted by Fortune 500 corporate offices, surgical medical suites, massive distribution centers, and prestigious child care academies across New Jersey and the USA.
                </p>
                <p>
                  Unlike fragmented service brokers who outsource work to temporary laborers, every Mirola specialist is directly hired, rigorously background-checked, and continually trained in EPA dwell-time regulations, OSHA bloodborne pathogen compliance, and color-coded microfiber protocols to eliminate cross-contamination.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. 4 CORE OPERATING PILLARS (LIGHT SLATE #f8fafc) */}
      <section className="subpage-light-section">
        <div className="subpage-container">
          
          <div className="subpage-section-header text-center">
            <div className="subpage-light-badge">
              <Award size={13} />
              <span>BUILT ON DISCIPLINE & SCIENCE</span>
            </div>
            <h2 className="subpage-section-title">
              4 Core Operating Pillars That Protect Your Facility
            </h2>
            <p className="subpage-section-desc center">
              We eliminate guesswork with documented quality checklists, hospital-grade chemistry, and strict supervisor accountability.
            </p>
          </div>

          <div className="subpage-pillars-grid">
            
            {/* Pillar 1 */}
            <div className="subpage-pillar-card">
              <div className="pillar-icon-box">
                <Leaf size={24} />
              </div>
              <h3 className="pillar-title">Hospital-Grade Chemistry</h3>
              <p className="pillar-text">
                EPA-registered List N hospital disinfectants proven to neutralize 99.99% of viral and bacterial pathogens with zero harsh chemical residue.
              </p>
              <ul className="pillar-bullets">
                <li className="pillar-bullet-item">
                  <CheckCircle2 size={16} className="bullet-check" />
                  <span>ATP swab verification for high-touch surfaces</span>
                </li>
                <li className="pillar-bullet-item">
                  <CheckCircle2 size={16} className="bullet-check" />
                  <span>Color-coded microfiber cross-contamination lock</span>
                </li>
                <li className="pillar-bullet-item">
                  <CheckCircle2 size={16} className="bullet-check" />
                  <span>Green Seal certified, low-VOC sanitizers</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="subpage-pillar-card">
              <div className="pillar-icon-box">
                <Users size={24} />
              </div>
              <h3 className="pillar-title">100% W-2 Vetted & Trained Staff</h3>
              <p className="pillar-text">
                Every team member undergoes 10-panel background screenings, identity verification, and 40+ hours of commercial safety training before stepping onto your property.
              </p>
              <ul className="pillar-bullets">
                <li className="pillar-bullet-item">
                  <CheckCircle2 size={16} className="bullet-check" />
                  <span>Full federal and state criminal background check</span>
                </li>
                <li className="pillar-bullet-item">
                  <CheckCircle2 size={16} className="bullet-check" />
                  <span>Uniformed personnel with visible photo credentials</span>
                </li>
                <li className="pillar-bullet-item">
                  <CheckCircle2 size={16} className="bullet-check" />
                  <span>Continuous OSHA hazard communication updates</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="subpage-pillar-card">
              <div className="pillar-icon-box">
                <ShieldCheck size={24} />
              </div>
              <h3 className="pillar-title">Digital Supervisor Audits</h3>
              <p className="pillar-text">
                Quality is never assumed—it is verified. Shift supervisors complete 50-point digital inspections with photo verification after every service cycle.
              </p>
              <ul className="pillar-bullets">
                <li className="pillar-bullet-item">
                  <CheckCircle2 size={16} className="bullet-check" />
                  <span>GPS-timestamped digital shift audit logs</span>
                </li>
                <li className="pillar-bullet-item">
                  <CheckCircle2 size={16} className="bullet-check" />
                  <span>High-resolution before and after photographic records</span>
                </li>
                <li className="pillar-bullet-item">
                  <CheckCircle2 size={16} className="bullet-check" />
                  <span>Monthly client compliance and score reports</span>
                </li>
              </ul>
            </div>

            {/* Pillar 4 */}
            <div className="subpage-pillar-card">
              <div className="pillar-icon-box">
                <Clock size={24} />
              </div>
              <h3 className="pillar-title">24/7 Rapid Emergency SLA</h3>
              <p className="pillar-text">
                Emergencies don't wait for business hours. From hazardous fluid spills to unexpected plumbing leaks, our rapid dispatch team responds around the clock.
              </p>
              <ul className="pillar-bullets">
                <li className="pillar-bullet-item">
                  <CheckCircle2 size={16} className="bullet-check" />
                  <span>Guaranteed 60-minute emergency dispatch window</span>
                </li>
                <li className="pillar-bullet-item">
                  <CheckCircle2 size={16} className="bullet-check" />
                  <span>Dedicated regional account director direct cell</span>
                </li>
                <li className="pillar-bullet-item">
                  <CheckCircle2 size={16} className="bullet-check" />
                  <span>Immediate spill containment & pathogen barrier teams</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 5. FACILITY SHOWCASE & VIDEO SECTION (DARK OBSIDIAN) */}
      <section className="subpage-dark-section">
        <div className="subpage-container">
          
          <div className="subpage-section-header text-center">
            <div className="subpage-badge">
              <Play size={12} />
              <span>OPERATIONAL EXCELLENCE IN ACTION</span>
            </div>
            <h2 className="subpage-hero-title" style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.3rem)' }}>
              See How Mirola Safeguards American Facilities
            </h2>
            <p className="subpage-hero-subtitle" style={{ margin: '0 auto 40px', textAlign: 'center' }}>
              Watch our specialized teams execute standard operating procedures across corporate boardrooms, fitness centers, and high-traffic commercial spaces.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '32px', alignItems: 'center' }}>
            
            {/* Video Thumbnail Box */}
            <div 
              style={{ 
                position: 'relative', 
                borderRadius: '18px', 
                overflow: 'hidden', 
                cursor: 'pointer',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
              onClick={() => setVideoModalOpen(true)}
            >
              <img 
                src="/images/cleaner-video-thumb.jpg" 
                alt="Facility walkthrough demonstration video preview" 
                style={{ width: '100%', height: '340px', objectFit: 'cover', display: 'block' }}
              />
              <div 
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'rgba(8, 11, 19, 0.45)', 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '12px'
                }}
              >
                <div 
                  style={{ 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '50%', 
                    background: '#c90000', 
                    color: '#ffffff',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: '0 0 30px rgba(201, 0, 0, 0.7)'
                  }}
                >
                  <Play size={24} fill="#ffffff" style={{ marginLeft: '3px' }} />
                </div>
                <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '14px', letterSpacing: '0.04em' }}>
                  Click to Watch Facility Procedures (1:45)
                </span>
              </div>
            </div>

            {/* Performance Stat Callout Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div 
                style={{ 
                  background: 'rgba(255,255,255,0.04)', 
                  border: '1px solid rgba(255,255,255,0.09)', 
                  borderRadius: '16px', 
                  padding: '28px',
                  backdropFilter: 'blur(12px)'
                }}
              >
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
                  $5M<span style={{ color: '#c90000' }}>+</span>
                </div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#f1f5f9', marginBottom: '4px' }}>
                  Commercial Property Under Active Care
                </div>
                <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.5 }}>
                  Consistently delivering spotless turnaround for corporate office towers, fulfillment centers, and medical suites.
                </div>
              </div>

              <div 
                style={{ 
                  background: 'linear-gradient(135deg, rgba(201,0,0,0.2) 0%, rgba(201,0,0,0.05) 100%)', 
                  border: '1px solid rgba(201,0,0,0.35)', 
                  borderRadius: '16px', 
                  padding: '28px',
                  backdropFilter: 'blur(12px)'
                }}
              >
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
                  98<span style={{ color: '#ff4d61' }}>%</span>
                </div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>
                  Turnaround Quality Score
                </div>
                <div style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5 }}>
                  Verified by independent supervisor audit scores across scheduled night-shift janitorial routes.
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. RED CTA BANNER */}
      <section className="subpage-cta-banner-red">
        <div className="subpage-container">
          <div className="cta-banner-copy">
            <h2>Ready to Elevate Your Facility's Cleanliness?</h2>
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

      {/* Interactive Video Modal */}
      {videoModalOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(5, 7, 12, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            backdropFilter: 'blur(10px)'
          }}
          onClick={() => setVideoModalOpen(false)}
        >
          <div 
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '860px',
              background: '#0c101a',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.12)',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.8)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 24px',
                borderBottom: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c90000' }} />
                <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '14.5px' }}>
                  Mirola Standard Operating Procedures & Quality Protocols
                </span>
              </div>
              <button 
                type="button"
                onClick={() => setVideoModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '4px'
                }}
                aria-label="Close video modal"
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <img 
                src="/images/cleaner-video-thumb.jpg" 
                alt="Facility walkthrough preview" 
                style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: '12px' }}
              />
              <p style={{ color: '#94a3b8', fontSize: '13.5px', marginTop: '16px', lineHeight: 1.6 }}>
                Mirola’s uniformed janitorial specialists utilize state-of-the-art HEPA filtration, zero-cross-contamination microfiber systems, and CDC-approved sanitizers for complete commercial property compliance.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
