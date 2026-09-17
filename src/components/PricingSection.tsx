import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

interface PricingSectionProps {
  onOpenConsultation: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenConsultation }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  const discountMultiplier = billingCycle === 'annually' ? 0.85 : 1;

  const plans = [
    {
      id: 'basic',
      name: 'Essential Janitorial',
      target: 'Ideal for boutique offices, studios & retail spaces under 3,500 sq ft.',
      price: Math.round(249 * discountMultiplier),
      popular: false,
      features: [
        'Nightly trash removal & detailed dusting',
        'Hospital-grade restroom sanitization & restocking',
        'Breakroom sink & surface disinfection',
        'Hard floor sweeping & damp microfiber mopping',
        'Dedicated USA facility coordinator'
      ],
      ctaText: 'Select Essential'
    },
    {
      id: 'standard',
      name: 'Corporate Comprehensive',
      target: 'Best for active office floors, clinical suites & headquarters 5,000–15,000 sq ft.',
      price: Math.round(549 * discountMultiplier),
      popular: true,
      badge: 'MOST POPULAR',
      features: [
        'All Essential Janitorial services included',
        'High-touch electrostatic spray disinfection',
        'Commercial HEPA carpet vacuuming & spot cleaning',
        'High-gloss floor burnishing & spray buffing',
        'Executive breakroom & appliance deep sterilization',
        '24/7 Priority emergency spill dispatch'
      ],
      ctaText: 'Get Started Now'
    },
    {
      id: 'premium',
      name: 'Full Facility Enterprise',
      target: 'Engineered for multi-tenant buildings, industrial campuses & healthcare facilities.',
      price: Math.round(980 * discountMultiplier),
      popular: false,
      features: [
        'All Corporate Comprehensive features',
        'Dedicated on-site Day Porter staffing solutions',
        'Quarterly machine floor stripping & wax restoration',
        'Interior glass partition & entryway high-shine care',
        'Customized green cleaning chemicals & inventory tracking',
        'Monthly compliance & inspection audit reports'
      ],
      ctaText: 'Request Enterprise Quote'
    }
  ];

  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-container">
        
        {/* Header */}
        <div className="pricing-header">
          <div className="pricing-pill-badge">
            <span className="pricing-dot" />
            <span className="pricing-badge-text">PRICING PLANS</span>
          </div>

          <h2 className="pricing-headline">
            Simple, transparent pricing tailored to your facility's exact scale.
          </h2>
          <p className="pricing-subheadline">
            Zero hidden fees. Month-to-month contracts with 100% satisfaction guarantee across the USA.
          </p>

          {/* Billing Toggle */}
          <div className="pricing-toggle-wrapper">
            <button 
              type="button" 
              className={`toggle-pill-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly Billing
            </button>
            <button 
              type="button" 
              className={`toggle-pill-btn ${billingCycle === 'annually' ? 'active' : ''}`}
              onClick={() => setBillingCycle('annually')}
            >
              <span>Annual Contract</span>
              <span className="discount-tag">Save 15%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-cards-grid">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`pricing-card ${plan.popular ? 'featured-card' : 'standard-card'}`}
            >
              {plan.popular && (
                <div className="popular-badge">
                  <Sparkles size={13} />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div className="card-top-info">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-target">{plan.target}</p>
              </div>

              <div className="plan-pricing-box">
                <div className="price-row">
                  <span className="price-currency">$</span>
                  <span className="price-amount">{plan.price}</span>
                  <span className="price-period">/ month</span>
                </div>
                <div className="pricing-note">
                  {billingCycle === 'annually' ? 'Billed annually with preferred rates' : 'Flexible monthly terms with no lock-in'}
                </div>
              </div>

              <div className="plan-divider" />

              {/* Features List */}
              <ul className="plan-features-list">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="feature-item">
                    <span className="check-icon-circle">
                      <Check size={14} strokeWidth={2.5} />
                    </span>
                    <span className="feature-text">{feat}</span>
                  </li>
                ))}
              </ul>

              <button 
                type="button" 
                className={`plan-cta-btn ${plan.popular ? 'popular-btn' : ''}`}
                onClick={onOpenConsultation}
              >
                <span>{plan.ctaText}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
