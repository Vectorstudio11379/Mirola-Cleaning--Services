import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  X, 
  ChevronRight, 
  CheckCircle2, 
  Building2, 
  UserCheck, 
  Sparkles, 
  DollarSign, 
  TrendingUp, 
  Layers, 
  Check, 
  AlertCircle, 
  Loader2, 
  HelpCircle, 
  CalendarCheck,
  MapPin,
  Maximize2,
  Clock
} from 'lucide-react';
import { CONTACT_INFO } from '../constants/contactInfo';
import { submitLeadDirect, generateEmailLinks } from '../services/formSubmission';
import type { AppRoute } from '../types/navigation';

interface PartnersPageProps {
  onNavigate: (path: AppRoute) => void;
  onOpenConsultation: () => void;
}

// Capabilities for Individual Solo Cleaners
const INDIVIDUAL_SERVICES = [
  'Commercial Office Janitorial',
  'Restroom Sanitation & Restock',
  'Trash Removal & Recycling',
  'Floor Mopping & Vacuuming',
  'Breakroom & Kitchen Cleaning',
  'Commercial Glass & Touchpoint Care'
];

// Shifts for Solo Cleaners
const SHIFT_OPTIONS = [
  'Evening / Nightly Janitorial (After 5 PM)',
  'Weekend Cleaning (Sat / Sun)',
  'Early Morning Janitorial (Before 8 AM)',
  'Day Porter / Daytime Coverage'
];

// Capabilities for Cleaning Companies / Subcontractors
const COMPANY_CAPABILITIES = [
  'Corporate Office Janitorial',
  'Medical & Healthcare Terminal Disinfection',
  'Industrial & Warehouse Floor Scrubbing',
  'VCT Strip and Wax & High-Gloss Buffing',
  'Childcare & Daycare Sanitization',
  'High-Traffic Fitness Center Cleaning',
  'Commercial Carpet Hot-Water Extraction',
  'Post-Construction Final Turnover Clean'
];

// Heavy Equipment for Companies
const COMPANY_EQUIPMENT_OPTIONS = [
  'Walk-Behind / Ride-On Auto Scrubbers',
  'High-Speed Floor Burnishers & Buffers',
  'Commercial Carpet Extractors',
  'Electrostatic Disinfection Sprayers',
  'Commercial Backpack HEPA Vacuums',
  'Commercial Pressure Washers',
  'Company Branded Fleet Vehicles'
];

