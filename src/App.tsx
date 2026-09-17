import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { BlogSection } from './components/BlogSection';
import { FooterSection } from './components/FooterSection';
import { ConsultationModal } from './components/ConsultationModal';
import { useScrollReveal } from './hooks/useScrollReveal';
import './App.css';

function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  useScrollReveal();

  return (
    <div className="app-main-layout">
      {/* Floating Pill Navigation Capsule */}
      <Navbar 
        onOpenConsultation={() => setIsConsultationOpen(true)} 
      />

      <main>
        {/* 1. Main Hero Section (400vh Canvas Video Sequence) */}
        <Hero onOpenConsultation={() => setIsConsultationOpen(true)} />

        {/* 2. About Us Section with Character-by-Character Illumination & Stat Cards */}
        <AboutSection onOpenConsultation={() => setIsConsultationOpen(true)} />

        {/* 3. Services Section with Authentic Commercial Photography */}
        <ServicesSection 
          onOpenConsultation={() => setIsConsultationOpen(true)} 
        />

        {/* 4. Why Choose Us Section */}
        <WhyChooseUsSection onOpenConsultation={() => setIsConsultationOpen(true)} />

        {/* 5. Testimonials Section */}
        <TestimonialsSection />

        {/* 6. Contact Section with Checklist & Direct Dispatch */}
        <ContactSection />

        {/* 7. FAQ Section */}
        <FaqSection />

        {/* 8. Blog Section */}
        <BlogSection onOpenConsultation={() => setIsConsultationOpen(true)} />
      </main>

      {/* CTA Banner & Footer Section with Architectural Watermark */}
      <FooterSection 
        onOpenConsultation={() => setIsConsultationOpen(true)} 
      />

      {/* Free Consultation Booking Modal with Multi-Select Facility Checklist & Gmail Compose */}
      <ConsultationModal 
        isOpen={isConsultationOpen} 
        onClose={() => setIsConsultationOpen(false)} 
      />
    </div>
  );
}

export default App;
