import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  Laptop, 
  Coffee, 
  Users,
  Baby,
  Dumbbell,
  Boxes
} from 'lucide-react';
import { ServicePageLayout } from '../components/ServicePageLayout';
import type { AppRoute } from '../types/navigation';

interface OfficeCleaningPageProps {
  onNavigate: (path: AppRoute) => void;
  onOpenConsultation: () => void;
}

export const OfficeCleaningPage: React.FC<OfficeCleaningPageProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  return (
    <ServicePageLayout
      currentPath="/services/janitorial/office"
      breadcrumbs={[
        { label: 'Services', path: '/services/janitorial' },
        { label: 'Janitorial', path: '/services/janitorial' },
        { label: 'Office Cleaning' }
      ]}
      badgeText="CORPORATE & COMMERCIAL SUITE SPECIALISTS"
      title="Corporate Office"
      titleHighlight="Cleaning Services"
      subtitle="Fostering productive, pristine workplaces for modern enterprises with tailored nightly janitorial, day porter services, and executive touchpoint hygiene."
      heroImage="/images/drive_folder_2/DSC00318.jpg"
      heroImageCaption="Commercial Vacuuming & Detail Care in Executive Workstations"
      stats={[
        { value: '250+', label: 'Offices Cleaned Nightly' },
        { value: '100%', label: 'Bonded & Insured Crew' },
        { value: 'Custom', label: 'Daytime or Nightly Schedules' }
      ]}
      overviewHeading="Elevating Professional Impressions and Employee Health"
      overviewParagraphs={[
        "Your office environment directly impacts client trust, staff morale, and employee absenteeism. With shared conference rooms, computer peripherals, coffee stations, and high-density desk layouts, commercial offices quickly accumulate dust, allergens, and seasonal bacteria.",
        "Mirola Cleaning Services partners with leading corporate campuses, law firms, financial institutions, tech startups, and multi-tenant office buildings nationwide.",
        "We implement color-coded microfiber systems to guarantee zero cross-contamination between restrooms and workstations, utilizing HEPA-filtered commercial vacuums to purify indoor air quality."
      ]}
      features={[
        {
          title: 'Workstation & Desktop Sanitation',
          desc: 'Careful dusting and sanitization of computer monitors, keyboards, mice, telephones, and desktop surfaces without disturbing paperwork.',
          icon: <Laptop size={22} />,
          highlight: 'Tech Safe'
        },
        {
          title: 'Executive Boardrooms & Conference Suites',
          desc: 'High-polish maintenance of conference tables, executive leather chairs, glass markerboards, and AV touchscreen presentation gear.',
          icon: <Users size={22} />,
          highlight: 'Meeting Ready'
        },
        {
          title: 'Pantry, Kitchenette & Coffee Station',
          desc: 'Deep cleaning and degreasing of espresso machines, microwaves, refrigerators, sinks, countertops, and recycling centers.',
          icon: <Coffee size={22} />,
          highlight: 'Breakroom Fresh'
        },
        {
          title: 'Commercial Carpet & Hard Floor Care',
          desc: 'Daily commercial upright vacuuming with HEPA filtration, targeted carpet spot removal, and hard tile surface damp mopping.',
          icon: <Sparkles size={22} />,
          highlight: 'Zero Dust'
        },
        {
          title: 'Executive Restroom Deep Hygiene',
          desc: 'Hospital-grade toilet/urinal sanitation, mirror streak-free polishing, counter sanitization, and full supply replenishment.',
          icon: <ShieldCheck size={22} />,
          highlight: 'Spotless Shine'
        },
        {
          title: 'Dedicated Daytime Porters',
          desc: 'Continuous on-site daytime presence to monitor restrooms, clean spills, restock paper supplies, and prep conference rooms between meetings.',
          icon: <Building2 size={22} />,
          highlight: 'Day Porter Option'
        }
      ]}
      gallery={[
        {
          src: '/images/drive_folder_2/DSC00318.jpg',
          alt: 'Mirola cleaner using Oreck vacuum in executive office',
          caption: 'Specialist vacuuming around executive desk with Oreck commercial unit.',
          tag: 'Executive Office'
        },
        {
          src: '/images/drive_folder_2/DSC00329.jpg',
          alt: 'Commercial vacuuming in office workstation',
          caption: 'Detailed vacuuming between open workstations and filing cabinets.',
          tag: 'Workstation Care'
        },
        {
          src: '/images/drive_folder_2/mirola_office_table.jpg',
          alt: 'Boardroom conference table polished',
          caption: 'Conference room table polished and ready for executive presentations.',
          tag: 'Conference Room'
        },
        {
          src: '/images/drive_folder_2/DSC00522.jpg',
          alt: 'Reception counter wiping and polishing',
          caption: 'Detail sanitization and wiping of front reception welcome desk.',
          tag: 'Reception Lobby'
        },
        {
          src: '/images/drive_folder_2/DSC00529.jpg',
          alt: 'Cafeteria and bar counter sanitization',
          caption: 'Sanitizing corporate breakroom counter and refreshment stations.',
          tag: 'Breakroom Hygiene'
        },
        {
          src: '/images/drive_folder_2/DSC00329.jpg',
          alt: 'Open plan office corridor vacuuming',
          caption: 'Specialist maintaining open office corridor and workstation flooring.',
          tag: 'Workstation Floor Care'
        }
      ]}
      checklists={[
        {
          category: 'Daily Nightly Service Scope',
          items: [
            'Empty all desk trash cans and recycling bins; replace clean liners',
            'HEPA vacuum all carpeted office suites, corridors, and conference rooms',
            'Spot clean fingerprints on interior glass partitions, doors, and handles',
            'Wipe and sanitize breakroom counters, coffee machines, sinks, and tables',
            'Restock and sanitize all employee and executive restrooms',
            'Check and secure all designated office suite perimeter doors upon departure'
          ]
        },
        {
          category: 'Weekly Detail Care',
          items: [
            'Detailed dusting of window sills, door frames, picture frames, and blinds',
            'Damp wipe and disinfect office chair armrests and leather seating',
            'Clean interior microwave cavity and wipe exterior refrigerator surfaces',
            'Machine buff high-traffic hard surface tile corridors and reception'
          ]
        },
        {
          category: 'Monthly & Periodic Options',
          items: [
            'Commercial hot-water extraction carpet cleaning and stain removal',
            'Full refrigerator defrost and interior deep chemical clean',
            'Interior and exterior window glass cleaning up to 2 stories',
            'High-speed floor stripping and burnishing for mirror shine'
          ]
        }
      ]}
      faqItems={[
        {
          q: 'Do you clean after business hours?',
          a: 'Yes. The vast majority of our corporate clients prefer evening or night shifts (after 6 PM) or early mornings before employees arrive. We also offer daytime porters for continuous maintenance.'
        },
        {
          q: 'How do you ensure office security and confidentiality?',
          a: 'All Mirola technicians are background checked, vetted, bonded, and sign comprehensive Non-Disclosure Agreements (NDAs). We respect all sensitive documents and never disturb desk papers.'
        },
        {
          q: 'Can we customize our cleaning frequency?',
          a: 'Yes, we provide flexible programs from 1 to 7 days per week, tailored to your corporate head count and square footage.'
        }
      ]}
      relatedBuildingLinks={[
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
        },
        {
          title: 'Warehouse & Logistics Cleaning',
          path: '/services/janitorial/warehouse',
          icon: <Boxes size={20} />,
          desc: 'Heavy-duty concrete scrubbing, high-bay dusting & dock management.'
        }
      ]}
      onNavigate={onNavigate}
      onOpenConsultation={onOpenConsultation}
    />
  );
};
