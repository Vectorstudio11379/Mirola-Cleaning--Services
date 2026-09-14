import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ConsultationModal } from './components/ConsultationModal';
import './App.css';

function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <div className="app-main-layout">
      {/* Floating Pill Navigation Capsule */}
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Main Hero Section matching exact reference composition */}
      <main>
        <Hero onOpenConsultation={() => setIsConsultationOpen(true)} />
      </main>

      {/* Free Consultation Booking Modal */}
      <ConsultationModal 
        isOpen={isConsultationOpen} 
        onClose={() => setIsConsultationOpen(false)} 
      />
    </div>
  );
}

export default App;
