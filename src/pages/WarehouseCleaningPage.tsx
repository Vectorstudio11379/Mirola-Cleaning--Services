import React from 'react';
import { 
  Boxes, 
  ShieldCheck, 
  Layers, 
  Truck, 
  Trash2,
  Building2,
  Dumbbell,
  Baby
} from 'lucide-react';
import { ServicePageLayout } from '../components/ServicePageLayout';
import type { AppRoute } from '../types/navigation';

interface WarehouseCleaningPageProps {
  onNavigate: (path: AppRoute) => void;
  onOpenConsultation: () => void;
}

export const WarehouseCleaningPage: React.FC<WarehouseCleaningPageProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  return (
    <ServicePageLayout
      currentPath="/services/janitorial/warehouse"
      breadcrumbs={[
        { label: 'Services', path: '/services/janitorial' },
        { label: 'Janitorial', path: '/services/janitorial' },
        { label: 'Warehouse Cleaning' }
      ]}
      badgeText="INDUSTRIAL & LOGISTICS FACILITY SOLUTIONS"
      title="Warehouse & Distribution"
      titleHighlight="Cleaning Services"
      subtitle="Heavy-duty concrete floor scrubbing, high-bay structural dusting, packing debris management, and loading dock sanitation engineered for USA logistics hubs."
      heroImage="/images/drive_folder_2/DSC00280.jpg"
      heroImageCaption="High-Capacity Industrial Waste Handling & Continuous Facility Maintenance"
      stats={[
        { value: '500k+', label: 'Sq. Ft. Capacities Handled' },
        { value: 'OSHA', label: 'Safety & Slip-Resistance Compliant' },
        { value: '24/7', label: 'Shift-Aligned Janitorial Crews' }
      ]}
      overviewHeading="Optimizing Safety, Air Quality, and Operational Throughput"
      overviewParagraphs={[
        "Modern fulfillment centers, distribution warehouses, and manufacturing plants accumulate massive volumes of corrugated cardboard dust, forklift tire marks, grease, and industrial debris that create OSHA slip-and-fall hazards and foul HVAC air intake systems.",
        "Mirola Cleaning Services delivers specialized industrial cleaning programs engineered around your operating shifts. We deploy walk-behind and ride-on auto-scrubbers, HEPA backpack filtration, and high-reach extension wands to clean racking without disturbing inventory.",
        "From the staging floor and cross-docking bays to employee breakrooms, locker facilities, and supervisory dispatch offices, our bonded team ensures compliant, spotless operational environments."
      ]}
      features={[
        {
          title: 'Concrete Floor Sweeping & Scrubbing',
          desc: 'Removal of tire marks, pallet splinters, and oil stains using heavy-duty alkaline degreasers and industrial cylindrical scrubbers.',
          icon: <Layers size={22} />,
          highlight: 'Slip Prevention'
        },
        {
          title: 'High-Bay Overhead Racking Dusting',
          desc: 'Clearing dust from structural steel beams, joists, pendant lighting, fire sprinkler pipes, and high-tier storage pallet racking.',
          icon: <Boxes size={22} />,
          highlight: 'Up to 35ft Reach'
        },
        {
          title: 'Loading Dock & Staging Bay Hygiene',
          desc: 'Pressure washing and sweeping of dock levelers, exterior receiving pads, roll-up overhead doors, and truck staging areas.',
          icon: <Truck size={22} />,
          highlight: 'Logistics Ready'
        },
        {
          title: 'Industrial Debris & Waste Removal',
          desc: 'Continuous clearance of shrink wrap plastic, broken pallet wood, packing paper, and strapping bands into bulk compactor units.',
          icon: <Trash2 size={22} />,
          highlight: 'Zero Clutter'
        },
        {
          title: 'Dispatch Offices & Breakroom Care',
          desc: 'Nightly janitorial care for supervisory trailers, dispatch desks, administrative offices, lunchrooms, and vending spaces.',
          icon: <Building2 size={22} />,
          highlight: 'Staff Comfort'
        },
        {
          title: 'OSHA Compliance & Hazard Auditing',
          desc: 'Active monitoring of safety eye-wash stations, fire exits, spill control corridors, and emergency eyewash clearance zones.',
          icon: <ShieldCheck size={22} />,
          highlight: 'Safety Inspected'
        }
      ]}
      gallery={[
        {
          src: '/images/drive_folder_2/DSC00280.jpg',
          alt: 'High capacity waste dolly in facility corridor',
          caption: 'High-capacity industrial waste dolly and corridor maintenance.',
          tag: 'Waste Management'
        },
        {
          src: '/images/drive_folder_2/DSC00445.jpg',
          alt: 'High-reach dusting with extension microfiber',
          caption: 'Specialist utilizing high-reach extension duster on overhead structures.',
          tag: 'High-Bay Dusting'
        },
        {
          src: '/images/drive_folder_2/DSC00370.jpg',
          alt: 'Commercial floor cleaning and surface maintenance',
          caption: 'Commercial floor care, microfiber damp mopping, and concrete dust sealing.',
          tag: 'Industrial Floor Care'
        },
        {
          src: '/images/drive_folder_2/DSC00482.jpg',
          alt: 'Squeegee window cleaning on commercial glass',
          caption: 'Detail squeegee washing of warehouse office partitions and entry doors.',
          tag: 'Glass Partitions'
        }
      ]}
      checklists={[
        {
          category: 'Routine Daily Operations',
          items: [
            'Sweep all main forklift traffic aisles and pedestrian walkways',
            'Collect packaging strapping, plastic stretch wrap, and wood debris',
            'Empty high-volume industrial waste bins into central compactors',
            'Sanitize shipping/receiving dispatch counters and computers',
            'Mop and disinfect employee locker rooms and restrooms'
          ]
        },
        {
          category: 'Weekly Mechanical Maintenance',
          items: [
            'Auto-scrub concrete staging zones with heavy degreaser solution',
            'Clean and sanitize breakroom microwaves, refrigerators, and tables',
            'Detail wipe eye-wash stations, first aid boxes, and fire extinguisher stations',
            'Pressure wash entrance dock rubber bumpers and concrete aprons'
          ]
        },
        {
          category: 'Monthly & Periodic Turnkey Clean',
          items: [
            'High-reach vacuuming of overhead ceiling trusses, ducts, and pipes',
            'Detailed cleaning of empty pallet rack bays before new inventory intake',
            'Concrete floor densifying, sealing, and protective burnishing',
            'Post-tenant move-in and move-out deep decontamination'
          ]
        }
      ]}
      faqItems={[
        {
          q: 'Can you work around active forklift traffic and 3-shift schedules?',
          a: 'Yes. Our crews are trained in warehouse safety, high-visibility vest protocols, and spatial awareness to execute between shifts or during designated non-operational windows.'
        },
        {
          q: 'Do you bring your own industrial floor scrubbers and lift equipment?',
          a: 'Yes, we supply all necessary walk-behind or ride-on floor scrubbers, high-reach wands, HEPA vacuum systems, and commercial cleaning chemistry.'
        },
        {
          q: 'Can you clean distribution center offices and driver check-in facilities?',
          a: 'Yes, our scope includes both the large-scale industrial floor and the administrative offices, conference rooms, breakrooms, and driver restrooms.'
        }
      ]}
      relatedBuildingLinks={[
        {
          title: 'Corporate Office Cleaning',
          path: '/services/janitorial/office',
          icon: <Building2 size={20} />,
          desc: 'Executive suites, conference rooms, workstation hygiene & daily porter.'
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
