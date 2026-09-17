import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Droplets, 
  CheckCircle2, 
  Building2,
  Layers,
  ThermometerSnowflake,
  Wind
} from 'lucide-react';
import { ServicePageLayout } from '../components/ServicePageLayout';
import type { AppRoute } from '../types/navigation';

interface SanitationPageProps {
  onNavigate: (path: AppRoute) => void;
  onOpenConsultation: () => void;
}

export const SanitationPage: React.FC<SanitationPageProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  return (
    <ServicePageLayout
      currentPath="/services/sanitation"
      breadcrumbs={[
        { label: 'Services', path: '/services/janitorial' },
        { label: 'Sanitation Services' }
      ]}
      badgeText="HOSPITAL-GRADE TERMINAL DISINFECTION & ANTIMICROBIAL BARRIERS"
      title="Commercial Facility"
      titleHighlight="Sanitation Services"
      subtitle="Eradicating 99.99% of viral and bacterial pathogens with EPA List N hospital germicides, electrostatic misting, high-touch pathogen barriers, and verified biological decontamination."
      heroImage="/images/drive_folder_2/DSC00402.jpg"
      heroImageCaption="Electrostatic Misting & Comprehensive Antimicrobial Surface Decontamination"
      stats={[
        { value: '99.99%', label: 'Broad-Spectrum Kill Efficacy' },
        { value: 'EPA List N', label: 'Registered Hospital Disinfectants' },
        { value: '2-Hour', label: 'Emergency Outbreak Response' }
      ]}
      overviewHeading="Defending Occupants with Medical-Grade Microbial Eradication"
      overviewParagraphs={[
        "Modern commercial facilities face invisible threats: airborne viral aerosol settling, high-touch cross-contamination, fungal spores in locker facilities, and gastrointestinal bacteria like Norovirus and Salmonella.",
        "Mirola Cleaning Services delivers surgical-grade sanitation protocols engineered for commercial offices, fitness centers, childcare centers, schools, and medical clinics throughout the USA.",
        "We utilize electrostatic spray technology that charges disinfectant droplets to wrap 360 degrees around all exposed surfaces, furniture undersides, and hard-to-reach recesses, ensuring complete contact dwell times without leaving wet residues."
      ]}
      features={[
        {
          title: '360° Electrostatic Disinfectant Misting',
          desc: 'Electrostatically charged aerosol droplets envelope three-dimensional fixtures, keyboard crevices, and seating fabrics for total kill coverage.',
          icon: <Wind size={22} />,
          highlight: 'Full Wrap Coverage'
        },
        {
          title: 'High-Touch Surface Bio-Barrier Coating',
          desc: 'Application of residual antimicrobial surface protectants on door handles, elevator buttons, handrails, push plates, and touchscreens.',
          icon: <ShieldCheck size={22} />,
          highlight: 'Residual Shield'
        },
        {
          title: 'Restroom Terminal Deep Sanitation',
          desc: 'Hospital-level chemical wash of ceramic urinals, commodes, partitions, and floor drains to eliminate bacterial buildup and odors.',
          icon: <Droplets size={22} />,
          highlight: 'Odor Neutralized'
        },
        {
          title: 'Emergency Viral Outbreak Rapid Response',
          desc: 'Immediate dispatch of hazmat-trained sanitation crews following confirmed COVID-19, Norovirus, Influenza, or bacterial incidents.',
          icon: <ThermometerSnowflake size={22} />,
          highlight: '2-Hr Dispatch'
        },
        {
          title: 'Food Service & Breakroom Sterilization',
          desc: 'NSF-certified, food-contact-safe degreasing and sanitizing of commercial kitchen prep counters, dining tables, and microwaves.',
          icon: <Sparkles size={22} />,
          highlight: 'Food Safe'
        },
        {
          title: 'ATP Bioluminescence Verification',
          desc: 'Scientific swab testing of surfaces before and after sanitation to provide objective, documented proof of microbial reduction.',
          icon: <CheckCircle2 size={22} />,
          highlight: 'Lab Verified'
        }
      ]}
      gallery={[
        {
          src: '/images/drive_folder_2/DSC00402.jpg',
          alt: 'Specialist applying antimicrobial mist',
          caption: 'Specialist applying hospital-grade antimicrobial mist to high-humidity suite.',
          tag: 'Antimicrobial Misting'
        },
        {
          src: '/images/medical_cleaning_hero.png',
          alt: 'Healthcare terminal corridor sanitation and infection control',
          caption: 'Hospital-grade sanitization and terminal disinfection in healthcare corridor.',
          tag: 'Healthcare Sanitation'
        },
        {
          src: '/images/drive_folder_2/DSC00256.jpg',
          alt: 'Commercial restroom mirror and fixture cleaning',
          caption: 'Sanitizing hand-towel dispensers, mirrors, and touchpoint surfaces.',
          tag: 'Touchpoint Care'
        },
        {
          src: '/images/drive_folder_2/DSC00210.jpg',
          alt: 'Clinical laboratory sterile protocol',
          caption: 'Clinical grade disinfection protocol applied to diagnostic workspaces.',
          tag: 'Clinical Disinfection'
        }
      ]}
      checklists={[
        {
          category: 'Core Sanitation Execution Sequence',
          items: [
            'Preliminary bio-soil removal and detergent pre-clean of all surfaces',
            'Full dwell-time application of EPA-registered hospital disinfectant',
            'Targeted disinfection of all high-touch levers, handles, and touchscreens',
            'Restroom fixture terminal foam wash and sanitary wipe-down',
            'Microfiber extraction of high-traffic floors with neutral germicide'
          ]
        },
        {
          category: 'Electrostatic & Fogging Deployment',
          items: [
            'Calibration of micron droplet size (20-40 microns) for optimal adhesion',
            'Systematic room-by-room electrostatic spray dispersal',
            'Air evacuation protocol and automated 15-minute re-entry clearance',
            'Post-treatment wipe of computer monitors and optical equipment'
          ]
        },
        {
          category: 'Quality Auditing & Reporting',
          items: [
            'ATP luminometer swab testing on 5 random high-touch touchpoints',
            'Digital supervisor time-stamped sanitation certificate delivery',
            'Safety Data Sheet (SDS) binder update for facility compliance records'
          ]
        }
      ]}
      faqItems={[
        {
          q: 'Is electrostatic misting safe around computers and electronics?',
          a: 'Yes. Our electrostatic misting devices produce fine microscopic droplets that disperse evenly and evaporate rapidly without pooling liquid on sensitive electronic components or papers.'
        },
        {
          q: 'How quickly can employees or members re-enter after sanitation?',
          a: 'Thanks to fast-acting botanicals and hospital-grade quats with low dwell times, spaces are completely safe for re-entry within 15 to 30 minutes following treatment.'
        },
        {
          q: 'Do your sanitation services satisfy state health inspection standards?',
          a: 'Yes, 100%. We provide formal digital Certificates of Sanitization and SDS compliance documentation that verify compliance with USA Department of Health and CDC protocols.'
        }
      ]}
      relatedBuildingLinks={[
        {
          title: 'Janitorial Services Overview',
          path: '/services/janitorial',
          icon: <Building2 size={20} />,
          desc: 'Customized recurring cleaning programs for commercial buildings.'
        },
        {
          title: 'Floor Care & Strip and Wax Services',
          path: '/services/floor-care',
          icon: <Layers size={20} />,
          desc: 'High-gloss VCT finish, rotary stripping & concrete densifying.'
        }
      ]}
      onNavigate={onNavigate}
      onOpenConsultation={onOpenConsultation}
    />
  );
};
