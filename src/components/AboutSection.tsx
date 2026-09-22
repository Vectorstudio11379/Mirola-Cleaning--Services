import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Play, X, ShieldCheck, Sparkles } from 'lucide-react';
import { ClientLogoTicker } from './ClientLogoTicker';

interface AboutSectionProps {
  onOpenConsultation: () => void;
  onNavigate?: (path: string) => void;
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
    // Count space as step so reveal flows smoothly
    letterIndex++;
    result.push({ word: w, letters });
  });

  return { words: result, totalLetters: letterIndex };
};

const STATEMENT_TEXT = "Discover how our commitment to quality, reliability, and eco-friendly practices transforms spaces into healthier environments. We bring peace of mind to our clients, ensuring every space shines.";
const { words: REVEAL_WORDS, totalLetters: TOTAL_LETTERS } = buildRevealData(STATEMENT_TEXT);

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenConsultation, onNavigate }) => {
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

      // Extended scroll runway so letters reveal at a measured, luxurious pace:
      // Start revealing when the heading enters comfortably into the viewport (82% down)
      // Complete revealing when heading top reaches upper edge (-8% of viewport)
      const start = windowHeight * 0.82;
      const end = -windowHeight * 0.08;

      const raw = (start - rect.top) / (start - end);
      return Math.max(0, Math.min(1, raw));
    };

    const tick = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;

      // When the difference is negligible, snap to target and halt the RAF loop
      if (Math.abs(diff) < 0.001) {
        currentProgressRef.current = targetProgressRef.current;
        setScrollProgress(targetProgressRef.current);
        isRunningRef.current = false;
        animFrameRef.current = null;
        return;
      }

      // Smooth damping interpolation (lerp factor = 0.08)
      // Glides through mouse wheel notches so characters illuminate sequentially rather than in sudden chunks
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

    // Initialize immediately on mount without artificial delay
    const initialTarget = calculateTarget();
    targetProgressRef.current = initialTarget;
    currentProgressRef.current = initialTarget;
    setScrollProgress(initialTarget);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });

    const t1 = setTimeout(handleScroll, 120);
    const t2 = setTimeout(handleScroll, 450);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      clearTimeout(t1);
      clearTimeout(t2);
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        
        {/* 1. TOP LOGO TICKER / CLIENT TRUST BAR & INFINITE SLIDER */}
        <ClientLogoTicker showSubtitle={false} />

        {/* Dotted border separator */}
        <div className="about-divider-line" />

        {/* 2. ABOUT US EDITORIAL INTRO SPREAD */}
        <div className="about-editorial-grid">
          {/* Left Column: Pill Indicator Badge */}
          <div className="about-tag-col">
            <div className="about-pill-label">
              <span className="about-dot" />
              <span className="about-label-text">ABOUT US</span>
            </div>
          </div>

          {/* Right Column: High-Impact Editorial Statement & CTA */}
          <div className="about-statement-col">
            <h2 className="about-editorial-heading" ref={statementRef}>
              {REVEAL_WORDS.map((wordObj, wIdx) => (
                <React.Fragment key={wIdx}>
                  <span className="reveal-word-wrap">
                    {wordObj.letters.map((letter) => {
                      const threshold = letter.index / TOTAL_LETTERS;
                      const isRevealed = scrollProgress >= threshold;
                      return (
                        <span
                          key={letter.index}
                          className={`reveal-letter ${isRevealed ? 'revealed' : 'unrevealed'}`}
                        >
                          {letter.char}
                        </span>
                      );
                    })}
                  </span>
                  {wIdx < REVEAL_WORDS.length - 1 ? ' ' : ''}
                </React.Fragment>
              ))}
            </h2>

            <button 
              type="button" 
              className="about-learn-more-btn"
              onClick={() => {
                if (onNavigate) onNavigate('/about');
                else onOpenConsultation();
              }}
              aria-label="Learn more about our company and standards"
            >
              <span className="learn-more-text">Learn More</span>
              <span className="learn-more-arrow">
                <ArrowRight size={17} strokeWidth={2.2} />
              </span>
            </button>
          </div>
        </div>

        {/* 3. BOTTOM 3-CARD ROW (MEDIA + STATS) */}
        <div className="about-cards-grid scroll-reveal-stagger">
          
          {/* Left Card: Video / Media Preview Card */}
          <div 
            className="about-media-card"
            onClick={() => setIsVideoModalOpen(true)}
            role="button"
            tabIndex={0}
            aria-label="Watch video demonstration"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsVideoModalOpen(true);
              }
            }}
          >
            <img 
              src="/images/drive_folder_2/DSC00216.jpg" 
              alt="Professional Mirola specialists sanitizing commercial facility" 
              className="about-media-img"
            />
            <div className="media-overlay-gradient" />
            
            {/* Centered Circular White Play Button */}
            <div className="media-play-button" aria-hidden="true">
              <Play size={22} fill="#d81e35" color="#d81e35" className="play-icon-offset" />
            </div>
          </div>

          {/* Middle Card: Residences / Facilities Serviced */}
          <div className="about-stat-card">
            <div className="stat-card-header">
              <span className="stat-card-category">RESIDENCES SERVICED</span>
            </div>
            
            <div className="stat-card-body">
              <div className="stat-card-number">$5M+</div>
              <div className="stat-card-subtext">Residences and offices</div>
            </div>
          </div>

          {/* Right Card: Our Clients */}
          <div className="about-stat-card about-stat-card-red">
            <div className="stat-card-header">
              <span className="stat-card-category">OUR CLIENTS</span>
            </div>
            
            <div className="stat-card-body">
              <div className="stat-card-number">500+</div>
              <div className="stat-card-subtext">Highly trained Satisfied clients</div>
            </div>
          </div>

        </div>

      </div>

      {/* Video Demonstration Modal */}
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
              <p>See how Mirola Cleaning Services transforms corporate facilities across the USA with precision, eco-conscious chemistry, and meticulous detail.</p>
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
    </section>
  );
};
