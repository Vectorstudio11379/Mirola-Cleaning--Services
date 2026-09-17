import { useState, useEffect } from 'react';
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

// Dedicated Service & Building Pages
import { JanitorialPage } from './pages/JanitorialPage';
import { FloorCarePage } from './pages/FloorCarePage';
import { SanitationPage } from './pages/SanitationPage';
import { DaycareCleaningPage } from './pages/DaycareCleaningPage';
import { GymCleaningPage } from './pages/GymCleaningPage';
import { WarehouseCleaningPage } from './pages/WarehouseCleaningPage';
import { OfficeCleaningPage } from './pages/OfficeCleaningPage';
import { MedicalCleaningPage } from './pages/MedicalCleaningPage';

import type { AppRoute } from './types/navigation';
import { useScrollReveal } from './hooks/useScrollReveal';
import './App.css';

function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState<AppRoute>(() => {
    const path = window.location.pathname;
    const validRoutes: AppRoute[] = [
      '/',
      '/services/janitorial',
      '/services/floor-care',
      '/services/sanitation',
      '/services/janitorial/daycare',
      '/services/janitorial/gym',
      '/services/janitorial/warehouse',
      '/services/janitorial/office',
      '/services/janitorial/medical'
    ];
    return validRoutes.includes(path as AppRoute) ? (path as AppRoute) : '/';
  });

  // Re-observe elements on route transitions
  useScrollReveal(currentPath);

  // Listen to browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const validRoutes: AppRoute[] = [
        '/',
        '/services/janitorial',
        '/services/floor-care',
        '/services/sanitation',
        '/services/janitorial/daycare',
        '/services/janitorial/gym',
        '/services/janitorial/warehouse',
        '/services/janitorial/office',
        '/services/janitorial/medical'
      ];
      setCurrentPath(validRoutes.includes(path as AppRoute) ? (path as AppRoute) : '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    const validRoutes: AppRoute[] = [
      '/',
      '/services/janitorial',
      '/services/floor-care',
      '/services/sanitation',
      '/services/janitorial/daycare',
      '/services/janitorial/gym',
      '/services/janitorial/warehouse',
      '/services/janitorial/office',
      '/services/janitorial/medical'
    ];
    const targetRoute = validRoutes.includes(path as AppRoute) ? (path as AppRoute) : '/';
    if (targetRoute !== currentPath) {
      window.history.pushState({}, '', targetRoute);
      setCurrentPath(targetRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/services/janitorial':
        return (
          <JanitorialPage 
            onNavigate={navigate} 
            onOpenConsultation={() => setIsConsultationOpen(true)} 
          />
        );
      case '/services/floor-care':
        return (
          <FloorCarePage 
            onNavigate={navigate} 
            onOpenConsultation={() => setIsConsultationOpen(true)} 
          />
        );
      case '/services/sanitation':
        return (
          <SanitationPage 
            onNavigate={navigate} 
            onOpenConsultation={() => setIsConsultationOpen(true)} 
          />
        );
      case '/services/janitorial/daycare':
        return (
          <DaycareCleaningPage 
            onNavigate={navigate} 
            onOpenConsultation={() => setIsConsultationOpen(true)} 
          />
        );
      case '/services/janitorial/gym':
        return (
          <GymCleaningPage 
            onNavigate={navigate} 
            onOpenConsultation={() => setIsConsultationOpen(true)} 
          />
        );
      case '/services/janitorial/warehouse':
        return (
          <WarehouseCleaningPage 
            onNavigate={navigate} 
            onOpenConsultation={() => setIsConsultationOpen(true)} 
          />
        );
      case '/services/janitorial/office':
        return (
          <OfficeCleaningPage 
            onNavigate={navigate} 
            onOpenConsultation={() => setIsConsultationOpen(true)} 
          />
        );
      case '/services/janitorial/medical':
        return (
          <MedicalCleaningPage 
            onNavigate={navigate} 
            onOpenConsultation={() => setIsConsultationOpen(true)} 
          />
        );
      case '/':
      default:
        return (
          <main>
            {/* 1. Main Hero Section (400vh Canvas Video Sequence) */}
            <Hero onOpenConsultation={() => setIsConsultationOpen(true)} />

            {/* 2. About Us Section */}
            <AboutSection onOpenConsultation={() => setIsConsultationOpen(true)} />

            {/* 3. Services Section with 3 Core Services & Janitorial Building Selector */}
            <ServicesSection 
              onOpenConsultation={() => setIsConsultationOpen(true)} 
              onNavigate={navigate}
            />

            {/* 4. Why Choose Us Section */}
            <WhyChooseUsSection onOpenConsultation={() => setIsConsultationOpen(true)} />

            {/* 5. Testimonials Section */}
            <TestimonialsSection />

            {/* 6. Contact Section */}
            <ContactSection />

            {/* 7. FAQ Section */}
            <FaqSection />

            {/* 8. Blog Section */}
            <BlogSection onOpenConsultation={() => setIsConsultationOpen(true)} />
          </main>
        );
    }
  };

  return (
    <div className="app-main-layout">
      {/* Floating Pill Navigation Capsule with Services & Janitorial dropdown */}
      <Navbar 
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenConsultation={() => setIsConsultationOpen(true)} 
      />

      {/* Dynamic Multi-Page Router Content */}
      {renderCurrentPage()}

      {/* CTA Banner & Footer Section with Watermark */}
      <FooterSection 
        onNavigate={navigate}
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
