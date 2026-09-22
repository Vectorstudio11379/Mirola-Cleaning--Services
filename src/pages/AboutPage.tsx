import React, { useState, useEffect, useRef } from 'react';
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
  ChevronRight
} from 'lucide-react';
import { CONTACT_INFO } from '../constants/contactInfo';
import { ClientLogoTicker } from '../components/ClientLogoTicker';
import type { AppRoute } from '../types/navigation';

interface AboutPageProps {
  onNavigate: (path: AppRoute) => void;
  onOpenConsultation: () => void;
}

interface RevealLetter {
  char: string;
  index: number;
}

interface RevealWord {
  word: string;
  letters: RevealLetter[];
}

const buildRevealData = (text: string) => {
  const words = text.split(' ');
  let letterIndex = 0;
  const result: RevealWord[] = [];

  words.forEach((w) => {
    const letters: RevealLetter[] = [];
    for (let i = 0; i < w.length; i++) {
      letters.push({
        char: w[i],
        index: letterIndex++
      });
    }
    letterIndex++;
    result.push({ word: w, letters });
  });

  return { words: result, totalLetters: letterIndex };
};

const STATEMENT_TEXT = "Discover how our commitment to quality, reliability, and eco-friendly practices transforms spaces into healthier environments. We bring peace of mind to our clients, ensuring every commercial space shines.";
const { words: REVEAL_WORDS, totalLetters: TOTAL_LETTERS } = buildRevealData(STATEMENT_TEXT);

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenConsultation }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const statementRef = useRef<HTMLHeadingElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);

  useEffect(() => {
    const calculateTarget = () => {
      if (!statementRef.current) return 0;
      const rect = statementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight * 0.85;
      const end = -windowHeight * 0.05;
      const raw = (start - rect.top) / (start - end);
      return Math.max(0, Math.min(1, raw));
    };

    const tick = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) < 0.001) {
        currentProgressRef.current = targetProgressRef.current;
        setScrollProgress(targetProgressRef.current);
        isRunningRef.current = false;
        animFrameRef.current = null;
        return;
      }
      currentProgressRef.current += diff * 0.08;
      setScrollProgress(currentProgressRef.current);
      animFrameRef.current = requestAnimationFrame(tick);
    };

    const startAnimation = () => {
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    const handleScroll = () => {
      targetProgressRef.current = calculateTarget();
      startAnimation();
    };

    const initialTarget = calculateTarget();
    targetProgressRef.current = initialTarget;
    currentProgressRef.current = initialTarget;
    setScrollProgress(initialTarget);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const corePillars = [
    {
      icon: <Leaf size={24} />,
      title: 'Eco-Conscious Chemistry',
      description: 'EPA-registered, non-toxic, and biodegradable formulations that eliminate 99.9% of pathogens while preserving indoor air quality for building occupants.'
    },
    {
      icon: <ShieldCheck size={24} />,
      title: '100% Bonded & Vetted Staff',
      description: 'Every crew member undergoes federal background verification, standardized safety protocols, and operates in full uniform with digital clock-in compliance.'
    },
    {
      icon: <Clock size={24} />,
      title: '24/7 Rapid USA Dispatch',
      description: 'Whether you require quiet after-hours office maintenance, dedicated on-site day porters, or emergency spill response, our operations team is on-call 24/7.'
    },
    {
      icon: <Award size={24} />,
      title: 'Hospital-Grade Quality Audits',
      description: 'We execute multi-point digital inspection checklists and ATP bioluminescence touchpoint testing to ensure verifiable sanitization on every visit.'
    }
  ];

  return (
    <div className="service-page-wrapper about-standalone-page">
      {/* 1. Header & Breadcrumbs Section */}
      <section className="service-hero-section">
        <div className="service-page-container">
          
          <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
            <button type="button" className="breadcrumb-link" onClick={() => onNavigate('/')}>
              Home
            </button>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">About Us</span>
          </nav>

          <div className="service-hero-grid">
            <div className="service-hero-copy scroll-reveal-left">
              <div className="service-page-badge">
                <span className="badge-pulse-dot" />
                <span>ABOUT MIROLA CLEANING SERVICES</span>
              </div>

              <h1 className="service-hero-title">
                Setting the Gold Standard for <span className="service-hero-highlight">Commercial Hygiene</span> Across the USA
              </h1>

              <p className="service-hero-subtitle">
                Founded on precision, hospital-grade chemistry, and unwavering accountability, Mirola Cleaning Services partners with leading corporate, healthcare, logistics, and educational facilities to deliver spotless, safer working environments.
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

              {/* Verified Metrics Cards */}
              <div className="service-hero-stats scroll-reveal-stagger">
                <div className="service-stat-card">
                  <div className="stat-val">500+</div>
                  <div className="stat-lbl">Corporate Facilities Serviced</div>
                </div>
                <div className="service-stat-card">
                  <div className="stat-val">100%</div>
                  <div className="stat-lbl">Bonded & Insured USA Specialists</div>
                </div>
                <div className="service-stat-card">
                  <div className="stat-val">24/7</div>
                  <div className="stat-lbl">Rapid Emergency Dispatch</div>
                </div>
                <div className="service-stat-card">
                  <div className="stat-val">99.9%</div>
                  <div className="stat-lbl">Pathogen Elimination Rate</div>
                </div>
              </div>
            </div>

            <div className="service-hero-media scroll-reveal-right">
              <div className="hero-image-frame">
                <img 
                  src="/images/drive_folder_2/DSC00550.jpg" 
                  alt="Uniformed Mirola commercial cleaning crew" 
                  className="hero-main-img" 
                />
                <div className="image-caption-pill">
                  <Sparkles size={14} color="#c90000" />
                  <span>Uniformed & Background-Verified Facility Crew</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 1.5 Client Logos Infinite Slider */}
      <section className="about-clients-ticker-section" style={{ background: '#ffffff', padding: '32px 0 16px', borderBottom: '1px solid #e2e8f0' }}>
        <div className="service-page-container">
          <ClientLogoTicker showSubtitle={true} subtitle="TRUSTED BY PREMIER FACILITIES & NATIONAL BRANDS" />
        </div>
      </section>

      {/* 2. Interactive Character-Reveal Statement Section */}
      <section className="about-interactive-showcase-section">
        <div className="about-container">
          
          <div className="about-header-capsule scroll-reveal">
            <span className="pulse-dot" />
            <span className="badge-label">OUR COMMERCIAL ETHOS</span>
          </div>

          <h2 className="about-reveal-heading" ref={statementRef}>
            {REVEAL_WORDS.map((w, wIdx) => (
              <span key={wIdx} className="reveal-word">
                {w.letters.map((item) => {
                  const step = 1 / TOTAL_LETTERS;
                  const charStart = item.index * step;
                  const charEnd = (item.index + 1) * step;
                  const charProgress = Math.max(0, Math.min(1, (scrollProgress - charStart) / (charEnd - charStart)));
                  const isLit = charProgress > 0.4;

                  return (
                    <span 
                      key={item.index} 
                      className={`reveal-char ${isLit ? 'lit' : 'dim'}`}
                    >
                      {item.char}
                    </span>
                  );
                })}
                <span className="reveal-space">&nbsp;</span>
              </span>
            ))}
          </h2>

          <div className="about-cards-grid scroll-reveal-stagger">
            <div 
              className="about-media-card"
              onClick={() => setIsVideoModalOpen(true)}
              role="button"
              tabIndex={0}
              aria-label="Watch video demonstration"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setIsVideoModalOpen(true);
              }}
            >
              <img 
                src="/images/drive_folder_2/DSC00216.jpg" 
                alt="Professional Mirola specialists sanitizing commercial facility" 
                className="about-media-img"
              />
              <div className="media-overlay-gradient" />
              <div className="media-play-button" aria-hidden="true">
                <Play size={22} fill="#d81e35" color="#d81e35" className="play-icon-offset" />
              </div>
            </div>

            <div className="about-stat-card">
              <div className="stat-card-header">
                <span className="stat-card-category">FACILITIES SERVICED</span>
              </div>
              <div className="stat-card-body">
                <div className="stat-card-number">$5M+</div>
                <div className="stat-card-subtext">Commercial properties under active care</div>
              </div>
            </div>

            <div className="about-stat-card about-stat-card-red">
              <div className="stat-card-header">
                <span className="stat-card-category">CLIENT RETENTION</span>
              </div>
              <div className="stat-card-body">
                <div className="stat-card-number">98%</div>
                <div className="stat-card-subtext">Year-over-year commercial client retention</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Core Operating Pillars */}
      <section className="about-pillars-section">
        <div className="service-page-container">
          <div className="service-section-header scroll-reveal">
            <div className="service-section-badge">
              <ShieldCheck size={14} />
              <span>THE MIROLA ADVANTAGE</span>
            </div>
            <h2 className="service-section-title">Built on Discipline, Verified by Science</h2>
            <p className="service-section-subtitle">
              Every cleaning cycle is engineered around strict compliance, high-efficiency equipment, and dedicated regional support.
            </p>
          </div>

          <div className="service-features-grid scroll-reveal-stagger">
            {corePillars.map((pillar, idx) => (
              <div key={idx} className="service-feature-card">
                <div className="feature-top-row">
                  <div className="feature-icon-pill">{pillar.icon}</div>
                  <span className="feature-num-tag">0{idx + 1}</span>
                </div>
                <h3 className="feature-card-title">{pillar.title}</h3>
                <p className="feature-card-desc">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bottom Walkthrough CTA Banner */}
      <section className="service-cta-banner-section">
        <div className="service-page-container">
          <div className="service-bottom-cta-box scroll-reveal-scale">
            <div className="cta-box-glow" />
            <div className="cta-box-content">
              <div className="cta-box-badge">
                <ShieldCheck size={16} />
                <span>NATIONWIDE USA COMMERCIAL SERVICE</span>
              </div>
              <h2 className="cta-box-title">
                Ready to Experience Commercial Cleaning Without Compromise?
              </h2>
              <p className="cta-box-subtitle">
                Schedule a complimentary on-site walkthrough with a Mirola operations director. We inspect traffic corridors, analyze surfaces, and deliver a transparent proposal within 24 hours.
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
                  onClick={() => onNavigate('/services/janitorial')}
                >
                  <span>Explore Janitorial Solutions</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="video-modal-backdrop" onClick={() => setIsVideoModalOpen(false)}>
          <div className="video-modal-container" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="video-modal-close" 
              onClick={() => setIsVideoModalOpen(false)}
              aria-label="Close video player"
            >
              <X size={20} />
            </button>
            <div className="video-modal-header">
              <div className="modal-badge-row">
                <Sparkles size={16} color="#c90000" />
                <span>Commercial Excellence in Motion</span>
              </div>
              <h3>Hospital-Grade Janitorial & Sanitization Standards</h3>
              <p>See how Mirola Cleaning Services transforms corporate facilities across the USA with precision and meticulous detail.</p>
            </div>
            <div className="video-player-frame">
              <img 
                src="/images/drive_folder_2/DSC00216.jpg" 
                alt="Mirola commercial cleaning in progress" 
                className="video-player-placeholder"
              />
              <div className="video-simulated-controls">
                <div className="simulated-pill">
                  <ShieldCheck size={16} color="#c90000" />
                  <span>ISO 9001 Compliant Operations • 100% Bonded & Insured</span>
                </div>
              </div>
            </div>
            <div className="video-modal-footer">
              <button 
                type="button" 
                className="modal-cta-btn"
                onClick={() => {
                  setIsVideoModalOpen(false);
                  onOpenConsultation();
                }}
              >
                Schedule Facility Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
