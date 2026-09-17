import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  HeartHandshake, 
  Activity, 
  CheckCircle2,
  Lock,
  Building2,
  Dumbbell,
  Baby
} from 'lucide-react';
import { ServicePageLayout } from '../components/ServicePageLayout';
import type { AppRoute } from '../types/navigation';

interface MedicalCleaningPageProps {
  onNavigate: (path: AppRoute) => void;
  onOpenConsultation: () => void;
}

export const MedicalCleaningPage: React.FC<MedicalCleaningPageProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  return (
    <ServicePageLayout
      currentPath="/services/janitorial/medical"
      breadcrumbs={[
        { label: 'Services', path: '/services/janitorial' },
        { label: 'Janitorial', path: '/services/janitorial' },
        { label: 'Medical Cleaning' }
      ]}
      badgeText="CDC & OSHA COMPLIANT HEALTHCARE SANITATION"
      title="Medical & Clinical Facility"
      titleHighlight="Cleaning Services"
      subtitle="Hospital-grade terminal disinfection, bio-burden mitigation, and sterile touchpoint barriers for outpatient clinics, surgical suites, dental offices, and diagnostic laboratories."
      heroImage="/images/drive_folder_2/DSC00249.jpg"
      heroImageCaption="Hospital-Grade Laboratory & Clinical Exam Room Sterilization"
      stats={[
        { value: 'EPA List N', label: 'Registered Hospital Disinfectants' },
        { value: '100%', label: 'Color-Coded Microfiber Protocol' },
        { value: 'OSHA / CDC', label: 'Bloodborne Pathogen Certified' }
      ]}
      overviewHeading="Sterile, Inspection-Ready Clinical Care with Zero Cross-Contamination"
      overviewParagraphs={[
        "In medical facilities, surface cleanliness is a matter of patient safety and infection control. Ambulatory surgical centers, dental clinics, urgent care hubs, and diagnostic laboratories require terminal disinfection protocols that exceed standard commercial janitorial standards.",
        "Mirola Cleaning Services deploys technicians trained in OSHA Bloodborne Pathogen standards, CDC infection control guidelines, and HIPAA patient privacy rules. We utilize EPA List N broad-spectrum germicides with validated dwell times against C. diff, MRSA, Hepatitis B/C, and Norovirus.",
        "Through strict 4-color microfiber zoning and cleanroom vacuum filtration, we guarantee that microbes from patient restrooms never migrate into treatment rooms or reception spaces."
      ]}
      features={[
        {
          title: 'Exam Room & Surgical Terminal Clean',
          desc: 'Systematic top-to-bottom decontamination of patient examination tables, Mayo stands, diagnostic lights, and blood pressure cuffs.',
          icon: <Activity size={22} />,
          highlight: 'Terminal Clean'
        },
        {
          title: 'Color-Coded Microfiber Cross-Defense',
          desc: 'Red (sanitary fixtures), yellow (clinical prep), blue (patient zones), and green (breakrooms) to eliminate pathogen cross-transfer.',
          icon: <ShieldCheck size={22} />,
          highlight: 'Zero Cross-Transfer'
        },
        {
          title: 'Bio-Hazard & Sharps Enclosure Support',
          desc: 'Safe protocol sanitation around regulated medical waste bins, sharps disposal stations, and biohazard isolation hampers.',
          icon: <Lock size={22} />,
          highlight: 'OSHA Certified'
        },
        {
          title: 'Waiting Room & Reception High-Touch Care',
          desc: 'Continuous antimicrobial wipe-down of reception glass partitions, pens, clipboard check-ins, vinyl armchairs, and entryway doors.',
          icon: <HeartHandshake size={22} />,
          highlight: 'Patient Trust'
        },
        {
          title: 'Clinical Lab Bench Degreasing & Sanitizing',
          desc: 'Static-safe, chemical-resistant sanitization of lab countertops, centrifuges, bio-safety cabinet exteriors, and specimen pass-through windows.',
          icon: <Sparkles size={22} />,
          highlight: 'Lab Grade'
        },
        {
          title: 'Hospital-Grade Vinyl & Terrazzo Floor Care',
          desc: 'Double-bucket mopping systems with neutral quat disinfectants to protect seamless medical linoleum and epoxy flooring.',
          icon: <CheckCircle2 size={22} />,
          highlight: 'Antimicrobial Coat'
        }
      ]}
      gallery={[
        {
          src: '/images/drive_folder_2/DSC00210.jpg',
          alt: 'Specialist sterilizing clinical exam and treatment surfaces',
          caption: 'Terminal sanitization of patient examination and treatment surfaces.',
          tag: 'Clinical Exam Suites'
        },
        {
          src: '/images/drive_folder_2/DSC00249.jpg',
          alt: 'Medical sink and scrub station sanitization',
          caption: 'Sterilizing clinical wash sinks, sensor faucets, and vanity counters.',
          tag: 'Scrub Stations'
        },
        {
          src: '/images/drive_folder_2/DSC00402.jpg',
          alt: 'Electrostatic mist sanitization',
          caption: 'Specialized electrostatic antimicrobial misting of clinical surfaces.',
          tag: 'Terminal Misting'
        },
        {
          src: '/images/drive_folder_2/DSC00256.jpg',
          alt: 'Restroom terminal sanitization and mirror polishing',
          caption: 'Hospital-grade sanitization of clinical restrooms and hand hygiene units.',
          tag: 'Sanitary Hygiene'
        }
      ]}
      checklists={[
        {
          category: 'Daily Clinical Protocol',
          items: [
            'Terminal wipe of all examination tables and medical vinyl pads',
            'Disinfect diagnostic equipment handles, otoscopes, and scale plates',
            'Full sanitization of clinical handwash stations and soap dispensers',
            'Double-bucket disinfectant damp mop of exam room floors with fresh mop heads',
            'Wipe and sanitize waiting room patient seating and check-in desks',
            'Empty general trash and sanitize trash can lids'
          ]
        },
        {
          category: 'Weekly Healthcare Deep Scope',
          items: [
            'Deep scrub patient restroom ceramic tile and wall grout',
            'Disinfect high-touch interior glass, door frames, and cabinet latches',
            'Sanitize doctors’ charting stations, computer keyboards, and telephone headsets',
            'Clean and disinfect nursing station medication prep counters'
          ]
        },
        {
          category: 'Monthly & Infection Outbreak Services',
          items: [
            'Full room aerosolized hospital-grade antimicrobial fogging',
            'Machine scrub and reseal medical-grade sheet vinyl flooring',
            'Air filtration duct grille sanitization and HEPA filter replacement audit'
          ]
        }
      ]}
      faqItems={[
        {
          q: 'Are your cleaners trained in HIPAA patient confidentiality?',
          a: 'Yes. Every cleaner is briefed on HIPAA compliance, ensuring that charts, computer displays, and patient files are never observed, photographed, or disturbed.'
        },
        {
          q: 'Do your chemicals meet CDC and USA Department of Health standards?',
          a: 'Yes, we exclusively utilize hospital-grade EPA-registered disinfectants proven effective against bloodborne pathogens, SARS-CoV-2, MRSA, and hospital-acquired infections (HAIs).'
        },
        {
          q: 'Can you provide terminal cleaning logs for state licensing audits?',
          a: 'Yes, our supervisors generate digital time-stamped inspection and sanitation logs that satisfy Joint Commission, AAAASF, and state health department audit requirements.'
        }
      ]}
      relatedBuildingLinks={[
        {
          title: 'Corporate Office Cleaning',
          path: '/services/janitorial/office',
          icon: <Building2 size={20} />,
          desc: 'Workstation hygiene, executive boardrooms & nightly commercial janitorial.'
        },
        {
          title: 'Gym & Fitness Center Cleaning',
          path: '/services/janitorial/gym',
          icon: <Dumbbell size={20} />,
          desc: 'High-touch workout machines, locker rooms, saunas & rubber floor scrub.'
        },
        {
          title: 'Daycare & Preschool Cleaning',
          path: '/services/janitorial/daycare',
          icon: <Baby size={20} />,
          desc: 'Child-safe, non-toxic sanitization for preschools, nap cots & play areas.'
        }
      ]}
      onNavigate={onNavigate}
      onOpenConsultation={onOpenConsultation}
    />
  );
};
