import React, { useEffect, useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  Lock, 
  Phone, 
  Mail, 
  ArrowRight
} from 'lucide-react';
import { CONTACT_INFO } from '../constants/contactInfo';

export type LegalModalType = 'terms' | 'privacy' | 'compliance' | null;

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  type,
  onClose,
  onOpenConsultation
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'compliance'>('terms');

  // Synchronize active tab with initial type prop
  useEffect(() => {
    if (type) {
      setActiveTab(type);
    }
  }, [type]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (type) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div 
      className="legal-modal-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div 
        className="legal-modal-card" 
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="legal-modal-header">
          <div className="legal-header-meta">
            <div className="legal-brand-badge">
              <span className="badge-dot" />
              <span>LEGAL & REGULATORY ASSURANCE</span>
            </div>
            <h2 id="legal-modal-title" className="legal-modal-title">
              {activeTab === 'terms' && 'Commercial Terms of Service'}
              {activeTab === 'privacy' && 'Enterprise Privacy Policy'}
              {activeTab === 'compliance' && 'Safety, Environmental & Regulatory Standards'}
            </h2>
          </div>

          <button 
            type="button" 
            className="legal-close-btn"
            onClick={onClose}
            aria-label="Close legal modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="legal-modal-tabs">
          <button 
            type="button" 
            className={`legal-tab-btn ${activeTab === 'terms' ? 'active' : ''}`}
            onClick={() => setActiveTab('terms')}
          >
            <FileText size={16} />
            <span>Terms of Service</span>
          </button>
          <button 
            type="button" 
            className={`legal-tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            <Lock size={16} />
            <span>Privacy Policy</span>
          </button>
          <button 
            type="button" 
            className={`legal-tab-btn ${activeTab === 'compliance' ? 'active' : ''}`}
            onClick={() => setActiveTab('compliance')}
          >
            <ShieldCheck size={16} />
            <span>Safety Compliance</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="legal-modal-body">
          
          {/* TAB 1: TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="legal-content-wrap">
              <div className="legal-lead-callout">
                <p>
                  These Terms of Commercial Service govern all commercial cleaning, janitorial facility care, and specialized floor maintenance agreements provided by <strong>Mirola Cleaning Services LLC</strong> to commercial property operators, healthcare administrators, logistics managers, and institutional clients.
                </p>
                <div className="legal-effective-date">
                  Effective Date: September 2026 • Governing Law: State of New Jersey, USA
                </div>
              </div>

              <section className="legal-section">
                <h3>1. Commercial Scope of Work & Service Specifications</h3>
                <p>
                  Mirola Cleaning Services agrees to deliver the commercial janitorial, sanitization, and maintenance services set forth in the customized, signed Client Scope of Work agreement. Services are executed by uniformed, direct W-2 employees operating under designated shift hours (day porter, evening, or night route). Any modifications or emergency service requests outside the agreed schedule will be confirmed in writing.
                </p>
              </section>

              <section className="legal-section">
                <h3>2. Facility Access, Keycards & Physical Security Clearance</h3>
                <p>
                  The Client shall provide reasonable and secure access to the contracted property during scheduled service windows (including keycards, security desk check-in credentials, elevator passes, and designated janitorial closet access). Mirola crew members are bonded and instructed to adhere to all client security, alarm deactivation/reactivation, and lockup protocols.
                </p>
              </section>

              <section className="legal-section">
                <h3>3. 100% W-2 Workforce & Pre-Deployment Vetting</h3>
                <p>
                  Mirola maintains a strict zero-subcontracting standard for recurring core services. All cleaners and shift supervisors undergo:
                </p>
                <ul>
                  <li>Comprehensive 10-panel federal and multi-state criminal background screenings.</li>
                  <li>E-Verify identity and work authorization verification.</li>
                  <li>Mandatory 40-hour OSHA safety and chemical dwell-time certification prior to property deployment.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h3>4. 24-Hour Quality Satisfaction & Corrective Re-Clean SLA</h3>
                <p>
                  Quality assurance is the foundation of our client relationships. If any contracted area does not satisfy agreed cleanliness metrics, the Client shall notify Mirola operations within twelve (12) hours of shift completion. Mirola guarantees to dispatch a supervisory crew to perform a corrective re-clean within twenty-four (24) hours at zero additional cost.
                </p>
              </section>

              <section className="legal-section">
                <h3>5. Commercial Insurance, Bonding & Property Damage</h3>
                <p>
                  Mirola maintains comprehensive commercial general liability insurance ($2,000,000 aggregate), workers' compensation coverage, and employee fidelity bonding. In the unlikely event of accidental property damage caused by Mirola personnel, notice must be provided within twenty-four (24) business hours to initiate immediate claims investigation and reimbursement.
                </p>
              </section>

              <section className="legal-section">
                <h3>6. Commercial Billing, Invoicing & Terms</h3>
                <p>
                  Invoicing is generated on a recurring monthly cycle with standard Net-15 or Net-30 payment terms via electronic ACH transfer, check, or authorized corporate credit card. Any dispute regarding billing line items must be submitted in writing within ten (10) business days of invoice receipt.
                </p>
              </section>

              <section className="legal-section">
                <h3>7. Agreement Terms & 30-Day Cancellation</h3>
                <p>
                  Standard commercial agreements continue on a month-to-month or annual schedule as executed in the formal contract. Either party may terminate or alter recurring services with thirty (30) days prior written notice delivered to <code>mirolacleaning@mirolaenterprises.com</code>.
                </p>
              </section>
            </div>
          )}

          {/* TAB 2: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="legal-content-wrap">
              <div className="legal-lead-callout">
                <p>
                  Mirola Cleaning Services LLC values the privacy and confidentiality of corporate clients, facility decision-makers, and site visitors. This Privacy Policy details how commercial data submitted through <code>mirolacleaning.com</code> is gathered, protected, and utilized.
                </p>
                <div className="legal-effective-date">
                  Last Updated: September 2026 • Enterprise Data Protection Standard
                </div>
              </div>

              <section className="legal-section">
                <h3>1. Information Collected from Commercial Inquiries</h3>
                <p>
                  When facility directors request an on-site walkthrough, consultation, or commercial proposal, we collect business contact details including:
                </p>
                <ul>
                  <li>Authorized representative name, job title, and corporate email address.</li>
                  <li>Direct telephone number and facility physical address.</li>
                  <li>Building parameters: approximate square footage, facility classification, floor substrates, and desired cleaning schedule.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h3>2. How Commercial Information is Utilized</h3>
                <p>
                  Data provided to Mirola is exclusively used for operational purposes:
                </p>
                <ul>
                  <li>Generating itemized, transparent fixed-rate scopes of work and walkthrough itineraries.</li>
                  <li>Assigning regional supervisors and commercial personnel to authorized properties.</li>
                  <li>Transmitting automated shift inspection logs, before/after photos, and monthly quality audit scores.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h3>3. Absolute Zero-Data-Sale Commitment</h3>
                <p>
                  <strong>We do not sell, rent, trade, or monetize your contact or facility information to third-party marketing companies, lead brokers, or data aggregators.</strong> Your corporate details remain strictly within the operational custody of Mirola Cleaning Services LLC.
                </p>
              </section>

              <section className="legal-section">
                <h3>4. Secure Google Workspace Infrastructure & Transmission</h3>
                <p>
                  Website inquiries are transmitted through 256-bit SSL/TLS encryption and delivered directly into our secured Google Workspace enterprise infrastructure (<code>mirolacleaning@mirolaenterprises.com</code>) with two-factor authentication and strict access controls.
                </p>
              </section>

              <section className="legal-section">
                <h3>5. Client Data Rights & Deletion Requests</h3>
                <p>
                  Corporate clients may request copies of their stored facility data, update contact records, or request complete purging of non-financial inquiry records at any time by contacting our privacy compliance desk at <code>mirolacleaning@mirolaenterprises.com</code> or calling <code>(732) 592-9222</code>.
                </p>
              </section>
            </div>
          )}

          {/* TAB 3: SAFETY COMPLIANCE */}
          {activeTab === 'compliance' && (
            <div className="legal-content-wrap">
              <div className="legal-lead-callout">
                <p>
                  Operating in high-consequence commercial environments—including surgical medical suites, child care campuses, and active logistics hubs—demands documented adherence to federal OSHA guidelines, CDC recommendations, and EPA environmental safety standards.
                </p>
                <div className="legal-effective-date">
                  Compliance Classification: OSHA 29 CFR • EPA List N Hospital Standard
                </div>
              </div>

              <section className="legal-section">
                <h3>1. OSHA Bloodborne Pathogen Standard (29 CFR 1910.1030)</h3>
                <p>
                  Mirola cleaning technicians deployed to medical, clinical, and high-touch commercial properties are certified annually in universal precautions, personal protective equipment (PPE) protocols, biohazard containment, and safe sharps handling. Exposure control plans and disposal documentation are maintained for all medical facilities.
                </p>
              </section>

              <section className="legal-section">
                <h3>2. Hazard Communication & Safety Data Sheets (HAZCOM)</h3>
                <p>
                  In accordance with OSHA Hazard Communication Standard (29 CFR 1910.1200):
                </p>
                <ul>
                  <li>Every chemical container is labeled with Globally Harmonized System (GHS) pictograms, hazard warnings, and dilution ratios.</li>
                  <li>Complete physical and digital Safety Data Sheet (SDS) binders are staged in client janitorial storage areas for instant emergency access.</li>
                  <li>Specialists undergo continuous chemical reaction training to prevent dangerous compound cross-mixing.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h3>3. EPA-Registered List N Disinfectants & Dwell-Time Controls</h3>
                <p>
                  We utilize EPA-registered hospital-grade antimicrobials scientifically proven to neutralize SARS-CoV-2, MRSA, Norovirus, Influenza, and pathogenic bacteria. Our staff is trained to enforce strict wet dwell-times (typically 5 to 10 minutes) before wiping, ensuring complete microbial kill efficacy rather than superficial cleaning.
                </p>
              </section>

              <section className="legal-section">
                <h3>4. 4-Zone Color-Coded Microfiber Cross-Contamination Lock</h3>
                <p>
                  To eliminate pathogen transfer between restrooms, cafeterias, and workstations, Mirola enforces an uncompromised 4-color microfiber system:
                </p>
                <ul>
                  <li><strong style={{ color: '#dc2626' }}>Red Microfiber:</strong> High-risk restroom fixtures (toilets, urinals, sanitary disposal units).</li>
                  <li><strong style={{ color: '#eab308' }}>Yellow Microfiber:</strong> Restroom secondary surfaces (sinks, mirrors, partitions, dispensers).</li>
                  <li><strong style={{ color: '#2563eb' }}>Blue Microfiber:</strong> General corporate workstations, desks, executive boardrooms, and windows.</li>
                  <li><strong style={{ color: '#16a34a' }}>Green Microfiber:</strong> Food service spaces, kitchenettes, cafeterias, and breakrooms.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h3>5. Green Seal Certified & Pediatric-Safe Chemistry</h3>
                <p>
                  For daycare academies, schools, and LEED-certified commercial properties, Mirola provides Green Seal certified, zero-VOC, neutral-pH formulations that protect indoor air quality and prevent chemical respiratory irritation among children and office personnel.
                </p>
              </section>

              <section className="legal-section">
                <h3>6. 60-Minute Emergency Spill Containment Protocol</h3>
                <p>
                  Mirola maintains on-call emergency dispatch crews equipped with industrial wet extraction units, absorbent neutralizers, and antimicrobial foggers for rapid containment of plumbing leaks, industrial fluid spills, or biological contaminations within a guaranteed 60-minute response window.
                </p>
              </section>
            </div>
          )}

        </div>

        {/* Modal Footer Bar */}
        <div className="legal-modal-footer">
          <div className="legal-footer-contact">
            <span className="contact-label">Compliance & Legal Desk:</span>
            <a href={`tel:${CONTACT_INFO.phoneTel}`} className="contact-link">
              <Phone size={14} />
              <span>{CONTACT_INFO.phoneDisplay}</span>
            </a>
            <span className="contact-sep">•</span>
            <a href={`mailto:${CONTACT_INFO.email}`} className="contact-link">
              <Mail size={14} />
              <span>{CONTACT_INFO.email}</span>
            </a>
          </div>

          <div className="legal-footer-actions">
            <button 
              type="button" 
              className="legal-secondary-btn"
              onClick={onClose}
            >
              Close
            </button>
            <button 
              type="button" 
              className="legal-primary-btn"
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
            >
              <span>Schedule Walkthrough</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
