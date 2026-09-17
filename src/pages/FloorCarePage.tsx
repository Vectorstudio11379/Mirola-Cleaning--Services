import React from 'react';
import { 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw, 
  CheckCircle2, 
  Droplet,
  Building2,
  Shield,
  Dumbbell
} from 'lucide-react';
import { ServicePageLayout } from '../components/ServicePageLayout';
import type { AppRoute } from '../types/navigation';

interface FloorCarePageProps {
  onNavigate: (path: AppRoute) => void;
  onOpenConsultation: () => void;
}

export const FloorCarePage: React.FC<FloorCarePageProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  return (
    <ServicePageLayout
      currentPath="/services/floor-care"
      breadcrumbs={[
        { label: 'Services', path: '/services/janitorial' },
        { label: 'Floor Care & Strip and Wax' }
      ]}
      badgeText="INDUSTRIAL & COMMERCIAL FLOOR RESTORATION"
      title="Commercial Floor Care &"
      titleHighlight="Strip and Wax Services"
      subtitle="Restoring dull, scuffed, and worn commercial flooring to brilliant, mirror-finish clarity with multi-speed rotary stripping, polymer waxing, high-speed burnishing, and diamond polishing."
      heroImage="/images/drive_folder_2/DSC03844.jpg"
      heroImageCaption="High-Gloss Commercial Floor Care & Hardwood Corridor Maintenance"
      stats={[
        { value: '5-Layer', label: 'Polymer High-Gloss Seal Coat' },
        { value: '100%', label: 'Slip-Resistant ASTM Certified' },
        { value: '25+ Yrs', label: 'Surface Finish Longevity' }
      ]}
      overviewHeading="Transforming Worn Commercial Corridors into Mirror-Finish Showpieces"
      overviewParagraphs={[
        "Commercial floors take relentless punishment from pedestrian foot traffic, rolling carts, salt residue in winter, and grit. Over time, standard mop-and-bucket cleaning fails as old wax discolors, yellowing and trapping grime deep within the substrate.",
        "Mirola Cleaning Services is the USA’s recognized leader in commercial floor stripping, waxing, and restoration. We deploy heavy-duty commercial rotary machines, chemical emulsifiers, and premium high-solid polymer finishes that deliver an extraordinary wet-look reflection while meeting strict ASTM non-slip safety ratings.",
        "Whether your facility features Vinyl Composition Tile (VCT), terrazzo, polished concrete, linoleum, ceramic tile and grout, or natural marble, our specialized technicians restore its original luster and protect it against heavy foot traffic."
      ]}
      features={[
        {
          title: 'Complete Wax Stripping & Emulsification',
          desc: '100% removal of discolored, yellowed wax layers and embedded dirt down to the bare substrate using commercial rotary scrubbers.',
          icon: <RefreshCw size={22} />,
          highlight: 'Bare Substrate Prep'
        },
        {
          title: 'Multi-Coat High-Solid Polymer Waxing',
          desc: 'Application of 4 to 6 thin, uniform coats of commercial grade, 25%+ high-solid polymer wax for deep dimensional gloss.',
          icon: <Layers size={22} />,
          highlight: 'Mirror Finish'
        },
        {
          title: 'High-Speed Propane & Electric Burnishing',
          desc: 'Thermal burnishing at 2,000+ RPM to harden the finish, smooth micro-grooves, and produce the coveted “wet-look” reflection.',
          icon: <Sparkles size={22} />,
          highlight: '2,000+ RPM'
        },
        {
          title: 'Tile & Grout Deep Acid/Alkaline Scrub',
          desc: 'High-pressure rotary extraction that extracts dark, grease-stained grout lines in commercial restrooms and cafeterias.',
          icon: <Droplet size={22} />,
          highlight: 'Grout Restored'
        },
        {
          title: 'Terrazzo & Concrete Polishing & Densifying',
          desc: 'Diamond abrasive pad honing and lithium densification to turn industrial concrete into hardened, stain-resistant architectural surfaces.',
          icon: <ShieldCheck size={22} />,
          highlight: 'Diamond Polish'
        },
        {
          title: 'Slip-Resistant Safety Sealants',
          desc: 'UL-classified non-slip sealants that meet ADA and OSHA friction standards, keeping employees and visitors safe in wet weather.',
          icon: <CheckCircle2 size={22} />,
          highlight: 'ASTM Certified'
        }
      ]}
      gallery={[
        {
          src: '/images/drive_folder_2/DSC00370.jpg',
          alt: 'Specialist maintaining commercial polished floor',
          caption: 'Precision microfiber damp mopping and high-gloss floor maintenance.',
          tag: 'Hard Surface Care'
        },
        {
          src: '/images/drive_folder_2/DSC03844.jpg',
          alt: 'Corridor floor finishing and dust mop sweeping',
          caption: 'Precision dust mopping along newly stripped and waxed hard corridor.',
          tag: 'Corridor Care'
        },
        {
          src: '/images/drive_folder_2/DSC00356.jpg',
          alt: 'Utility and laundry floor maintenance',
          caption: 'Specialist maintaining commercial tile floor in commercial facility.',
          tag: 'Substrate Cleaning'
        },
        {
          src: '/images/drive_folder_2/DSC00318.jpg',
          alt: 'Workstation tile floor care',
          caption: 'Detail cleaning and transition border care between tile and carpeting.',
          tag: 'Edge Detailing'
        }
      ]}
      checklists={[
        {
          category: 'Phase 1: Deep Stripping Process',
          items: [
            'Post OSHA wet-floor caution signage and barrier tape',
            'Apply non-ammoniated commercial chemical wax stripper with ample dwell time',
            'Operate heavy-duty rotary machines with aggressive black stripping pads',
            'Hand-scrape all corners, edges, and baseboards to eliminate wax buildup',
            'Wet-vacuum stripped slurry and perform two thorough neutral-pH rinses'
          ]
        },
        {
          category: 'Phase 2: Polymer Waxing & Curing',
          items: [
            'Apply 1st primer coat of commercial floor sealer to seal porous tile',
            'Apply 4 to 5 coats of 25% high-solids polymer finish using microfiber wax mops',
            'Allow complete 30-45 minute air-dry curing time between coats',
            'Inspect with directional lighting to ensure streak-free gloss uniformity'
          ]
        },
        {
          category: 'Phase 3: Routine Maintenance & Recoats',
          items: [
            'Scheduled high-speed burnishing (1,500 - 2,000 RPM) to maintain wet look',
            'Top-scrub and scrub-and-recoat every 3-6 months in high-traffic lobbies',
            'Neutral floor cleaner damp mopping to prevent premature finish breakdown'
          ]
        }
      ]}
      faqItems={[
        {
          q: 'How long does a commercial strip and wax take to cure before foot traffic?',
          a: 'Light foot traffic is typically allowed within 4 to 6 hours after the final coat is applied. Full curing reaches maximum hardness in 24 to 48 hours. We routinely perform this work on Friday evenings so your floor is 100% cured by Monday morning.'
        },
        {
          q: 'How often should commercial VCT tile floors be stripped and waxed?',
          a: 'High-traffic facilities (supermarkets, medical clinics, schools) benefit from stripping and waxing once every 12 months with quarterly top-scrubs and monthly burnishing. Low-traffic corporate offices can extend cycles to 18-24 months.'
        },
        {
          q: 'Will the floor be slippery with that high-gloss wet look?',
          a: 'Not at all. Our commercial waxes are engineered with microscopic slip-resistant friction agents that exceed ASTM D-2047 static coefficient standards, providing superior traction even in damp conditions.'
        }
      ]}
      relatedBuildingLinks={[
        {
          title: 'Janitorial Services Overview',
          path: '/services/janitorial',
          icon: <Building2 size={20} />,
          desc: 'Comprehensive recurring facility cleaning programs across the USA.'
        },
        {
          title: 'Sanitation Services',
          path: '/services/sanitation',
          icon: <Shield size={20} />,
          desc: 'Hospital-grade terminal disinfection, touchpoint barriers & misting.'
        },
        {
          title: 'Gym & Fitness Center Cleaning',
          path: '/services/janitorial/gym',
          icon: <Dumbbell size={20} />,
          desc: 'Equipment wipe-down, rubber mat extraction & locker room hygiene.'
        }
      ]}
      onNavigate={onNavigate}
      onOpenConsultation={onOpenConsultation}
    />
  );
};
