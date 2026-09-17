import React from 'react';
import { 
  Dumbbell, 
  ShieldCheck, 
  Flame, 
  Droplets, 
  Sparkles, 
  Wind,
  Baby,
  Building2,
  Boxes
} from 'lucide-react';
import { ServicePageLayout } from '../components/ServicePageLayout';
import type { AppRoute } from '../types/navigation';

interface GymCleaningPageProps {
  onNavigate: (path: AppRoute) => void;
  onOpenConsultation: () => void;
}

export const GymCleaningPage: React.FC<GymCleaningPageProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  return (
    <ServicePageLayout
      currentPath="/services/janitorial/gym"
      breadcrumbs={[
        { label: 'Services', path: '/services/janitorial' },
        { label: 'Janitorial', path: '/services/janitorial' },
        { label: 'Gym Cleaning' }
      ]}
      badgeText="FITNESS & ATHLETIC FACILITY SPECIALISTS"
      title="Gym & Fitness Center"
      titleHighlight="Cleaning Services"
      subtitle="Eliminating sweat, MRSA, ringworm, bacteria, and persistent locker room odors with medical-grade disinfection tailored for 24/7 fitness clubs, CrossFit boxes, and boutique studios."
      heroImage="/images/drive_folder_2/DSC00162.jpg"
      heroImageCaption="Sanitizing High-Touch Cardio Consoles & Matrix Exercise Bikes"
      stats={[
        { value: '50+', label: 'Fitness Clubs Serviced' },
        { value: '99.9%', label: 'Bacteria & Odor Elimination' },
        { value: '24/7', label: 'Overnight & Peak Day Porters' }
      ]}
      overviewHeading="Elevating Member Retention Through Immaculate Hygiene and Freshness"
      overviewParagraphs={[
        "Gym members judge fitness facilities primarily on cleanliness and odor. Heavy daily foot traffic, sweat transfer, and shared equipment create prime breeding environments for Staphylococcus, MRSA, athlete’s foot fungus, and unpleasant bio-odors.",
        "Mirola Cleaning Services is trusted by leading commercial gym operators across the USA—including regional Crunch Fitness franchises. We deploy hospital-grade germicidal cleaners and high-reach microfibers that cut through sweat grease without corroding expensive digital consoles or vinyl upholstery.",
        "From free-weight dumbbell racks and rubber flooring to tiled locker showers and high-humidity cedar saunas, our specialized teams keep your facility pristine, fresh, and inspection-ready 365 days a year."
      ]}
      features={[
        {
          title: 'Cardio & Strength Equipment Sanitization',
          desc: 'Thorough wipe-down of treadmills, ellipticals, cable grips, and weight selector pins using non-abrasive antimicrobial germicides.',
          icon: <Dumbbell size={22} />,
          highlight: 'Screen Safe'
        },
        {
          title: 'Free Weight & Barbell Decontamination',
          desc: 'Detailed degreasing and chalk removal from knurled barbell bars, kettlebells, weight plates, and adjustable flat/incline benches.',
          icon: <ShieldCheck size={22} />,
          highlight: 'Bio-Barrier'
        },
        {
          title: 'Locker Rooms & Tile Showers',
          desc: 'High-pressure tile scrubbing, mold and mildew eradication, vanity mirror polishing, and locker surface sterilization.',
          icon: <Droplets size={22} />,
          highlight: 'Fungus Defense'
        },
        {
          title: 'Sauna, Steam & Spa Amenities',
          desc: 'Deep cedar wood sanitation, non-toxic steam room scrubbing, and high-temp disinfection to ensure hygienic member relaxation.',
          icon: <Flame size={22} />,
          highlight: 'Spa Clean'
        },
        {
          title: 'Rubber Flooring & Turf Extraction',
          desc: 'Industrial rotary scrubbing and pH-neutral extraction of interlocking rubber gym mats, lifting platforms, and artificial turf.',
          icon: <Sparkles size={22} />,
          highlight: 'Deep Extracted'
        },
        {
          title: 'Odor Neutralization & Air Refreshment',
          desc: 'Enzymatic airborne bio-odor neutralizers and HVAC return vent dust removal to ensure a crisp, invigorating workout environment.',
          icon: <Wind size={22} />,
          highlight: 'Crisp Air'
        }
      ]}
      gallery={[
        {
          src: '/images/drive_folder_2/DSC00162.jpg',
          alt: 'Mirola cleaner wiping Matrix stationary bike',
          caption: 'Specialist wiping down Matrix cardio cycle handles and seat.',
          tag: 'Cardio Equipment'
        },
        {
          src: '/images/drive_folder_2/DSC00208.jpg',
          alt: 'Cleaning workout bench with disinfectant',
          caption: 'Antimicrobial wipe-down of Nautilus weightlifting bench.',
          tag: 'Free Weights'
        },
        {
          src: '/images/drive_folder_2/DSC00216.jpg',
          alt: 'Sanitizing treadmill row',
          caption: 'Full-row sanitization of commercial treadmills and consoles.',
          tag: 'Cardio Deck'
        },
        {
          src: '/images/drive_folder_2/DSC00272.jpg',
          alt: 'Two cleaners cleaning modern gym lockers',
          caption: 'Complete wipe-down and sanitization of modern white locker bank.',
          tag: 'Locker Rooms'
        },
        {
          src: '/images/drive_folder_2/DSC00402.jpg',
          alt: 'Cedar sauna mist sanitization',
          caption: 'Specialized non-toxic pressure misting inside cedar sauna suite.',
          tag: 'Spa & Sauna'
        },
        {
          src: '/images/drive_folder_2/DSC00568.jpg',
          alt: 'Mirola cleaning crew at Crunch Fitness backdrop',
          caption: 'Mirola facility specialists on-site at Crunch Fitness facility.',
          tag: 'Crunch Fitness Partner'
        }
      ]}
      checklists={[
        {
          category: 'Daily Overnight Shift Scope',
          items: [
            'Wipe down all cardio displays, handles, cup holders, and belt frames',
            'Disinfect all dumbbells, barbells, kettlebells, and weight racks',
            'Sanitize and polish all workout bench vinyl cushions and frames',
            'Scrub and sanitize locker room shower stalls, toilets, and urinals',
            'Wipe and disinfect all locker handles and exterior locker doors',
            'Wet mop rubber gym flooring with anti-slip deodorizing solution'
          ]
        },
        {
          category: 'Day Porter Continuous Care',
          items: [
            'Restock member wipe dispensers, paper towels, and hand sanitizers',
            'Continuous sweep and wipe of high-traffic main corridor floors',
            'Immediate spot cleaning of sweat spills and water puddle hazards',
            'Hourly locker room towel bin emptying and mirror touch-ups'
          ]
        },
        {
          category: 'Weekly & Monthly Deep Protocols',
          items: [
            'High-speed rotary machine scrub of all interlocking rubber floors',
            'Deep chemical descale of shower heads, drains, and tile grout lines',
            'Cedar wood sauna wash and non-toxic high-temp steam sanitation',
            'High-dusting of ceiling light fixtures, trusses, and air duct grilles'
          ]
        }
      ]}
      faqItems={[
        {
          q: 'Will your disinfectants damage our electronic cardio touchscreens?',
          a: 'No. We use specialized non-alcohol, non-ammonia electronic safe disinfectants and micro-denier cloths engineered specifically for LED/LCD screens and cardio consoles.'
        },
        {
          q: 'Can you provide cleaning during peak operating hours without disrupting members?',
          a: 'Yes! We provide discrete, courteous Day Porters who maintain supplies, spot-clean, and empty trash bins quietly during peak hours, and full crews overnight for comprehensive deep cleaning.'
        },
        {
          q: 'How do you combat locker room sweat odor and fungus?',
          a: 'We combine EPA-registered fungicidal disinfectants with bio-enzymatic odor digesters that break down sweat proteins at the molecular level, leaving the air fresh and clean.'
        }
      ]}
      relatedBuildingLinks={[
        {
          title: 'Daycare & Preschool Cleaning',
          path: '/services/janitorial/daycare',
          icon: <Baby size={20} />,
          desc: 'Child-safe, non-toxic sanitization for preschools, nap cots & play areas.'
        },
        {
          title: 'Corporate Office Cleaning',
          path: '/services/janitorial/office',
          icon: <Building2 size={20} />,
          desc: 'Workstation hygiene, executive boardrooms & nightly commercial janitorial.'
        },
        {
          title: 'Warehouse & Logistics Cleaning',
          path: '/services/janitorial/warehouse',
          icon: <Boxes size={20} />,
          desc: 'High-bay dusting, industrial concrete sweeping & loading dock safety.'
        }
      ]}
      onNavigate={onNavigate}
      onOpenConsultation={onOpenConsultation}
    />
  );
};
