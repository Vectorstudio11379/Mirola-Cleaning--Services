/**
 * Central business contact details for Mirola Cleaning Services.
 * Update these values to reflect real commercial contact information across the entire website.
 */
export const CONTACT_INFO = {
  // Primary Business Phone
  phoneDisplay: '(732) 592-9222',
  phoneTel: '7325929222',

  // Primary Inquiries & Consultation Recipient Email
  email: 'mirolacleaning@mirolaenterprises.com',

  // Form Submission Master Switch
  formsActive: true,
  formsDeactivatedMessage: '',

  // Corporate Office / Service Location
  streetAddress: '800 Hamilton Street',
  city: 'Somerset',
  state: 'NJ',
  zipCode: '08873',
  country: 'United States',
  address: '800 Hamilton Street, Somerset, NJ 08873',
  cityStateZip: 'Somerset, NJ 08873',

  // Service Hours
  operatingHours: '24/7 Rapid Response & Nightly Janitorial Dispatch',

  // Background Form Submission Endpoints
  // Automatically uses built-in PHP mailer on Hostinger/Apache/Nginx hosting
  formEndpoint: '/api/contact.php',
  // Active Web3Forms Access Key for direct Google Workspace delivery
  web3FormsAccessKey: 'cc2f8058-465f-4061-a923-d29ff928cff9',
} as const;
