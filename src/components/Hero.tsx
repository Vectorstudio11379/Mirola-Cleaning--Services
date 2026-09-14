import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { ScrollCanvasBackground } from './ScrollCanvasBackground';

interface HeroProps {
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="hero-scroll-area" id="hero" ref={containerRef}>
      <div className="hero-sticky-stage">
        {/* Full-screen sticky HTML5 Canvas Scroll-Linked Animation */}
        <ScrollCanvasBackground containerRef={containerRef} />

        {/* Existing unchanged Hero UI Layout */}
        <div className="hero-container">
          
          {/* LEFT COLUMN: Availability Badge & Refined Minimalist Headline */}
          <div className="hero-left-column">
            {/* Availability-style pill badge with delicate indicator */}
            <div className="availability-badge">
              <span className="pulsing-indicator" />
              <span className="badge-text">Best Janitorial service in NJ</span>
            </div>

            {/* Minimalist, Clean Editorial Headline with Reduced Boldness */}
            <h1 className="hero-headline">
              Best Janitorial<br />
              Services In<br />
              New Jersey
            </h1>
          </div>

          {/* RIGHT COLUMN: Concise Description & Red CTA Button */}
          <div className="hero-right-column">
            <p className="hero-description">
              Mirola Cleaning Services delivers hospital-grade sanitization, precision floor care, and comprehensive commercial facility management across New Jersey that convert first impressions into lasting trust.
            </p>

            {/* Red CTA button with circular arrow icon */}
            <button 
              type="button" 
              className="red-cta-button"
              onClick={onOpenConsultation}
              aria-label="Book your free consultation"
            >
              <span className="cta-arrow-circle">
                <ArrowRight size={17} strokeWidth={2.2} />
              </span>
              <span className="cta-text">BOOK YOUR FREE CONSULTATION</span>
            </button>
          </div>

        </div>

        {/* OVERSIZED BRAND TEXT: "MIROLA CLEANING SERVICES" spanning across the bottom */}
        <div className="oversized-brand-container" aria-hidden="true">
          <span className="oversized-brand-text">MIROLA CLEANING SERVICES</span>
        </div>

      </div>
    </section>
  );
};
