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

  // Corporate Office / Service Location
  address: 'Serving Commercial Hubs Nationwide in the USA',
  cityStateZip: 'United States',

  // Service Hours
  operatingHours: '24/7 Rapid Response & Nightly Janitorial Dispatch',

  // Background Form Submission Endpoints
  // Automatically uses built-in PHP mailer on Hostinger/Apache/Nginx hosting
  formEndpoint: '/api/contact.php',
  // Active Web3Forms Access Key for direct Google Workspace delivery
  web3FormsAccessKey: 'cc2f8058-465f-4061-a923-d29ff928cff9',
} as const;