export const PartnersPage: React.FC<PartnersPageProps> = ({ onNavigate }) => {
  // Video Modal State
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  
  // Active Form Tab: 'individual' | 'company'
  const [activeTab, setActiveTab] = useState<'individual' | 'company'>('individual');

  // -------------------------------------------------------------
  // FORM 1: INDIVIDUAL / SOLO CLEANER STATE
  // -------------------------------------------------------------
  const [indFullName, setIndFullName] = useState('');
  const [indEmail, setIndEmail] = useState('');
  const [indPhone, setIndPhone] = useState('');
  const [indLocation, setIndLocation] = useState('');
  const [indExperience, setIndExperience] = useState('1 - 3 years');
  const [indTransportation, setIndTransportation] = useState('Yes — Own Reliable Vehicle');
  const [indInsurance, setIndInsurance] = useState('General Liability Insured');
  const [indEquipmentOwned, setIndEquipmentOwned] = useState('Commercial HEPA Vacuum & Basic Janitorial Kit');
  const [indShifts, setIndShifts] = useState<string[]>([
    'Evening / Nightly Janitorial (After 5 PM)'
  ]);
  const [indServices, setIndServices] = useState<string[]>([
    'Commercial Office Janitorial',
    'Restroom Sanitation & Restock'
  ]);
  const [indNotes, setIndNotes] = useState('');

  // -------------------------------------------------------------
  // FORM 2: CLEANING COMPANY / SUBCONTRACTOR STATE
  // -------------------------------------------------------------
  const [corpCompanyName, setCorpCompanyName] = useState('');
  const [corpContactName, setCorpContactName] = useState('');
  const [corpContactTitle, setCorpContactTitle] = useState('Owner / Managing Director');
  const [corpEmail, setCorpEmail] = useState('');
  const [corpPhone, setCorpPhone] = useState('');
  const [corpCounties, setCorpCounties] = useState('');
  const [corpYearsInBusiness, setCorpYearsInBusiness] = useState('3 - 5 years established');
  const [corpCrewSize, setCorpCrewSize] = useState('2 - 5 Active Crew Members');
  const [corpInsuranceLimit, setCorpInsuranceLimit] = useState('$1,000,000 General Liability');
  const [corpWorkersComp, setCorpWorkersComp] = useState('Active Workers\' Comp in Place');
  const [corpMonthlyCapacity, setCorpMonthlyCapacity] = useState('25,000 - 75,000 sq ft');
  const [corpCapabilities, setCorpCapabilities] = useState<string[]>([
    'Corporate Office Janitorial',
    'VCT Strip and Wax & High-Gloss Buffing'
  ]);
  const [corpEquipment, setCorpEquipment] = useState<string[]>([
    'High-Speed Floor Burnishers & Buffers',
    'Commercial Backpack HEPA Vacuums'
  ]);
  const [corpNotes, setCorpNotes] = useState('');

  // -------------------------------------------------------------
  // SUBMISSION & FEEDBACK STATE
  // -------------------------------------------------------------
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedType, setSubmittedType] = useState<'individual' | 'company' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fallbackLinks, setFallbackLinks] = useState<{ gmailUrl: string; mailtoUrl: string } | null>(null);

  // Active FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Set document title for SEO
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Partner With Mirola | Grow With Mirola Cleaning Services';
    return () => {
      document.title = originalTitle;
    };
  }, []);

  const scrollToApplication = (tab: 'individual' | 'company') => {
    setActiveTab(tab);
    const formElement = document.getElementById('partner-application');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleIndServiceToggle = (service: string) => {
    setIndServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleIndShiftToggle = (shift: string) => {
    setIndShifts(prev => 
      prev.includes(shift) ? prev.filter(s => s !== shift) : [...prev, shift]
    );
  };

  const handleCorpCapabilityToggle = (cap: string) => {
    setCorpCapabilities(prev => 
      prev.includes(cap) ? prev.filter(c => c !== cap) : [...prev, cap]
    );
  };

  const handleCorpEquipmentToggle = (equip: string) => {
    setCorpEquipment(prev => 
      prev.includes(equip) ? prev.filter(e => e !== equip) : [...prev, equip]
    );
  };

  // Submit Individual Solo Cleaner Application
  const handleIndividualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      fullName: indFullName.trim(),
      company: 'Independent Solo Cleaner',
      email: indEmail.trim(),
      phone: indPhone.trim(),
      facilityTypes: indServices.length > 0 ? indServices : ['Commercial Office Janitorial'],
      squareFootage: `Solo Cleaner | ${indExperience} exp | Transport: ${indTransportation}`,
      message: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SOLO CLEANER PARTNER APPLICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Applicant Full Name: ${indFullName.trim()}
• Category: Independent Solo Cleaner
• Email Address: ${indEmail.trim()}
• Direct Mobile Phone: ${indPhone.trim()}
• Coverage Area / Location: ${indLocation.trim() || 'Not specified'}
• Commercial Experience: ${indExperience}
• Reliable Transportation: ${indTransportation}
• General Liability Insurance: ${indInsurance}
• Equipment Owned: ${indEquipmentOwned}
• Shift Availability: ${indShifts.join(', ') || 'Flexible'}
• Services Offered: ${indServices.join(', ')}

ADDITIONAL BACKGROUND & NOTES:
${indNotes.trim() || 'None provided.'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      formType: 'Individual Cleaner Application (/partners)'
    };

    const result = await submitLeadDirect(payload);
    setIsSubmitting(false);

    if (result.success) {
      setSubmittedType('individual');
    } else {
      setErrorMessage(result.message || 'There was a problem submitting your application. Please email or call us directly.');
      if (result.gmailUrl && result.mailtoUrl) {
        setFallbackLinks({ gmailUrl: result.gmailUrl, mailtoUrl: result.mailtoUrl });
      } else {
        const fallbacks = generateEmailLinks(payload);
        setFallbackLinks({ gmailUrl: fallbacks.gmailUrl, mailtoUrl: fallbacks.mailtoUrl });
      }
    }
  };

  // Submit Cleaning Company Subcontractor Application
  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      fullName: `${corpContactName.trim()} (${corpContactTitle.trim()})`,
      company: corpCompanyName.trim(),
      email: corpEmail.trim(),
      phone: corpPhone.trim(),
      facilityTypes: corpCapabilities.length > 0 ? corpCapabilities : ['Corporate Office Janitorial'],
      squareFootage: `Capacity: ${corpMonthlyCapacity} | Crew: ${corpCrewSize} | Ins: ${corpInsuranceLimit}`,
      message: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLEANING COMPANY SUBCONTRACTOR APPLICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Company Legal Name: ${corpCompanyName.trim()}
• Primary Contact Person: ${corpContactName.trim()}
• Contact Title: ${corpContactTitle.trim()}
• Corporate Email: ${corpEmail.trim()}
• Business Phone: ${corpPhone.trim()}
• HQ & Operating Counties: ${corpCounties.trim() || 'Not specified'}
• Years in Business: ${corpYearsInBusiness}
• Active Cleaning Crew Size: ${corpCrewSize}
• General Liability Limit: ${corpInsuranceLimit}
• Workers' Comp Status: ${corpWorkersComp}
• Est. Monthly Capacity: ${corpMonthlyCapacity}
• Commercial Capabilities: ${corpCapabilities.join(', ')}
• Heavy Equipment Owned: ${corpEquipment.join(', ') || 'Standard equipment'}

COMPANY PORTFOLIO & SUMMARY:
${corpNotes.trim() || 'None provided.'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      formType: 'Cleaning Company Subcontractor Application (/partners)'
    };

    const result = await submitLeadDirect(payload);
    setIsSubmitting(false);

    if (result.success) {
      setSubmittedType('company');
    } else {
      setErrorMessage(result.message || 'There was a problem submitting your subcontractor application. Please email or call us directly.');
      if (result.gmailUrl && result.mailtoUrl) {
        setFallbackLinks({ gmailUrl: result.gmailUrl, mailtoUrl: result.mailtoUrl });
      } else {
        const fallbacks = generateEmailLinks(payload);
        setFallbackLinks({ gmailUrl: fallbacks.gmailUrl, mailtoUrl: fallbacks.mailtoUrl });
      }
    }
  };

  const handleResetForm = () => {
    setSubmittedType(null);
    setErrorMessage(null);
    setFallbackLinks(null);
  };

  const partnerFaqs = [
    {
      q: 'Do I have to give up my independent business or existing clients?',
      a: 'Absolutely not. You remain 100% independent. You keep your existing accounts, retain full ownership of your business or solo practice, and decide which cleaning opportunities you want to accept through Mirola.'
    },
    {
      q: 'How and when do Mirola partners get paid?',
      a: 'We provide prompt, predictable payouts via direct deposit on a scheduled weekly or bi-weekly cadence. Every disbursement comes with transparent, itemized statements with zero hidden administrative fees.'
    },
    {
      q: 'What types of cleaning accounts does Mirola offer to partners?',
      a: 'Our portfolio covers corporate offices, medical and dental clinics, educational preschools and daycare centers, commercial fitness facilities, logistics warehouses, and specialty floor care (stripping & waxing) across New Jersey and regional commercial hubs.'
    },
    {
      q: 'What insurance is required to partner with Mirola?',
      a: 'Independent solo cleaners and cleaning companies must carry general liability insurance. If you are currently uninsured or in the process of renewing, submit your application—our operations team can connect you with streamlined, affordable commercial policy providers.'
    },
    {
      q: 'How does the vetting and onboarding process work?',
      a: 'Once you submit your application below, our partner operations team conducts a brief alignment call within 24–48 hours to verify experience, review standard operating procedures, and confirm insurance credentials. Once verified, you are immediately eligible for matched facility assignments.'
    }
  ];

  return (
    <div className="subpage-wrapper partners-standalone-page">
      
      {/* 1. HERO SECTION (DEEP OBSIDIAN DARK + VIBRANT RED ACCENTS + VIDEO) */}
      <section className="subpage-hero-dark partners-hero-section">
        <div className="subpage-container">
          
          {/* Breadcrumb Navigation */}
          <nav className="subpage-breadcrumbs" aria-label="Breadcrumb">
            <button 
              type="button" 
              className="subpage-breadcrumb-btn" 
              onClick={() => onNavigate('/')}
            >
              Home
            </button>
            <ChevronRight size={14} className="subpage-breadcrumb-sep" />
            <span className="subpage-breadcrumb-current">Partner With Mirola</span>
          </nav>

          <div className="subpage-hero-split-grid partners-hero-grid">
            
            {/* Left Column: Headlines, Value Proposition & Actions */}
            <div className="subpage-hero-content">
              <div className="subpage-badge">
                <span className="subpage-pulse-dot" />
                <span>OFFICIAL PARTNER NETWORK</span>
              </div>

              <h1 className="subpage-hero-title">
                Partner With Mirola —{' '}
                <span className="subpage-highlight-red">Grow With Mirola Cleaning Services</span>
              </h1>

              <p className="subpage-hero-subtitle">
                Mirola partners with independent cleaning professionals and cleaning companies to deliver reliable services to our clients. Partners remain independent while gaining access to suitable cleaning opportunities through Mirola.
              </p>

              <div className="subpage-hero-actions">
                <button 
                  type="button" 
                  className="subpage-btn-primary"
                  onClick={() => scrollToApplication(activeTab)}
                  id="hero-become-partner-btn"
                >
                  <span>Become a Partner</span>
                  <ArrowRight size={16} />
                </button>

                <a href={`tel:${CONTACT_INFO.phoneTel}`} className="subpage-phone-badge">
                  <div className="subpage-phone-icon-circle">
                    <Phone size={15} />
                  </div>
                  <span>Partner Ops: {CONTACT_INFO.phoneDisplay}</span>
                </a>
              </div>

              {/* 3 Partner Value Highlights (Clean, without Weekly$ card) */}
              <div className="subpage-hero-stats-row partners-stats-row">
                <div className="subpage-stat-card">
                  <div className="subpage-stat-num">100<span>%</span></div>
                  <div className="subpage-stat-label">Independent Autonomy</div>
                </div>
                <div className="subpage-stat-card">
                  <div className="subpage-stat-num">Vetted</div>
                  <div className="subpage-stat-label">Commercial Accounts</div>
                </div>
                <div className="subpage-stat-card">
                  <div className="subpage-stat-num">0<span>$</span></div>
                  <div className="subpage-stat-label">Marketing Cost to You</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Video Showcase */}
            <div className="subpage-hero-media partners-hero-media">
              <div className="partners-video-card">
                
                {/* Branded Player Top Bar */}
                <div className="partners-video-bar">
                  <div className="video-bar-left">
                    <span className="partners-pulse-red" />
                    <span className="video-bar-title">THE MIROLA PARTNER EXPERIENCE</span>
                  </div>
                  <button 
                    type="button" 
                    className="video-expand-btn"
                    onClick={() => setVideoModalOpen(true)}
                    title="Watch in Theater Mode"
                  >
                    <Maximize2 size={15} />
                    <span>Expand</span>
                  </button>
                </div>

                {/* 16:9 YouTube Embed (Using the user's requested video link: https://youtu.be/V3phteGqDds) */}
                <div className="partners-video-frame">
                  <iframe 
                    src="https://www.youtube-nocookie.com/embed/V3phteGqDds?rel=0&modestbranding=1" 
                    title="Partner With Mirola - Grow With Mirola Cleaning Services"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="partners-iframe-player"
                  />
                </div>

                {/* Player Bottom Footer Pill */}
                <div className="partners-video-footer">
                  <Sparkles size={16} color="#c90000" />
                  <p className="video-footer-text">
                    Watch how solo cleaning specialists and established companies scale with Mirola.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. CORE PARTNER CATEGORIES ("OUR PARTNERS INCLUDE") */}
      <section className="subpage-white-section partners-categories-section">
        <div className="subpage-container">
          
          <div className="subpage-section-header text-center" style={{ maxWidth: '820px', margin: '0 auto 48px' }}>
            <div className="subpage-light-badge">
              <span className="subpage-pulse-dot" />
              <span>WHO WE WORK WITH</span>
            </div>
            <h2 className="partners-section-title">
              Our Partners Include
            </h2>
            <p className="partners-section-subtitle">
              Whether you are an ambitious solo operator looking to fill open calendar hours or an established cleaning company ready to scale multi-facility capacity, Mirola offers tailored commercial opportunities.
            </p>
          </div>

          <div className="partners-tracks-grid">
            
            {/* Card 1: Independent Cleaners */}
            <div className="partner-track-card independent-track">
              <div className="partner-track-header">
                <div className="partner-track-icon-ring">
                  <UserCheck size={28} />
                </div>
                <div className="partner-track-badge">Solo Cleaning Professionals</div>
              </div>

              <h3 className="partner-track-title">Independent Cleaners</h3>
              <p className="partner-track-lead">
                Solo cleaning professionals who provide services independently.
              </p>

              <div className="partner-track-divider" />

              <div className="partner-track-body">
                <p className="partner-track-desc">
                  Are you a skilled cleaning technician with an eye for detail? Partnering with Mirola allows you to secure steady commercial facility accounts without spending thousands of dollars or hours searching for clients.
                </p>

                <div className="partner-perks-list">
                  <div className="perk-item">
                    <CheckCircle2 size={17} className="perk-check-icon" />
                    <span><strong>Full Autonomy:</strong> Set your schedule and choose accounts that fit your routine.</span>
                  </div>
                  <div className="perk-item">
                    <CheckCircle2 size={17} className="perk-check-icon" />
                    <span><strong>Pre-Scoped Contracts:</strong> Clear checklist scopes without haggling with building managers.</span>
                  </div>
                  <div className="perk-item">
                    <CheckCircle2 size={17} className="perk-check-icon" />
                    <span><strong>Reliable Direct Payouts:</strong> Predictable direct deposit disbursements.</span>
                  </div>
                  <div className="perk-item">
                    <CheckCircle2 size={17} className="perk-check-icon" />
                    <span><strong>Protocol Guidance:</strong> Support on commercial chemical handling and equipment.</span>
                  </div>
                </div>
              </div>

              <div className="partner-track-footer">
                <button 
                  type="button" 
                  className="partner-apply-btn"
                  onClick={() => scrollToApplication('individual')}
                >
                  <span>Apply as Independent Cleaner</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Card 2: Cleaning Companies */}
            <div className="partner-track-card company-track">
              <div className="partner-track-header">
                <div className="partner-track-icon-ring">
                  <Building2 size={28} />
                </div>
                <div className="partner-track-badge">Subcontracting Partners</div>
              </div>

              <h3 className="partner-track-title">Cleaning Companies</h3>
              <p className="partner-track-lead">
                Established cleaning businesses that work with Mirola as subcontracting partners.
              </p>

              <div className="partner-track-divider" />

              <div className="partner-track-body">
                <p className="partner-track-desc">
                  Do you manage trained cleaning crews with capacity to take on larger commercial buildings? Subcontract with Mirola to tap into high-square-footage corporate, medical, and warehouse facilities across the region.
                </p>

                <div className="partner-perks-list">
                  <div className="perk-item">
                    <CheckCircle2 size={17} className="perk-check-icon" />
                    <span><strong>Scale Crew Utilization:</strong> Fill downtime with recurring commercial facility scopes.</span>
                  </div>
                  <div className="perk-item">
                    <CheckCircle2 size={17} className="perk-check-icon" />
                    <span><strong>Route-Dense Opportunities:</strong> Regional contracts concentrated in key business corridors.</span>
                  </div>
                  <div className="perk-item">
                    <CheckCircle2 size={17} className="perk-check-icon" />
                    <span><strong>Zero Customer Acquisition Cost:</strong> We manage client acquisition, surveys, and billing.</span>
                  </div>
                  <div className="perk-item">
                    <CheckCircle2 size={17} className="perk-check-icon" />
                    <span><strong>Enterprise Volume Expansion:</strong> Proven contractors receive priority on large multi-site contracts.</span>
                  </div>
                </div>
              </div>

              <div className="partner-track-footer">
                <button 
                  type="button" 
                  className="partner-apply-btn"
                  onClick={() => scrollToApplication('company')}
                >
                  <span>Apply as Cleaning Company</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

          </div>

          {/* Autonomy Callout Banner */}
          <div className="partners-autonomy-banner">
            <div className="autonomy-banner-icon">
              <ShieldCheck size={28} />
            </div>
            <div className="autonomy-banner-text">
              <h4 className="autonomy-banner-title">
                Partners remain independent while gaining access to suitable cleaning opportunities through Mirola.
              </h4>
              <p className="autonomy-banner-desc">
                We believe in mutual respect and empowering local cleaning professionals. You maintain complete control of your independent business structure, staffing, and operations.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. WHY PARTNER WITH MIROLA (PILLARS OF SUCCESS) */}
      <section className="subpage-light-section partners-benefits-section">
        <div className="subpage-container">
          
          <div className="subpage-section-header text-center" style={{ maxWidth: '800px', margin: '0 auto 48px' }}>
            <div className="subpage-light-badge">
              <Sparkles size={13} color="#c90000" />
              <span>THE MIROLA ADVANTAGE</span>
            </div>
            <h2 className="partners-section-title">
              Why Cleaning Professionals Choose Mirola
            </h2>
            <p className="partners-section-subtitle">
              Building a cleaning business is tough when you have to balance bidding, marketing, collections, and operations. We remove the friction so you can focus on service excellence.
            </p>
          </div>

          <div className="partner-benefits-grid">
            
            <div className="benefit-card">
              <div className="benefit-icon-box">
                <DollarSign size={24} />
              </div>
              <h4 className="benefit-title">Guaranteed On-Time Payments</h4>
              <p className="benefit-desc">
                Never chase an unpaid corporate invoice again. Enjoy dependable, transparent weekly or bi-weekly direct deposit payouts.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-box">
                <TrendingUp size={24} />
              </div>
              <h4 className="benefit-title">Zero Marketing Expenses</h4>
              <p className="benefit-desc">
                We invest heavily in commercial business development, property walkthroughs, and client contracts so you don’t have to.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-box">
                <Clock size={24} />
              </div>
              <h4 className="benefit-title">Flexible Schedule & Autonomy</h4>
              <p className="benefit-desc">
                Accept only the contracts, facility types, and shifts (evening, weekend, or day porter) that match your availability.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-box">
                <Building2 size={24} />
              </div>
              <h4 className="benefit-title">Premium Commercial Accounts</h4>
              <p className="benefit-desc">
                Gain access to audited corporate offices, pediatric academies, surgical suites, and multi-tenant commercial parks.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-box">
                <Layers size={24} />
              </div>
              <h4 className="benefit-title">Clear Standardized Scopes</h4>
              <p className="benefit-desc">
                Every facility walkthrough produces an exact digital checklist scope of work. No ambiguity about expectations.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-box">
                <MapPin size={24} />
              </div>
              <h4 className="benefit-title">Route Density & Proximity</h4>
              <p className="benefit-desc">
                We prioritize matching you with facilities close to your home base or existing commercial route to save commute time.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS: 4-STEP PARTNERSHIP ONBOARDING */}
      <section className="subpage-white-section partners-process-section">
        <div className="subpage-container">
          
          <div className="subpage-section-header text-center" style={{ maxWidth: '800px', margin: '0 auto 48px' }}>
            <div className="subpage-light-badge">
              <CalendarCheck size={13} color="#c90000" />
              <span>SIMPLE ONBOARDING</span>
            </div>
            <h2 className="partners-section-title">
              How the Partnership Works
            </h2>
            <p className="partners-section-subtitle">
              We make it straightforward to join our network, get verified, and start servicing commercial facilities.
            </p>
          </div>

          <div className="partner-steps-grid">
            
            <div className="partner-step-card">
              <div className="step-num-pill">01</div>
              <h4 className="step-title">Submit Application</h4>
              <p className="step-desc">
                Select your track below (Individual Cleaner or Cleaning Company) and complete your dedicated partner form.
              </p>
            </div>

            <div className="partner-step-card">
              <div className="step-num-pill">02</div>
              <h4 className="step-title">Vetting & Alignment</h4>
              <p className="step-desc">
                Our partner operations team conducts a 15-minute phone alignment, reviews credentials, and confirms insurance.
              </p>
            </div>

            <div className="partner-step-card">
              <div className="step-num-pill">03</div>
              <h4 className="step-title">Facility Matching</h4>
              <p className="step-desc">
                When a commercial walkthrough or contract opens in your coverage zone, we review the scope and present the opportunity.
              </p>
            </div>

            <div className="partner-step-card">
              <div className="step-num-pill">04</div>
              <h4 className="step-title">Deliver & Get Paid</h4>
              <p className="step-desc">
                Deliver top-tier cleaning service according to protocol, receive scheduled weekly payments, and expand your portfolio.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. DEDICATED PARTNER APPLICATION FORMS SECTION ("BECOME A MIROLA PARTNER") */}
      <section className="partners-form-section" id="partner-application">
        <div className="subpage-container">
          
          <div className="partners-form-wrapper">
            
            {/* Left Column: Form Intro & Trust Points */}
            <div className="partners-form-intro">
              <div className="subpage-badge">
                <span className="subpage-pulse-dot" />
                <span>BECOME A MIROLA PARTNER</span>
              </div>
              <h2 className="partners-form-title">
                Ready to Expand Your Cleaning Opportunities?
              </h2>
              <p className="partners-form-desc">
                Are you an independent cleaner or do you own a cleaning company? Partner with Mirola and explore new cleaning opportunities. Select your partner category and submit your application below.
              </p>

              <div className="partner-form-trust-points">
                <div className="trust-point">
                  <CheckCircle2 size={16} color="#c90000" />
                  <span>Two distinct application paths for individuals & companies</span>
                </div>
                <div className="trust-point">
                  <CheckCircle2 size={16} color="#c90000" />
                  <span>No upfront fees, commissions, or bidding charges</span>
                </div>
                <div className="trust-point">
                  <CheckCircle2 size={16} color="#c90000" />
                  <span>Direct response from partner dispatch within 24–48 hours</span>
                </div>
                <div className="trust-point">
                  <CheckCircle2 size={16} color="#c90000" />
                  <span>100% confidential and secure application</span>
                </div>
              </div>

              <div className="partner-direct-help-box">
                <h4 className="direct-help-title">Prefer to talk directly?</h4>
                <p className="direct-help-text">
                  Our regional partner dispatch director is available to answer questions:
                </p>
                <a href={`tel:${CONTACT_INFO.phoneTel}`} className="direct-help-link">
                  <Phone size={15} />
                  <span>{CONTACT_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Distinct Forms with Tab Navigation */}
            <div className="contact-form-card partner-form-card">
              
              {/* SUCCESS CONFIRMATION STATE */}
              {submittedType ? (
                <div className="contact-success-box partner-success-box">
                  <div className="success-icon-ring">
                    <Check size={36} />
                  </div>
                  <h3 className="success-title">
                    {submittedType === 'individual' ? 'Solo Cleaner Application Received!' : 'Subcontractor Application Received!'}
                  </h3>
                  <p className="success-desc">
                    Thank you, <strong>{submittedType === 'individual' ? indFullName : corpContactName}</strong>. Your partner application has been dispatched directly to our facility director and partner onboarding team.
                  </p>
                  
                  <div className="success-meta-card">
                    <div className="meta-row">
                      <span className="meta-label">Application Type:</span>
                      <span className="meta-value">
                        {submittedType === 'individual' ? 'Independent Cleaner (Solo Professional)' : `Cleaning Company (${corpCompanyName})`}
                      </span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">Primary Contact:</span>
                      <span className="meta-value">
                        {submittedType === 'individual' ? indFullName : `${corpContactName} (${corpContactTitle})`}
                      </span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">Confirmation Email:</span>
                      <span className="meta-value">{submittedType === 'individual' ? indEmail : corpEmail}</span>
                    </div>
                  </div>

                  <p className="success-next-steps">
                    <strong>Next Steps:</strong> A member of our partner operations team will reach out via phone or email within 24–48 hours for a brief alignment review.
                  </p>

                  <div className="success-actions">
                    <button 
                      type="button" 
                      className="subpage-btn-primary" 
                      onClick={handleResetForm}
                    >
                      Submit Another Application
                    </button>
                  </div>
                </div>
              ) : (
                <div className="partner-forms-container">
                  
                  {/* TAB SWITCHER: INDIVIDUAL vs COMPANY */}
                  <div className="partner-form-tabs-header">
                    <div className="partner-tabs-label">Choose your partner application:</div>
                    <div className="partner-form-tab-nav">
                      <button
                        type="button"
                        className={`partner-tab-btn ${activeTab === 'individual' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('individual'); setErrorMessage(null); }}
                      >
                        <UserCheck size={18} />
                        <div className="tab-btn-content">
                          <span className="tab-title">Individual Cleaner</span>
                          <span className="tab-sub">Solo professional application</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        className={`partner-tab-btn ${activeTab === 'company' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('company'); setErrorMessage(null); }}
                      >
                        <Building2 size={18} />
                        <div className="tab-btn-content">
                          <span className="tab-title">Cleaning Company</span>
                          <span className="tab-sub">Subcontractor application</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* ======================================================== */}
                  {/* FORM A: INDIVIDUAL CLEANER (SOLO PROFESSIONAL)           */}
                  {/* ======================================================== */}
                  {activeTab === 'individual' && (
                    <form onSubmit={handleIndividualSubmit} className="partner-application-form individual-form">
                      
                      <div className="form-heading-row">
                        <div className="form-card-heading">
                          Individual Cleaner Application
                        </div>
                        <span className="form-card-tag individual-tag">Solo Professional</span>
                      </div>
                      <p className="form-card-sub">
                        For independent cleaning technicians and solo janitorial specialists seeking commercial assignments.
                      </p>

                      <div className="contact-form-grid">
                        
                        {/* Full Name */}
                        <div className="contact-form-field">
                          <label htmlFor="ind-fullname">
                            Full Name <span className="field-required">*</span>
                          </label>
                          <input 
                            type="text" 
                            id="ind-fullname"
                            required
                            placeholder="e.g. Marcus Miller"
                            value={indFullName}
                            onChange={(e) => setIndFullName(e.target.value)}
                            className="contact-form-input"
                          />
                        </div>

                        {/* Email Address */}
                        <div className="contact-form-field">
                          <label htmlFor="ind-email">
                            Email Address <span className="field-required">*</span>
                          </label>
                          <input 
                            type="email" 
                            id="ind-email"
                            required
                            placeholder="e.g. marcus@gmail.com"
                            value={indEmail}
                            onChange={(e) => setIndEmail(e.target.value)}
                            className="contact-form-input"
                          />
                        </div>

                        {/* Direct Mobile Phone */}
                        <div className="contact-form-field">
                          <label htmlFor="ind-phone">
                            Mobile Phone Number <span className="field-required">*</span>
                          </label>
                          <input 
                            type="tel" 
                            id="ind-phone"
                            required
                            placeholder="e.g. (732) 555-0199"
                            value={indPhone}
                            onChange={(e) => setIndPhone(e.target.value)}
                            className="contact-form-input"
                          />
                        </div>

                        {/* Service City / Coverage Area */}
                        <div className="contact-form-field">
                          <label htmlFor="ind-location">
                            City & State / Service Area <span className="field-required">*</span>
                          </label>
                          <input 
                            type="text" 
                            id="ind-location"
                            required
                            placeholder="e.g. Somerset, New Brunswick, Edison, NJ"
                            value={indLocation}
                            onChange={(e) => setIndLocation(e.target.value)}
                            className="contact-form-input"
                          />
                        </div>

                        {/* Commercial Experience */}
                        <div className="contact-form-field">
                          <label htmlFor="ind-experience">
                            Commercial Cleaning Experience
                          </label>
                          <select 
                            id="ind-experience"
                            value={indExperience}
                            onChange={(e) => setIndExperience(e.target.value)}
                            className="contact-form-select"
                          >
                            <option value="Less than 1 year">Less than 1 year</option>
                            <option value="1 - 3 years">1 - 3 years</option>
                            <option value="3 - 5 years">3 - 5 years</option>
                            <option value="5+ years">5+ years experienced</option>
                          </select>
                        </div>

                        {/* Reliable Transportation */}
                        <div className="contact-form-field">
                          <label htmlFor="ind-transportation">
                            Reliable Transportation
                          </label>
                          <select 
                            id="ind-transportation"
                            value={indTransportation}
                            onChange={(e) => setIndTransportation(e.target.value)}
                            className="contact-form-select"
                          >
                            <option value="Yes — Own Reliable Vehicle">Yes — Own Reliable Vehicle</option>
                            <option value="Public Transit / Rideshare">Public Transit / Rideshare</option>
                            <option value="In Process of Securing Vehicle">In Process of Securing Vehicle</option>
                          </select>
                        </div>

                        {/* Equipment Owned */}
                        <div className="contact-form-field full-span">
                          <label htmlFor="ind-equipment">
                            Cleaning Equipment You Currently Own
                          </label>
                          <select 
                            id="ind-equipment"
                            value={indEquipmentOwned}
                            onChange={(e) => setIndEquipmentOwned(e.target.value)}
                            className="contact-form-select"
                          >
                            <option value="Commercial HEPA Vacuum & Basic Janitorial Kit">Commercial HEPA Vacuum & Basic Janitorial Kit</option>
                            <option value="Full Equipment Setup (Vacuum, Dual Bucket, Buffer)">Full Equipment Setup (Vacuum, Dual Bucket, Buffer)</option>
                            <option value="Standard Supplies Only (Mop, Microfiber, Caddy)">Standard Supplies Only (Mop, Microfiber, Caddy)</option>
                            <option value="None / Would Need Facility Provided Equipment">None / Would Need Facility Provided Equipment</option>
                          </select>
                        </div>

                        {/* General Liability Insurance */}
                        <div className="contact-form-field full-span">
                          <label htmlFor="ind-insurance">
                            General Liability Insurance Status
                          </label>
                          <select 
                            id="ind-insurance"
                            value={indInsurance}
                            onChange={(e) => setIndInsurance(e.target.value)}
                            className="contact-form-select"
                          >
                            <option value="General Liability Insured">Yes — Currently Insured (General Liability)</option>
                            <option value="Fully Insured & Bonded">Fully Insured & Bonded</option>
                            <option value="In Process of Getting Insured">In Process of Getting Policy</option>
                            <option value="Need Guidance on Insurance">Not Insured Yet / Need Guidance</option>
                          </select>
                        </div>

                        {/* Shift Availability */}
                        <div className="contact-form-field full-span">
                          <label className="partner-field-label">
                            Preferred Shift Availability (Select all that apply):
                          </label>
                          <div className="partner-services-checklist">
                            {SHIFT_OPTIONS.map(shift => {
                              const isChecked = indShifts.includes(shift);
                              return (
                                <button
                                  type="button"
                                  key={shift}
                                  className={`partner-service-pill ${isChecked ? 'selected' : ''}`}
                                  onClick={() => handleIndShiftToggle(shift)}
                                >
                                  <div className="service-pill-checkbox">
                                    {isChecked && <Check size={13} strokeWidth={3} />}
                                  </div>
                                  <span className="service-pill-label">{shift}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Individual Services Checklist */}
                        <div className="contact-form-field full-span">
                          <label className="partner-field-label">
                            Cleaning Services You Can Deliver:
                          </label>
                          <div className="partner-services-checklist">
                            {INDIVIDUAL_SERVICES.map(service => {
                              const isChecked = indServices.includes(service);
                              return (
                                <button
                                  type="button"
                                  key={service}
                                  className={`partner-service-pill ${isChecked ? 'selected' : ''}`}
                                  onClick={() => handleIndServiceToggle(service)}
                                >
                                  <div className="service-pill-checkbox">
                                    {isChecked && <Check size={13} strokeWidth={3} />}
                                  </div>
                                  <span className="service-pill-label">{service}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Background & Notes */}
                        <div className="contact-form-field full-span">
                          <label htmlFor="ind-notes">
                            Brief Background & Availability Notes (Optional)
                          </label>
                          <textarea 
                            id="ind-notes"
                            rows={3}
                            placeholder="Tell us about the types of buildings you have cleaned, your preferred hours per week, or any questions you have."
                            value={indNotes}
                            onChange={(e) => setIndNotes(e.target.value)}
                            className="contact-form-textarea"
                          />
                        </div>

                        {/* Error & Fallback */}
                        {errorMessage && (
                          <div className="contact-error-box full-span">
                            <AlertCircle size={18} />
                            <div className="error-text-content">
                              <p>{errorMessage}</p>
                              {fallbackLinks && (
                                <div className="error-fallbacks">
                                  <a href={fallbackLinks.gmailUrl} target="_blank" rel="noopener noreferrer" className="fallback-btn">
                                    Open in Gmail Draft
                                  </a>
                                  <a href={fallbackLinks.mailtoUrl} className="fallback-btn">
                                    Send via Default Email
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Submit Button */}
                        <div className="contact-form-field full-span">
                          <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="subpage-btn-primary form-submit-btn"
                            id="submit-individual-app-btn"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 size={18} className="animate-spin" />
                                <span>Submitting Solo Application...</span>
                              </>
                            ) : (
                              <>
                                <span>Submit Solo Cleaner Application</span>
                                <ArrowRight size={18} />
                              </>
                            )}
                          </button>
                          
                          <div className="form-privacy-note">
                            <ShieldCheck size={14} color="#16a34a" />
                            <span>You remain 100% independent. No contracts until you accept a facility scope.</span>
                          </div>
                        </div>

                      </div>

                    </form>
                  )}

                  {/* ======================================================== */}
                  {/* FORM B: CLEANING COMPANY (SUBCONTRACTING PARTNER)        */}
                  {/* ======================================================== */}
                  {activeTab === 'company' && (
                    <form onSubmit={handleCompanySubmit} className="partner-application-form company-form">
                      
                      <div className="form-heading-row">
                        <div className="form-card-heading">
                          Cleaning Company Subcontractor Application
                        </div>
                        <span className="form-card-tag company-tag">Subcontractor Track</span>
                      </div>
                      <p className="form-card-sub">
                        For established commercial cleaning businesses seeking high-square-footage subcontracting contracts.
                      </p>

                      <div className="contact-form-grid">
                        
                        {/* Company Legal Business Name */}
                        <div className="contact-form-field">
                          <label htmlFor="corp-name">
                            Company Legal Name <span className="field-required">*</span>
                          </label>
                          <input 
                            type="text" 
                            id="corp-name"
                            required
                            placeholder="e.g. Apex Commercial Janitorial LLC"
                            value={corpCompanyName}
                            onChange={(e) => setCorpCompanyName(e.target.value)}
                            className="contact-form-input"
                          />
                        </div>

                        {/* Primary Contact Name */}
                        <div className="contact-form-field">
                          <label htmlFor="corp-contact">
                            Primary Contact Person <span className="field-required">*</span>
                          </label>
                          <input 
                            type="text" 
                            id="corp-contact"
                            required
                            placeholder="e.g. Robert Vance"
                            value={corpContactName}
                            onChange={(e) => setCorpContactName(e.target.value)}
                            className="contact-form-input"
                          />
                        </div>

                        {/* Contact Title */}
                        <div className="contact-form-field">
                          <label htmlFor="corp-title">
                            Contact Title / Role <span className="field-required">*</span>
                          </label>
                          <input 
                            type="text" 
                            id="corp-title"
                            required
                            placeholder="e.g. Managing Partner, Director of Ops"
                            value={corpContactTitle}
                            onChange={(e) => setCorpContactTitle(e.target.value)}
                            className="contact-form-input"
                          />
                        </div>

                        {/* Corporate Email */}
                        <div className="contact-form-field">
                          <label htmlFor="corp-email">
                            Corporate Email Address <span className="field-required">*</span>
                          </label>
                          <input 
                            type="email" 
                            id="corp-email"
                            required
                            placeholder="e.g. operations@apexjanitorial.com"
                            value={corpEmail}
                            onChange={(e) => setCorpEmail(e.target.value)}
                            className="contact-form-input"
                          />
                        </div>

                        {/* Direct Business Phone */}
                        <div className="contact-form-field">
                          <label htmlFor="corp-phone">
                            Direct Business Phone <span className="field-required">*</span>
                          </label>
                          <input 
                            type="tel" 
                            id="corp-phone"
                            required
                            placeholder="e.g. (732) 555-0188"
                            value={corpPhone}
                            onChange={(e) => setCorpPhone(e.target.value)}
                            className="contact-form-input"
                          />
                        </div>

                        {/* Headquarters & Counties Serviced */}
                        <div className="contact-form-field">
                          <label htmlFor="corp-counties">
                            Headquarters & Coverage Counties <span className="field-required">*</span>
                          </label>
                          <input 
                            type="text" 
                            id="corp-counties"
                            required
                            placeholder="e.g. Somerset, Middlesex, Union, Essex, NJ"
                            value={corpCounties}
                            onChange={(e) => setCorpCounties(e.target.value)}
                            className="contact-form-input"
                          />
                        </div>

                        {/* Years in Business */}
                        <div className="contact-form-field">
                          <label htmlFor="corp-years">
                            Years in Commercial Operation
                          </label>
                          <select 
                            id="corp-years"
                            value={corpYearsInBusiness}
                            onChange={(e) => setCorpYearsInBusiness(e.target.value)}
                            className="contact-form-select"
                          >
                            <option value="1 - 2 years established">1 - 2 years established</option>
                            <option value="3 - 5 years established">3 - 5 years established</option>
                            <option value="5 - 10 years established">5 - 10 years established</option>
                            <option value="10+ years established">10+ years established</option>
                          </select>
                        </div>

                        {/* Active Cleaning Staff / Crew Size */}
                        <div className="contact-form-field">
                          <label htmlFor="corp-crew">
                            Active Cleaning Crew Size
                          </label>
                          <select 
                            id="corp-crew"
                            value={corpCrewSize}
                            onChange={(e) => setCorpCrewSize(e.target.value)}
                            className="contact-form-select"
                          >
                            <option value="2 - 5 Active Crew Members">2 - 5 Crew Members</option>
                            <option value="6 - 15 Active Crew Members">6 - 15 Crew Members</option>
                            <option value="16 - 30 Active Cleaners">16 - 30 Cleaners</option>
                            <option value="30+ Industrial Crew">30+ Industrial / Commercial Staff</option>
                          </select>
                        </div>

                        {/* General Liability Insurance Limit */}
                        <div className="contact-form-field">
                          <label htmlFor="corp-insurance-limit">
                            General Liability Limit
                          </label>
                          <select 
                            id="corp-insurance-limit"
                            value={corpInsuranceLimit}
                            onChange={(e) => setCorpInsuranceLimit(e.target.value)}
                            className="contact-form-select"
                          >
                            <option value="$1,000,000 General Liability">$1,000,000 General Liability</option>
                            <option value="$2,000,000+ General Liability">$2,000,000+ General Liability</option>
                            <option value="Commercial Umbrella & Bonded">Commercial Umbrella & Bonded</option>
                            <option value="In Process / Renewing Policy">In Process / Renewing Policy</option>
                          </select>
                        </div>

                        {/* Workers' Comp Coverage */}
                        <div className="contact-form-field">
                          <label htmlFor="corp-workers-comp">
                            Workers' Compensation Status
                          </label>
                          <select 
                            id="corp-workers-comp"
                            value={corpWorkersComp}
                            onChange={(e) => setCorpWorkersComp(e.target.value)}
                            className="contact-form-select"
                          >
                            <option value="Active Workers' Comp in Place">Active Workers' Comp Policy in Place</option>
                            <option value="Exempt / Owner-Operated Entity">Exempt / Owner-Operated Entity</option>
                            <option value="In Process of Adding Policy">In Process of Adding Policy</option>
                          </select>
                        </div>

                        {/* Estimated Monthly Capacity (Sq Ft) */}
                        <div className="contact-form-field full-span">
                          <label htmlFor="corp-capacity">
                            Estimated Monthly Subcontracting Capacity (Square Footage)
                          </label>
                          <select 
                            id="corp-capacity"
                            value={corpMonthlyCapacity}
                            onChange={(e) => setCorpMonthlyCapacity(e.target.value)}
                            className="contact-form-select"
                          >
                            <option value="Up to 25,000 sq ft">Up to 25,000 sq ft</option>
                            <option value="25,000 - 75,000 sq ft">25,000 - 75,000 sq ft</option>
                            <option value="75,000 - 150,000 sq ft">75,000 - 150,000 sq ft</option>
                            <option value="150,000+ sq ft Multi-Site">150,000+ sq ft Multi-Site Regional</option>
                          </select>
                        </div>

                        {/* Commercial Capabilities Checklist */}
                        <div className="contact-form-field full-span">
                          <label className="partner-field-label">
                            Commercial Subcontracting Capabilities:
                          </label>
                          <div className="partner-services-checklist">
                            {COMPANY_CAPABILITIES.map(cap => {
                              const isChecked = corpCapabilities.includes(cap);
                              return (
                                <button
                                  type="button"
                                  key={cap}
                                  className={`partner-service-pill ${isChecked ? 'selected' : ''}`}
                                  onClick={() => handleCorpCapabilityToggle(cap)}
                                >
                                  <div className="service-pill-checkbox">
                                    {isChecked && <Check size={13} strokeWidth={3} />}
                                  </div>
                                  <span className="service-pill-label">{cap}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Heavy Equipment Checklist */}
                        <div className="contact-form-field full-span">
                          <label className="partner-field-label">
                            Heavy Commercial Equipment Owned:
                          </label>
                          <div className="partner-services-checklist">
                            {COMPANY_EQUIPMENT_OPTIONS.map(equip => {
                              const isChecked = corpEquipment.includes(equip);
                              return (
                                <button
                                  type="button"
                                  key={equip}
                                  className={`partner-service-pill ${isChecked ? 'selected' : ''}`}
                                  onClick={() => handleCorpEquipmentToggle(equip)}
                                >
                                  <div className="service-pill-checkbox">
                                    {isChecked && <Check size={13} strokeWidth={3} />}
                                  </div>
                                  <span className="service-pill-label">{equip}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Portfolio & Summary */}
                        <div className="contact-form-field full-span">
                          <label htmlFor="corp-notes">
                            Company Portfolio & Operating Summary (Optional)
                          </label>
                          <textarea 
                            id="corp-notes"
                            rows={3}
                            placeholder="Provide a brief summary of notable facility accounts, OSHA/safety credentials, or specific building sectors your company excels at."
                            value={corpNotes}
                            onChange={(e) => setCorpNotes(e.target.value)}
                            className="contact-form-textarea"
                          />
                        </div>

                        {/* Error & Fallback */}
                        {errorMessage && (
                          <div className="contact-error-box full-span">
                            <AlertCircle size={18} />
                            <div className="error-text-content">
                              <p>{errorMessage}</p>
                              {fallbackLinks && (
                                <div className="error-fallbacks">
                                  <a href={fallbackLinks.gmailUrl} target="_blank" rel="noopener noreferrer" className="fallback-btn">
                                    Open in Gmail Draft
                                  </a>
                                  <a href={fallbackLinks.mailtoUrl} className="fallback-btn">
                                    Send via Default Email
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Submit Button */}
                        <div className="contact-form-field full-span">
                          <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="subpage-btn-primary form-submit-btn"
                            id="submit-company-app-btn"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 size={18} className="animate-spin" />
                                <span>Submitting Subcontractor Application...</span>
                              </>
                            ) : (
                              <>
                                <span>Submit Subcontractor Application</span>
                                <ArrowRight size={18} />
                              </>
                            )}
                          </button>
                          
                          <div className="form-privacy-note">
                            <ShieldCheck size={14} color="#16a34a" />
                            <span>Confidential commercial application. Standard Master Subcontract Agreement issued upon mutual walkthrough review.</span>
                          </div>
                        </div>

                      </div>

                    </form>
                  )}

                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* 6. PARTNER FAQ ACCORDION */}
      <section className="subpage-white-section partners-faq-section">
        <div className="subpage-container">
          
          <div className="subpage-section-header text-center" style={{ maxWidth: '800px', margin: '0 auto 44px' }}>
            <div className="subpage-light-badge">
              <HelpCircle size={13} color="#c90000" />
              <span>COMMONLY ASKED QUESTIONS</span>
            </div>
            <h2 className="partners-section-title">
              Frequently Asked Questions About Partnering
            </h2>
            <p className="partners-section-subtitle">
              Have questions about how we collaborate? Here are clear, upfront answers to help you get started.
            </p>
          </div>

          <div className="partners-faq-accordion" style={{ maxWidth: '860px', margin: '0 auto' }}>
            {partnerFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className={`partner-faq-item ${isOpen ? 'open' : ''}`}>
                  <button 
                    type="button" 
                    className="partner-faq-question"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronRight size={18} className={`faq-chevron ${isOpen ? 'rotate' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="partner-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. FULLSCREEN / THEATER VIDEO MODAL */}
      {videoModalOpen && (
        <div 
          className="video-modal-backdrop"
          onClick={() => setVideoModalOpen(false)}
        >
          <div 
            className="video-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="video-modal-header">
              <div className="modal-header-left">
                <span className="partners-pulse-red" />
                <h3 className="modal-header-title">
                  Partner With Mirola — Grow With Mirola Cleaning Services
                </h3>
              </div>
              <button 
                type="button"
                className="video-modal-close"
                onClick={() => setVideoModalOpen(false)}
                aria-label="Close video player"
              >
                <X size={20} />
              </button>
            </div>

            <div className="video-modal-body">
              <div className="modal-iframe-wrapper">
                <iframe 
                  src="https://www.youtube-nocookie.com/embed/V3phteGqDds?autoplay=1&rel=0&modestbranding=1" 
                  title="Partner With Mirola"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="modal-iframe-player"
                />
              </div>
              <div className="modal-video-caption">
                <p>
                  Mirola partners with independent cleaning professionals and cleaning companies to deliver reliable services to our clients. Partners remain independent while gaining access to suitable cleaning opportunities through Mirola.
                </p>
                <button 
                  type="button" 
                  className="subpage-btn-primary"
                  style={{ marginTop: '14px', padding: '10px 22px', fontSize: '13.5px' }}
                  onClick={() => {
                    setVideoModalOpen(false);
                    scrollToApplication(activeTab);
                  }}
                >
                  <span>Become a Partner</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
