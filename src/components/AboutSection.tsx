import React, { useState } from 'react';
import { ArrowRight, Play, X, ShieldCheck, Sparkles } from 'lucide-react';

interface AboutSectionProps {
  onOpenConsultation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenConsultation }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        
        {/* 1. TOP LOGO TICKER / CLIENT TRUST BAR */}
        <div className="logo-ticker-wrapper">
          <div className="logo-ticker-track">
            {/* Logo Item 1 */}
            <div className="ticker-logo-item">
              <svg width="130" height="34" viewBox="0 0 130 34" fill="currentColor">
                <circle cx="16" cy="17" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" />
                <path d="M16 7V27M6 17H26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <text x="36" y="22" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="16" fontWeight="700" letterSpacing="-0.02em">Logoipsum</text>
              </svg>
            </div>

            {/* Logo Item 2 */}
            <div className="ticker-logo-item">
              <svg width="130" height="34" viewBox="0 0 130 34" fill="currentColor">
                <path d="M16 6L25 11V18C25 23.5 21.2 28.5 16 30C10.8 28.5 7 23.5 7 18V11L16 6Z" stroke="currentColor" strokeWidth="2.2" fill="none" />
                <path d="M12 17L15 20L20 14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <text x="36" y="22" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="16" fontWeight="700" letterSpacing="-0.02em">Logoipsum</text>
              </svg>
            </div>

            {/* Logo Item 3 */}
            <div className="ticker-logo-item">
              <svg width="135" height="34" viewBox="0 0 135 34" fill="currentColor">
                <circle cx="17" cy="17" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                <ellipse cx="17" cy="17" rx="5" ry="10" stroke="currentColor" strokeWidth="1.8" fill="none" />
                <line x1="7" y1="17" x2="27" y2="17" stroke="currentColor" strokeWidth="1.8" />
                <text x="36" y="22" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="15" fontWeight="600">logo ipsum</text>
              </svg>
            </div>

            {/* Logo Item 4 */}
            <div className="ticker-logo-item">
              <svg width="115" height="34" viewBox="0 0 115 34" fill="currentColor">
                <rect x="6" y="10" width="4" height="14" rx="2" fill="currentColor" />
                <rect x="13" y="7" width="4" height="20" rx="2" fill="currentColor" />
                <rect x="20" y="12" width="4" height="10" rx="2" fill="currentColor" />
                <text x="32" y="22" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="17" fontWeight="800" fontStyle="italic" letterSpacing="-0.03em">IPSUM</text>
              </svg>
            </div>

            {/* Logo Item 5 */}
            <div className="ticker-logo-item">
              <svg width="130" height="34" viewBox="0 0 130 34" fill="currentColor">
                <path d="M16 6L25 11V18C25 23.5 21.2 28.5 16 30C10.8 28.5 7 23.5 7 18V11L16 6Z" stroke="currentColor" strokeWidth="2.2" fill="none" />
                <path d="M16 11V23M10 17H22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <text x="36" y="22" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="16" fontWeight="700" letterSpacing="-0.02em">Logoipsum</text>
              </svg>
            </div>

            {/* Logo Item 6 */}
            <div className="ticker-logo-item">
              <svg width="130" height="34" viewBox="0 0 130 34" fill="currentColor">
                <circle cx="16" cy="17" r="4" fill="currentColor" />
                <circle cx="16" cy="7" r="2.5" fill="currentColor" />
                <circle cx="16" cy="27" r="2.5" fill="currentColor" />
                <circle cx="6" cy="17" r="2.5" fill="currentColor" />
                <circle cx="26" cy="17" r="2.5" fill="currentColor" />
                <text x="36" y="22" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="16" fontWeight="700" letterSpacing="-0.02em">Logoipsum</text>
              </svg>
            </div>

            {/* Logo Item 7 */}
            <div className="ticker-logo-item">
              <svg width="105" height="34" viewBox="0 0 105 34" fill="currentColor">
                <text x="6" y="23" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="21" fontWeight="800" letterSpacing="-0.04em">IPSUM</text>
              </svg>
            </div>
          </div>
        </div>

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
            <h2 className="about-editorial-heading">
              Discover how our commitment to quality, reliability, and eco-friendly practices transforms spaces into healthier environments. We bring peace of mind to our clients, ensuring every space shines.
            </h2>

            <button 
              type="button" 
              className="about-learn-more-btn"
              onClick={onOpenConsultation}
              aria-label="Learn more about our cleaning solutions"
            >
              <span className="learn-more-text">Learn More</span>
              <span className="learn-more-arrow">
                <ArrowRight size={17} strokeWidth={2.2} />
              </span>
            </button>
          </div>
        </div>

        {/* 3. BOTTOM 3-CARD ROW (MEDIA + STATS) */}
        <div className="about-cards-grid">
          
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
              src="/images/cleaner-video-thumb.jpg" 
              alt="Professional specialist sanitizing commercial space" 
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
          <div className="about-stat-card">
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
              <p>See how Mirola Cleaning Services transforms corporate facilities across New Jersey with precision, eco-conscious chemistry, and meticulous detail.</p>
            </div>

            <div className="video-player-frame">
              <img 
                src="/images/cleaner-video-thumb.jpg" 
                alt="Video preview of cleaning process" 
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
