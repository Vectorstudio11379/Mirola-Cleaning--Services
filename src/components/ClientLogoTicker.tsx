import React, { useEffect, useRef, useState } from 'react';

export interface ClientLogo {
  id: string;
  name: string;
  src: string;
  alt: string;
  category: string;
  maxHeight?: number;
  maxWidth?: number;
}

export const CLIENT_LOGOS: ClientLogo[] = [
  {
    id: 'goddard',
    name: 'The Goddard School',
    src: '/images/clients/goddard-school.png',
    alt: 'The Goddard School for Early Childhood Development',
    category: 'Early Childhood Education',
    maxHeight: 65,
    maxWidth: 240,
  },
  {
    id: 'crunch',
    name: 'Crunch Fitness',
    src: '/images/clients/crunch-fitness.jpg',
    alt: 'Crunch Fitness Commercial Athletic Centers',
    category: 'Commercial Athletics',
    maxHeight: 70,
    maxWidth: 170,
  },
  {
    id: 'kiddie-academy',
    name: 'Kiddie Academy',
    src: '/images/clients/kiddie-academy.png',
    alt: 'Kiddie Academy Educational Child Care',
    category: 'Educational Child Care',
    maxHeight: 64,
    maxWidth: 220,
  },
  {
    id: 'crossfit',
    name: 'CrossFit',
    src: '/images/clients/crossfit.png',
    alt: 'CrossFit Athletic Facilities',
    category: 'Athletic Centers',
    maxHeight: 52,
    maxWidth: 190,
  },
  {
    id: 'learning-exp',
    name: 'The Learning Experience',
    src: '/images/clients/the-learning-experience.png',
    alt: 'The Learning Experience Academy of Early Education',
    category: 'Early Education Academy',
    maxHeight: 72,
    maxWidth: 190,
  },
];

// Repeat 4 times per half to create an ultra-wide continuous seamless track
const REPEATED_SET = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];
const ALL_ITEMS = [...REPEATED_SET, ...REPEATED_SET];

interface ClientLogoTickerProps {
  className?: string;
  showSubtitle?: boolean;
  badgeText?: string;
  subtitle?: string;
  description?: string;
}

export const ClientLogoTicker: React.FC<ClientLogoTickerProps> = ({
  className = '',
  showSubtitle = true,
  badgeText = "CLIENTS WE'VE WORKED FOR",
  subtitle = "Trusted by Premier Commercial Facilities & National Brands",
  description = "These are some of the premier commercial facilities, academies, and athletic franchises that rely on Mirola Cleaning Services for pristine sanitation and facility excellence.",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const posRef = useRef(0);
  const [isGrabbed, setIsGrabbed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    const speed = 0.65; // ~39px/sec for smooth, calm sliding

    const step = () => {
      if (!isHoveredRef.current && !isDraggingRef.current && container) {
        posRef.current += speed;
        container.scrollLeft = posRef.current;

        const half = container.scrollWidth / 2;
        if (half > 0 && container.scrollLeft >= half) {
          posRef.current -= half;
          container.scrollLeft = posRef.current;
        }
      } else if (container) {
        // Track current manual scroll position
        const half = container.scrollWidth / 2;
        if (half > 0) {
          if (container.scrollLeft >= half) {
            container.scrollLeft -= half;
          } else if (container.scrollLeft <= 0) {
            container.scrollLeft += half;
          }
        }
        posRef.current = container.scrollLeft;
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    setIsGrabbed(true);
    startXRef.current = e.pageX;
    scrollStartRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const container = containerRef.current;
    if (!container) return;
    e.preventDefault();
    const delta = (e.pageX - startXRef.current) * 1.25;
    let target = scrollStartRef.current - delta;
    
    const half = container.scrollWidth / 2;
    if (half > 0) {
      if (target >= half) {
        target -= half;
        scrollStartRef.current -= half;
      } else if (target < 0) {
        target += half;
        scrollStartRef.current += half;
      }
    }
    container.scrollLeft = target;
    posRef.current = target;
  };

  const stopDragging = () => {
    isDraggingRef.current = false;
    setIsGrabbed(false);
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    stopDragging();
  };

  const handleTouchStart = () => {
    isHoveredRef.current = true;
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      isHoveredRef.current = false;
    }, 600);
  };

  return (
    <div className={`client-logo-slider-wrapper ${className}`.trim()}>
      {showSubtitle && (
        <div className="client-logo-header-box">
          {badgeText && (
            <div className="client-logo-badge">
              <span className="client-logo-badge-dot" />
              <span>{badgeText}</span>
            </div>
          )}
          {subtitle && <h3 className="client-logo-title">{subtitle}</h3>}
          {description && (
            <p className="client-logo-desc">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Outer viewport with edge gradient fade masks */}
      <div className="client-logo-slider-viewport">
        <div
          ref={containerRef}
          className={`client-logo-slider-container ${isGrabbed ? 'is-grabbing' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          title="Drag or swipe to browse client partners"
          aria-label="Client logo carousel"
        >
          <div className="client-logo-slider-track">
            {ALL_ITEMS.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="client-logo-card"
                title={`${item.name} (${item.category})`}
              >
                <div className="client-logo-img-wrapper">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className={`client-logo-img client-logo-${item.id}`}
                    style={{
                      maxHeight: item.maxHeight ? `${item.maxHeight}px` : '70px',
                      maxWidth: item.maxWidth ? `${item.maxWidth}px` : '220px',
                    }}
                    loading="lazy"
                    draggable={false}
                  />
                </div>
                <span className="client-logo-tag">{item.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
