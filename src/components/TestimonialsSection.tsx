import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Carlos Martinez',
      role: 'Founder & CEO, Uptown Corporate Center',
      location: 'Jersey City, USA',
      text: 'I’ve managed corporate properties across the USA for over twelve years, and none compare to Mirola Cleaning Services. From our initial consultation, their operations were seamless. Our polished marble lobbies and 4 floors of executive suites have never looked crisper.',
      rating: 5,
      avatar: 'CM'
    },
    {
      name: 'David Thompson',
      role: 'Director of Facility Operations, Apex Healthcare',
      location: 'Newark, USA',
      text: 'In an outpatient medical center, hospital-grade disinfection is non-negotiable. Mirola’s healthcare cleaning team executes terminal disinfection to the highest CDC standard. Their digital checklist audits give our compliance board complete confidence.',
      rating: 5,
      avatar: 'DT'
    },
    {
      name: 'James Walker',
      role: 'Senior Property Manager, Metro Tech Tower',
      location: 'Hoboken, USA',
      text: 'Transitioning our 120,000 sq ft commercial facility to Mirola was effortless. Their day porter staff is proactive, impeccably uniformed, and tenant satisfaction scores jumped immediately. They truly set the benchmark for commercial janitorial in the USA.',
      rating: 5,
      avatar: 'JW'
    },
    {
      name: 'Elena Rostova',
      role: 'Managing Partner, Vantage Legal Group',
      location: 'Paramus, USA',
      text: 'Our law firm hosts high-profile clients every day. Mirola ensures our conference rooms, glass partitions, and hardwood floors are pristine every morning before our doors open. Their consistency is unmatched.',
      rating: 5,
      avatar: 'ER'
    }
  ];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container">
        
        {/* Header */}
        <div className="testimonials-header">
          <div className="testimonials-pill-badge">
            <span className="testimonials-dot" />
            <span className="testimonials-badge-text">TESTIMONIALS</span>
          </div>

          <h2 className="testimonials-headline">
            Trusted by USA’s Leading Commercial Properties
          </h2>

          {/* Social Proof Rating Capsule */}
          <div className="rating-summary-capsule">
            <div className="stars-row">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>
            <span className="rating-score">4.9 / 5</span>
            <span className="rating-dot">•</span>
            <span className="rating-count">500+ Verified Facility Reviews</span>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="testimonials-cards-grid">
          {reviews.map((rev, index) => (
            <div key={index} className="testimonial-card">
              <div className="card-quote-icon">
                <Quote size={24} className="quote-mark" />
              </div>

              <div className="card-stars">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>

              <p className="card-quote-text">“{rev.text}”</p>

              <div className="card-author-row">
                <div className="author-avatar-circle">
                  {rev.avatar}
                </div>
                <div className="author-info">
                  <div className="author-name">{rev.name}</div>
                  <div className="author-role">{rev.role}</div>
                  <div className="author-location">{rev.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
