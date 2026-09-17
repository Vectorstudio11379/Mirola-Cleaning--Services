import React from 'react';
import { Leaf, ShieldCheck, ClockCheck, ArrowRight } from 'lucide-react';

interface WhyChooseUsSectionProps {
  onOpenConsultation: () => void;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ onOpenConsultation }) => {
  const features = [
    {
      number: '01',
      icon: <Leaf size={24} className="feature-card-icon" />,
      title: 'Eco-Conscious, Hospital-Grade Chemistry',
      description: 'We believe in cleanliness without compromise. We deploy EPA-registered, non-toxic, and hypoallergenic cleaning formulations that eliminate 99.9% of pathogens while preserving indoor air quality.'
    },
    {
      number: '02',
      icon: <ShieldCheck size={24} className="feature-card-icon" />,
      title: 'Fully Bonded, Insured & Vetted Specialists',
      description: 'Your security is paramount. Every team member undergoes rigorous background screening, specialized OSHA hazard protocol training, and operates in full Mirola uniform with digital check-ins.'
    },
    {
      number: '03',
      icon: <ClockCheck size={24} className="feature-card-icon" />,
      title: '24/7 Rapid Response & Tailored Schedules',
      description: 'Work around your schedule, not ours. Whether you require discreet after-hours office cleaning, continuous day porter presence, or same-day emergency spill dispatch, we are on-call 24/7.'
    }
  ];

  return (
    <section className="why-choose-section" id="why-choose">
      <div className="why-choose-container">
        
        {/* Header */}
        <div className="why-choose-header scroll-reveal">
          <div className="why-pill-badge">
            <span className="why-dot" />
            <span className="why-badge-text">WHY CHOOSE US</span>
          </div>

          <div className="why-heading-row">
            <h2 className="why-headline">
              Why USA Leaders Rely on <span className="text-highlight-dark">Mirola Cleaning</span>
            </h2>

            <button 
              type="button" 
              className="why-cta-btn"
              onClick={onOpenConsultation}
            >
              <span>Schedule Site Inspection</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* 3 Large Numbered Feature Cards */}
        <div className="why-cards-grid scroll-reveal-stagger">
          {features.map((feat) => (
            <div key={feat.number} className="why-feature-card">
              <div className="why-card-top">
                <div className="why-icon-circle">
                  {feat.icon}
                </div>
                <span className="why-card-number">{feat.number}</span>
              </div>

              <div className="why-card-content">
                <h3 className="why-card-title">{feat.title}</h3>
                <p className="why-card-desc">{feat.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
