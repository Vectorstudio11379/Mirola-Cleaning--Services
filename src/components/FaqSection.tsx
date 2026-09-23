import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What types of commercial facilities does Mirola service?',
      answer: 'We provide specialized janitorial, terminal sanitation, and floor care solutions for corporate office buildings, medical and outpatient clinics, industrial warehouses, private schools, and commercial showrooms.'
    },
    {
      question: 'Are all Mirola cleaners fully bonded, insured, and background-screened?',
      answer: 'Yes. 100% of our staff members undergo rigorous federal and state criminal background checks, standardized safety orientation, and operate under full general liability and workers’ compensation coverage.'
    },
    {
      question: 'How do you handle after-hours access, facility keys, and security alarms?',
      answer: 'We utilize strict chain-of-custody digital keycard logs and secure lockbox protocols. Our supervisors execute randomized badge audits and check-in/check-out timestamps to ensure your facility is locked and armed at all times.'
    },
    {
      question: 'Are your cleaning formulations eco-friendly and safe for indoor air quality?',
      answer: 'Absolutely. We prioritize EPA-registered, Green Seal certified, and hypoallergenic products that neutralize 99.9% of bacteria and viruses without releasing caustic fumes or VOCs into your office air ducts.'
    },
    {
      question: 'Can you provide emergency cleaning or same-day spill response?',
      answer: 'Yes. Our emergency service dispatch operates 24/7. When unexpected plumbing issues, spills, or urgent sanitization needs arise, we deploy rapid-response teams within 60 to 90 minutes.'
    },
    {
      question: 'Do you lock clients into rigid contracts, or can we adjust our cleaning schedule?',
      answer: 'We offer flexible month-to-month service agreements as well as annual contracts with preferred pricing discounts. You can scale your cleaning frequency or request ad-hoc day porters whenever your operational demands shift.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-backdrop-overlay" />
      
      <div className="faq-container">
        
        {/* Header */}
        <div className="faq-header scroll-reveal">
          <div className="faq-pill-badge">
            <HelpCircle size={14} />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="faq-headline">
            Clear Answers to Common Facility Inquiries
          </h2>
          <p className="faq-subheadline">
            Everything you need to know about our commercial standards, security protocols, and onboarding.
          </p>
        </div>

        {/* Accordion List */}
        <div className="faq-accordion-list scroll-reveal-stagger">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div 
                key={idx} 
                className={`faq-accordion-card ${isOpen ? 'open' : ''}`}
                onClick={() => toggleFaq(idx)}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    toggleFaq(idx);
                  }
                }}
              >
                <div className="faq-question-row">
                  <h3 className="faq-question-title">{faq.question}</h3>
                  <div className="faq-icon-circle">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </div>

                {isOpen && (
                  <div className="faq-answer-content">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
