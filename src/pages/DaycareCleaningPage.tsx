import React from 'react';
import { 
  Baby, 
  ShieldCheck, 
  Sparkles, 
  HeartHandshake, 
  ThermometerSnowflake,
  Smile,
  Dumbbell,
  Building2,
  Boxes
} from 'lucide-react';
import { ServicePageLayout } from '../components/ServicePageLayout';
import type { AppRoute } from '../types/navigation';

interface DaycareCleaningPageProps {
  onNavigate: (path: AppRoute) => void;
  onOpenConsultation: () => void;
}

export const DaycareCleaningPage: React.FC<DaycareCleaningPageProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  return (
    <ServicePageLayout
      currentPath="/services/janitorial/daycare"
      breadcrumbs={[
        { label: 'Services', path: '/services/janitorial' },
        { label: 'Janitorial', path: '/services/janitorial' },
        { label: 'Daycare Cleaning' }
      ]}
      badgeText="CHILD-SAFE & PEDIATRIC CERTIFIED"
      title="Daycare & Preschool"
      titleHighlight="Cleaning Services"
      subtitle="Protecting infants, toddlers, and educators with non-toxic, hospital-grade sanitization that eliminates pathogens while leaving zero harsh chemical residues."
      heroImage="/images/thumb_DSC03742.jpg"
      heroImageCaption="Active On-Site Sanitization of Preschool Classroom Furniture"
      stats={[
        { value: '100%', label: 'Non-Toxic Green Certified' },
        { value: '99.99%', label: 'Germ & Virus Kill Rate' },
        { value: '100% DCF', label: 'Child Care Licensing Compliant' }
      ]}
      overviewHeading="Creating Safe, Spotless Havens Where Children Learn and Thrive"
      overviewParagraphs={[
        "Childcare facilities and preschools require the highest standard of biological defense. Toddlers explore with their hands and mouths, making ordinary commercial detergents inadequate and harsh bleaches dangerous.",
        "Mirola Cleaning Services implements EPA-registered, pediatric-safe botanical disinfectants that neutralize RSV, Norovirus, Influenza, Hand-Foot-and-Mouth disease, and common bacteria without volatile organic compounds (VOCs) or chemical residues.",
        "From infant cribs and sensory tables to dining highchairs and outdoor transition mats, our trained technicians adhere to strict state health and DCF regulatory protocols."
      ]}
      features={[
        {
          title: 'Toy & Play Surface Disinfection',
          desc: 'Daily sterilization of plastic toys, sensory bins, wooden blocks, and shared learning materials with child-safe antimicrobial agents.',
          icon: <Baby size={22} />,
          highlight: 'Food-Contact Safe'
        },
        {
          title: 'Diaper Station & Restroom Terminal Care',
          desc: 'Hospital-level decontamination of changing pads, disposal bins, step stools, mini toilets, and hand-washing vanity surfaces.',
          icon: <ShieldCheck size={22} />,
          highlight: 'Pathogen Defense'
        },
        {
          title: 'Nap Mat & Cot Deep Sanitization',
          desc: 'Detailed cleaning and sanitizing of vinyl sleep mats, resting cots, and cubby storage spaces to prevent cross-contamination.',
          icon: <HeartHandshake size={22} />,
          highlight: 'Hypoallergenic'
        },
        {
          title: 'Non-Slip Floor Sweeping & Steam Mopping',
          desc: 'Thorough removal of food crumbs, dirt, and sticky residues using micro-filtration vacuums and pH-neutral sanitized floor mops.',
          icon: <Sparkles size={22} />,
          highlight: 'Zero Residue'
        },
        {
          title: 'High-Touch Outbreak Mitigation',
          desc: 'Targeted disinfection of door handles, light switches, cabinet pulls, water fountains, and check-in tablets.',
          icon: <ThermometerSnowflake size={22} />,
          highlight: 'Cold & Flu Defense'
        },
        {
          title: 'Indoor Air Quality & HEPA Filtration',
          desc: 'Use of sealed HEPA filtration vacuums that capture 99.97% of dust mites, pollen, and airborne pet dander from staff.',
          icon: <Smile size={22} />,
          highlight: 'Clean Breathing'
        }
      ]}
      gallery={[
        {
          src: '/images/thumb_DSC03742.jpg',
          alt: 'Mirola staff sanitizing daycare classroom table',
          caption: 'Specialist applying non-toxic sanitizing solution to preschool study table.',
          tag: 'Classroom Disinfection'
        },
        {
          src: '/images/thumb_DSC03844.jpg',
          alt: 'Mirola cleaner sweeping daycare hallway floor',
          caption: 'Continuous microfiber dust mopping along school hallway corridor.',
          tag: 'Corridor Care'
        },
        {
          src: '/images/drive_folder_2/DSC00249.jpg',
          alt: 'Restroom vanity disinfection',
          caption: 'Deep sanitization of sink faucets, soap dispensers, and child wash counters.',
          tag: 'Restroom Hygiene'
        },
        {
          src: '/images/drive_folder_2/DSC00280.jpg',
          alt: 'Daily waste and diaper bin disposal',
          caption: 'Systematic daily waste removal and sanitary liner replacement.',
          tag: 'Sanitary Disposal'
        }
      ]}
      checklists={[
        {
          category: 'Daily Evening Clean Scope',
          items: [
            'Disinfect all preschool student activity tables, chairs, and benches',
            'Sterilize changing tables, diaper disposal areas, and sinks',
            'Empty and sanitize all waste bins and diaper receptacles',
            'HEPA vacuum carpeted reading corners and play mats',
            'Wet mop hard surface floors with child-safe disinfectant',
            'Wipe entry doors, push bars, and parent sign-in counters'
          ]
        },
        {
          category: 'Weekly Deep Sanitation',
          items: [
            'Deep wash and sanitize all vinyl nap cots and sleeping mats',
            'Disinfect interior toy storage shelves, cubbies, and lockers',
            'Sanitize interior window glass and child fingerprints on partitions',
            'Machine scrub restroom tile floors and grout lines',
            'Dust window sills, baseboards, and ceiling vents'
          ]
        },
        {
          category: 'Monthly & Periodic Protocols',
          items: [
            'Carpet hot-water extraction and biological odor neutralization',
            'Electrostatic antimicrobial barrier fogging of entire facility',
            'Kitchenette refrigerator and snack prep area deep clean',
            'Emergency outbreak rapid terminal decontamination'
          ]
        }
      ]}
      faqItems={[
        {
          q: 'Are your cleaning chemicals safe around babies and toddlers?',
          a: 'Yes, 100%. We exclusively use EPA-registered, Green Seal certified, and food-contact-safe botanicals that break down without leaving hazardous residues or offensive chemical fumes.'
        },
        {
          q: 'Do you clean after childcare operating hours?',
          a: 'Absolutely. We typically clean in the evenings after children depart, or early in the morning before arrival, so the facility is freshly ventilated, sanitized, and ready for drop-off.'
        },
        {
          q: 'How do you handle viral outbreaks like Hand, Foot & Mouth or RSV?',
          a: 'We have emergency rapid-response protocols including electrostatic hospital-grade misting to coat 100% of exposed surfaces, neutralizing contagions on contact.'
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
          title: 'Corporate Office Cleaning',
          path: '/services/janitorial/office',
          icon: <Building2 size={20} />,
          desc: 'Nightly janitorial, conference rooms, breakroom hygiene & day porters.'
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
