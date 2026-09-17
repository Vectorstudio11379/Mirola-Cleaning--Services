export type AppRoute = 
  | '/'
  | '/services/janitorial'
  | '/services/floor-care'
  | '/services/sanitation'
  | '/services/janitorial/daycare'
  | '/services/janitorial/gym'
  | '/services/janitorial/warehouse'
  | '/services/janitorial/office'
  | '/services/janitorial/medical';

export interface ServiceNavigationItem {
  id: string;
  title: string;
  shortDesc: string;
  path: AppRoute;
  iconName: string;
  subItems?: {
    id: string;
    title: string;
    shortDesc: string;
    path: AppRoute;
    iconName: string;
    badge?: string;
  }[];
}

export const SERVICES_NAV_DATA: ServiceNavigationItem[] = [
  {
    id: 'janitorial',
    title: 'Janitorial Services',
    shortDesc: 'Comprehensive recurring facility care tailored by building type.',
    path: '/services/janitorial',
    iconName: 'Sparkles',
    subItems: [
      {
        id: 'daycare',
        title: 'Daycare Cleaning',
        shortDesc: 'Child-safe, non-toxic sanitization for preschools & nurseries.',
        path: '/services/janitorial/daycare',
        iconName: 'Baby',
        badge: 'Child-Safe'
      },
      {
        id: 'gym',
        title: 'Gym Cleaning',
        shortDesc: 'Equipment disinfection, sweat & odor defense, locker rooms.',
        path: '/services/janitorial/gym',
        iconName: 'Dumbbell',
        badge: 'High-Touch'
      },
      {
        id: 'warehouse',
        title: 'Warehouse Cleaning',
        shortDesc: 'Industrial concrete scrubbing, high-bay dusting & logistics zones.',
        path: '/services/janitorial/warehouse',
        iconName: 'Boxes',
        badge: 'Industrial'
      },
      {
        id: 'office',
        title: 'Office Cleaning',
        shortDesc: 'Workstation hygiene, executive boardrooms & nightly janitorial.',
        path: '/services/janitorial/office',
        iconName: 'Building2',
        badge: 'Corporate'
      },
      {
        id: 'medical',
        title: 'Medical Cleaning',
        shortDesc: 'Hospital-grade terminal disinfection & CDC/OSHA compliance.',
        path: '/services/janitorial/medical',
        iconName: 'ShieldCheck',
        badge: 'EPA Grade'
      }
    ]
  },
  {
    id: 'floor-care',
    title: 'Floor Care & Strip and Wax Services',
    shortDesc: 'Rotary stripping, high-gloss VCT finish, buffing & diamond polishing.',
    path: '/services/floor-care',
    iconName: 'Layers'
  },
  {
    id: 'sanitation',
    title: 'Sanitation Services',
    shortDesc: 'Hospital-grade terminal disinfection, touchpoint defense & antimicrobial misting.',
    path: '/services/sanitation',
    iconName: 'Shield'
  }
];
