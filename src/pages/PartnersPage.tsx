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
  Clock, 
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
  Maximize2
} from 'lucide-react';
import { CONTACT_INFO } from '../constants/contactInfo';
import { submitLeadDirect, generateEmailLinks } from '../services/formSubmission';
import type { AppRoute } from '../types/navigation';

interface PartnersPageProps {
  onNavigate: (path: AppRoute) => void;
  onOpenConsultation: () => void;
}

const PARTNER_CAPABILITIES = [
  'General Commercial Janitorial',
  'Floor Care, Stripping & Waxing',
  'Medical & Terminal Disinfection',
  'Commercial Carpet Extraction',
  'Post-Construction Cleanup',
  'Commercial Window & Glass Care',
  'Day Porter & Restroom Attendant'
];

export const PartnersPage: React.FC<PartnersPageProps> = ({ onNavigate }) => {
  // Video Modal State
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  
  // Partner Application Form State
  const [partnerType, setPartnerType] = useState<'independent' | 'company'>('independent');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('1 - 3 years');
  const [teamSize, setTeamSize] = useState('Solo Professional (1 Person)');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'General Commercial Janitorial'
  ]);
  const [insuranceStatus, setInsuranceStatus] = useState('General Liability Insured');
  const [notes, setNotes] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const scrollToApplication = (type?: 'independent' | 'company') => {
    if (type) {
      setPartnerType(type);
      if (type === 'company' && teamSize === 'Solo Professional (1 Person)') {
        setTeamSize('2 - 5 Crew Members');
      } else if (type === 'independent') {
        setTeamSize('Solo Professional (1 Person)');
      }
    }
    const formElement = document.getElementById('partner-application');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const partnerTypeLabel = partnerType === 'independent' 
      ? 'Independent Cleaner (Solo Professional)' 
      : 'Cleaning Company (Subcontracting Partner)';

    const payload = {
      fullName: fullName.trim(),
      company: partnerType === 'company' 
        ? (company.trim() || 'Established Cleaning Company') 
        : (company.trim() || 'Independent Cleaner (Solo)'),
      email: email.trim(),
      phone: phone.trim(),
      facilityTypes: selectedServices.length > 0 ? selectedServices : ['General Commercial Janitorial'],
      squareFootage: `Capacity: ${teamSize} | Exp: ${experience}`,
      message: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARTNER APPLICATION DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Partnership Category: ${partnerTypeLabel}
• Primary Location / Service Area: ${location.trim() || 'New Jersey Regional Area'}
• Years of Commercial Experience: ${experience}
• Team Size / Crew Capacity: ${teamSize}
• Insurance & Bonding Status: ${insuranceStatus}
• Core Capabilities: ${selectedServices.join(', ')}

EQUIPMENT, AVAILABILITY & ADDITIONAL NOTES:
${notes.trim() || 'None provided.'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      formType: 'Partner Application (/partners)'
    };

    const result = await submitLeadDirect(payload);
    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
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

  const handleResetForm = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
    setFallbackLinks(null);
    setFullName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setLocation('');
    setNotes('');
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
                  onClick={() => scrollToApplication()}
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

              {/* 4 Partner Value Highlights */}
              <div className="subpage-hero-stats-row partners-stats-row">
                <div className="subpage-stat-card">
                  <div className="subpage-stat-num">100<span>%</span></div>
                  <div className="subpage-stat-label">Independent Autonomy</div>
                </div>
                <div className="subpage-stat-card">
                  <div className="subpage-stat-num">Weekly<span>$</span></div>
                  <div className="subpage-stat-label">Direct Payouts</div>
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

                {/* 16:9 YouTube Embed */}
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
                    <span><strong>Guaranteed Direct Payouts:</strong> Weekly direct deposit so you never wait for client checks.</span>
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
                  onClick={() => scrollToApplication('independent')}
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
                Fill out our quick partner form below detailing your experience, services, coverage area, and capacity.
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

      {/* 5. INTERACTIVE PARTNER APPLICATION FORM ("BECOME A MIROLA PARTNER") */}
      <section className="partners-form-section" id="partner-application">
        <div className="subpage-container">
          
          <div className="partners-form-wrapper">
            
            <div className="partners-form-intro">
              <div className="subpage-badge">
                <span className="subpage-pulse-dot" />
                <span>BECOME A MIROLA PARTNER</span>
              </div>
              <h2 className="partners-form-title">
                Ready to Expand Your Cleaning Opportunities?
              </h2>
              <p className="partners-form-desc">
                Are you an independent cleaner or do you own a cleaning company? Partner with Mirola and explore new cleaning opportunities. Fill out the application below to get connected with our partner operations team.
              </p>

              <div className="partner-form-trust-points">
                <div className="trust-point">
                  <CheckCircle2 size={16} color="#c90000" />
                  <span>No upfront fees or subscription costs</span>
                </div>
                <div className="trust-point">
                  <CheckCircle2 size={16} color="#c90000" />
                  <span>Rapid response within 24–48 business hours</span>
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

            {/* Application Form Card */}
            <div className="contact-form-card partner-form-card">
              
              {isSubmitted ? (
                <div className="contact-success-box partner-success-box">
                  <div className="success-icon-ring">
                    <Check size={36} />
                  </div>
                  <h3 className="success-title">Partner Application Received!</h3>
                  <p className="success-desc">
                    Thank you, <strong>{fullName}</strong>. Your partner application has been dispatched directly to our facility director and partner onboarding team.
                  </p>
                  
                  <div className="success-meta-card">
                    <div className="meta-row">
                      <span className="meta-label">Applicant:</span>
                      <span className="meta-value">{fullName}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">Category:</span>
                      <span className="meta-value">
                        {partnerType === 'independent' ? 'Independent Solo Cleaner' : `Cleaning Company (${company || 'Subcontractor'})`}
                      </span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">Confirmation Email:</span>
                      <span className="meta-value">{email}</span>
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
                <form onSubmit={handleSubmit} className="partner-application-form">
                  
                  <div className="form-card-heading">
                    Partner Application
                  </div>
                  <p className="form-card-sub">
                    Select your partner track and provide your business credentials below.
                  </p>

                  {/* 1. Partner Category Selector Toggle */}
                  <div className="partner-type-toggle-group">
                    <label className="partner-field-label">I am applying as:</label>
                    <div className="partner-toggle-pills">
                      <button
                        type="button"
                        className={`partner-toggle-btn ${partnerType === 'independent' ? 'active' : ''}`}
                        onClick={() => {
                          setPartnerType('independent');
                          if (teamSize.includes('Crew')) setTeamSize('Solo Professional (1 Person)');
                        }}
                      >
                        <UserCheck size={18} />
                        <div className="toggle-btn-text">
                          <span className="toggle-main">Independent Cleaner</span>
                          <span className="toggle-sub">Solo professional</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        className={`partner-toggle-btn ${partnerType === 'company' ? 'active' : ''}`}
                        onClick={() => {
                          setPartnerType('company');
                          if (teamSize.includes('Solo')) setTeamSize('2 - 5 Crew Members');
                        }}
                      >
                        <Building2 size={18} />
                        <div className="toggle-btn-text">
                          <span className="toggle-main">Cleaning Company</span>
                          <span className="toggle-sub">Subcontracting team</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="contact-form-grid">
                    
                    {/* Full Name */}
                    <div className="contact-form-field">
                      <label htmlFor="partner-fullname">
                        Full Name / Primary Contact <span className="field-required">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="partner-fullname"
                        required
                        placeholder="e.g. Marcus Miller"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="contact-form-input"
                      />
                    </div>

                    {/* Company Name */}
                    <div className="contact-form-field">
                      <label htmlFor="partner-company">
                        {partnerType === 'company' ? (
                          <>Company Name <span className="field-required">*</span></>
                        ) : (
                          'Business / Trade Name (Optional)'
                        )}
                      </label>
                      <input 
                        type="text" 
                        id="partner-company"
                        required={partnerType === 'company'}
                        placeholder={partnerType === 'company' ? 'e.g. Apex Janitorial LLC' : 'e.g. Marcus Cleaning Services'}
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="contact-form-input"
                      />
                    </div>

                    {/* Email */}
                    <div className="contact-form-field">
                      <label htmlFor="partner-email">
                        Business Email Address <span className="field-required">*</span>
                      </label>
                      <input 
                        type="email" 
                        id="partner-email"
                        required
                        placeholder="e.g. marcus@apexclean.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="contact-form-input"
                      />
                    </div>

                    {/* Phone */}
                    <div className="contact-form-field">
                      <label htmlFor="partner-phone">
                        Direct Phone Number <span className="field-required">*</span>
                      </label>
                      <input 
                        type="tel" 
                        id="partner-phone"
                        required
                        placeholder="e.g. (732) 555-0199"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="contact-form-input"
                      />
                    </div>

                    {/* Service Area / Location */}
                    <div className="contact-form-field">
                      <label htmlFor="partner-location">
                        City & State / Service Area <span className="field-required">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="partner-location"
                        required
                        placeholder="e.g. Somerset, NJ (Middlesex/Somerset Counties)"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="contact-form-input"
                      />
                    </div>

                    {/* Experience Level */}
                    <div className="contact-form-field">
                      <label htmlFor="partner-experience">
                        Commercial Cleaning Experience
                      </label>
                      <select 
                        id="partner-experience"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="contact-form-select"
                      >
                        <option value="Less than 1 year">Less than 1 year</option>
                        <option value="1 - 3 years">1 - 3 years</option>
                        <option value="3 - 5 years">3 - 5 years</option>
                        <option value="5 - 10 years">5 - 10 years</option>
                        <option value="10+ years">10+ years established</option>
                      </select>
                    </div>

                    {/* Team Size / Crew Capacity */}
                    <div className="contact-form-field">
                      <label htmlFor="partner-teamsize">
                        Team Size / Crew Capacity
                      </label>
                      <select 
                        id="partner-teamsize"
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        className="contact-form-select"
                      >
                        <option value="Solo Professional (1 Person)">Solo Professional (1 Person)</option>
                        <option value="2 - 5 Crew Members">2 - 5 Crew Members</option>
                        <option value="6 - 15 Crew Members">6 - 15 Crew Members</option>
                        <option value="16+ Professional Cleaners">16+ Professional Staff</option>
                      </select>
                    </div>

                    {/* Insurance Status */}
                    <div className="contact-form-field">
                      <label htmlFor="partner-insurance">
                        Insurance & Bonding Status
                      </label>
                      <select 
                        id="partner-insurance"
                        value={insuranceStatus}
                        onChange={(e) => setInsuranceStatus(e.target.value)}
                        className="contact-form-select"
                      >
                        <option value="General Liability Insured">General Liability Insured</option>
                        <option value="Fully Insured & Bonded">Fully Insured & Bonded</option>
                        <option value="In Process of Getting Insured">In Process of Getting Insured</option>
                        <option value="Need Guidance on Insurance">Need Guidance / Help Getting Insured</option>
                      </select>
                    </div>

                    {/* Core Services Capabilities (Multi-select check pills) */}
                    <div className="contact-form-field full-span">
                      <label className="partner-field-label">
                        Services You Provide (Select all that apply):
                      </label>
                      <div className="partner-services-checklist">
                        {PARTNER_CAPABILITIES.map(service => {
                          const isChecked = selectedServices.includes(service);
                          return (
                            <button
                              type="button"
                              key={service}
                              className={`partner-service-pill ${isChecked ? 'selected' : ''}`}
                              onClick={() => handleServiceToggle(service)}
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

                    {/* Additional Notes, Equipment & Availability */}
                    <div className="contact-form-field full-span">
                      <label htmlFor="partner-notes">
                        Equipment, Shift Availability & Background Notes (Optional)
                      </label>
                      <textarea 
                        id="partner-notes"
                        rows={3}
                        placeholder="Tell us about the equipment you own (e.g. floor buffers, HEPA extractors), your preferred shifts (nightly/daytime), or any questions you have."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="contact-form-textarea"
                      />
                    </div>

                    {/* Error & Fallback Link Message */}
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
                        id="submit-partner-app-btn"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Submitting Partner Application...</span>
                          </>
                        ) : (
                          <>
                            <span>Become a Partner</span>
                            <ArrowRight size={18} />
                          </>
                        )}
                      </button>
                      
                      <div className="form-privacy-note">
                        <ShieldCheck size={14} color="#16a34a" />
                        <span>We respect your business autonomy. No obligations or contracts until you approve a scope.</span>
                      </div>
                    </div>

                  </div>

                </form>
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
                    scrollToApplication();
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
