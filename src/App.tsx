import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PricingSection } from './components/PricingSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { BlogSection } from './components/BlogSection';
import { FooterSection } from './components/FooterSection';
import { ConsultationModal } from './components/ConsultationModal';
import './App.css';

function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <div className="app-main-layout">
      {/* Floating Pill Navigation Capsule */}
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Main Page Content Flow */}
      <main>
        {/* 1. Main Hero Section (Retained 400vh Canvas Video Sequence) */}
        <Hero onOpenConsultation={() => setIsConsultationOpen(true)} />

        {/* 2. About Us Section (Logo Ticker, High-Impact Editorial, Media Play Card & Stat Cards) */}
        <AboutSection onOpenConsultation={() => setIsConsultationOpen(true)} />

        {/* 3. Services Section (Dark Forest Green Accordion Showcase) */}
        <ServicesSection onOpenConsultation={() => setIsConsultationOpen(true)} />

        {/* 4. Pricing Plans Section (Mint Background with Monthly/Annual Toggle) */}
        <PricingSection onOpenConsultation={() => setIsConsultationOpen(true)} />

        {/* 5. Why Choose Us Section (3 Large Numbered Feature Cards) */}
        <WhyChooseUsSection onOpenConsultation={() => setIsConsultationOpen(true)} />

        {/* 6. Testimonials Section (Mint Background with 500+ Reviews & Customer Cards) */}
        <TestimonialsSection />

        {/* 7. Contact / Quick Walkthrough Booking Section */}
        <ContactSection />

        {/* 8. Frequently Asked Questions Section */}
        <FaqSection />

        {/* 9. Cleaning Tips & Expert Insights Blog Section */}
        <BlogSection onOpenConsultation={() => setIsConsultationOpen(true)} />
      </main>

      {/* 10. CTA Banner & Footer Section with Watermark */}
      <FooterSection onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Free Consultation Booking Modal */}
      <ConsultationModal 
        isOpen={isConsultationOpen} 
        onClose={() => setIsConsultationOpen(false)} 
      />
    </div>
  );
}

export default App;

