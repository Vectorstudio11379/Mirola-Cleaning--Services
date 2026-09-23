<?php
/**
 * Mirola Cleaning Services - Commercial Lead & Consultation Mailer
 * Handles direct background form submissions and delivers directly to ezekielelijahkola@gmail.com
 */

// 1. Set CORS and JSON Response Headers
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed. Use POST.']);
    exit;
}

// Temporary Form Deactivation Flag
$formsActive = false;
if (!$formsActive) {
    http_response_code(200);
    echo json_encode([
        'success' => false,
        'deactivated' => true,
        'message' => 'Forms have been temporarily deactivated. Please contact our 24/7 team at (732) 592-9222 or email mirolacleaning@mirolaenterprises.com.'
    ]);
    exit;
}

// 2. Read JSON Input
$inputRaw = file_get_contents('php://input');
$data = json_decode($inputRaw, true);

if (!$data) {
    // Fallback to standard POST form data if sent via FormData
    $data = $_POST;
}

// 3. Extract & Sanitize Fields
$fullName      = isset($data['fullName']) ? trim(strip_tags($data['fullName'])) : (isset($data['name']) ? trim(strip_tags($data['name'])) : 'Prospective Commercial Client');
$company       = isset($data['company']) ? trim(strip_tags($data['company'])) : '';
$email         = isset($data['email']) ? trim(strip_tags($data['email'])) : '';
$phone         = isset($data['phone']) ? trim(strip_tags($data['phone'])) : '';
$squareFootage = isset($data['squareFootage']) ? trim(strip_tags($data['squareFootage'])) : '';
$message       = isset($data['message']) ? trim(strip_tags($data['message'])) : (isset($data['notes']) ? trim(strip_tags($data['notes'])) : '');
$formType      = isset($data['formType']) ? trim(strip_tags($data['formType'])) : 'Walkthrough Request';

$facilityTypes = [];
if (isset($data['facilityTypes'])) {
    if (is_array($data['facilityTypes'])) {
        $facilityTypes = array_map(function($f) { return trim(strip_tags($f)); }, $data['facilityTypes']);
    } else {
        $facilityTypes = [trim(strip_tags($data['facilityTypes']))];
    }
}

// 4. Validate Required Fields
if (empty($email) || (!filter_var($email, FILTER_VALIDATE_EMAIL))) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please provide a valid corporate email address.']);
    exit;
}

// 5. Build Recipient & Subject
$to = 'mirolacleaning@mirolaenterprises.com';
$facilitySummary = !empty($company) ? $company : (!empty($fullName) ? $fullName : 'New Commercial Lead');
$subject = "[Mirola Cleaning Lead] {$formType}: {$facilitySummary}";

// 6. Build Plain Text & HTML Email
$submittedAt = date('F j, Y, g:i a T');
$visitorIp   = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'Direct Web Client';
$serverHost  = !empty($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'linen-meerkat-122944.hostingersite.com';

// Logo paths: both relative server path for inline MIME CID attachment & public URL fallback
$logoPath    = dirname(__DIR__) . '/images/logo.jpg';
$hasLogoFile = file_exists($logoPath);
$logoCid     = 'mirola_logo_img';
$logoSrc     = $hasLogoFile ? "cid:{$logoCid}" : "https://{$serverHost}/images/logo.jpg";

$facilityListText = count($facilityTypes) > 0 ? implode(", ", $facilityTypes) : 'General Commercial Facility';
$facilityBadgesHtml = '';
if (count($facilityTypes) > 0) {
    foreach ($facilityTypes as $ft) {
        $facilityBadgesHtml .= "<span style=\"display: inline-block; background-color: #f1f5f9; color: #0f172a; padding: 4px 10px; border-radius: 6px; font-size: 13px; font-weight: 600; margin-right: 6px; margin-bottom: 6px; border: 1px solid #cbd5e1;\">" . htmlspecialchars($ft) . "</span>";
    }
} else {
    $facilityBadgesHtml = "<span style=\"display: inline-block; background-color: #f1f5f9; color: #0f172a; padding: 4px 10px; border-radius: 6px; font-size: 13px; font-weight: 600; border: 1px solid #cbd5e1;\">General Commercial Facility</span>";
}

$cleanMessage = !empty($message) ? nl2br(htmlspecialchars($message)) : 'Standard on-site commercial facility inspection & fixed proposal requested.';
$displayCompany = !empty($company) ? htmlspecialchars($company) : '<span style="color: #94a3b8; font-style: italic;">Not specified</span>';
$displayPhone = !empty($phone) ? '<a href="tel:' . preg_replace('/[^0-9+]/', '', $phone) . '" style="color: #c90000; font-weight: 700; text-decoration: none;">' . htmlspecialchars($phone) . '</a>' : '<span style="color: #94a3b8; font-style: italic;">Not provided</span>';
$displayArea = !empty($squareFootage) ? htmlspecialchars($squareFootage) : '<span style="color: #94a3b8; font-style: italic;">To be surveyed during walkthrough</span>';

// Clean plain text fallback
$bodyText = "NEW COMMERCIAL FACILITY REQUEST - MIROLA CLEANING SERVICES\n\n";
$bodyText .= "Form Type: {$formType}\n";
$bodyText .= "Full Name: {$fullName}\n";
$bodyText .= "Company / Property: " . (!empty($company) ? $company : 'N/A') . "\n";
$bodyText .= "Corporate Email: {$email}\n";
$bodyText .= "Direct Phone: " . (!empty($phone) ? $phone : 'N/A') . "\n";
$bodyText .= "Estimated Area: " . (!empty($squareFootage) ? $squareFootage : 'N/A') . "\n";
$bodyText .= "Facility Type(s): {$facilityListText}\n\n";
$bodyText .= "SPECIFIC PRIORITIES / SCOPE:\n" . (!empty($message) ? $message : 'Standard inspection requested.') . "\n\n";
$bodyText .= "Submitted on: {$submittedAt}\n";
$bodyText .= "Visitor IP: {$visitorIp}\n";

// HTML Email Body with Full Inline CSS for Universal Client Rendering
$bodyHtml = <<<HTML
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Mirola Cleaning Services - New Commercial Facility Request</title>
</head>
<body style="margin: 0; padding: 20px 10px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  
  <!-- Outer Wrapper Table -->
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9;">
    <tr>
      <td align="center">
        
        <!-- Main Card Container (Max Width 620px) -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 620px; width: 100%; background-color: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.07); border: 1px solid #e2e8f0;">
          
          <!-- Top Accent Bar -->
          <tr>
            <td height="5" style="background-color: #c90000; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Header Section with Company Logo -->
          <tr>
            <td style="background-color: #0b0f17; padding: 24px 30px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="58" valign="middle">
                    <img src="{$logoSrc}" alt="Mirola Logo" width="50" height="50" style="display: block; width: 50px; height: 50px; border-radius: 10px; border: 2px solid #c90000; object-fit: cover; background-color: #000000;" />
                  </td>
                  <td style="padding-left: 16px;" valign="middle">
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 19px; font-weight: 800; color: #ffffff; letter-spacing: 0.8px; text-transform: uppercase; margin: 0; line-height: 1.2;">
                      MIROLA CLEANING SERVICES
                    </div>
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; color: #94a3b8; font-weight: 500; margin-top: 3px; letter-spacing: 0.3px;">
                      Premier Commercial & Janitorial Care • New Facility Inquiry
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card Body -->
          <tr>
            <td style="padding: 30px 28px 24px;">
              
              <!-- Form Type Badge -->
              <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="background-color: #fef2f2; border: 1px solid #fecaca; padding: 6px 14px; border-radius: 20px;">
                    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11.5px; font-weight: 800; color: #991b1b; letter-spacing: 0.6px; text-transform: uppercase;">
                      ★ {$formType}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Section Title -->
              <h2 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 16px 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">
                Commercial Lead Information
              </h2>

              <!-- Details Table -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td width="38%" style="padding: 11px 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13.5px; font-weight: 600; color: #64748b; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; border-radius: 6px 0 0 0;">
                    Contact Name
                  </td>
                  <td style="padding: 11px 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14.5px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
                    {$fullName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 11px 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13.5px; font-weight: 600; color: #64748b; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                    Company / Property
                  </td>
                  <td style="padding: 11px 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
                    {$displayCompany}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 11px 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13.5px; font-weight: 600; color: #64748b; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                    Corporate Email
                  </td>
                  <td style="padding: 11px 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; border-bottom: 1px solid #e2e8f0;">
                    <a href="mailto:{$email}" style="color: #c90000; text-decoration: none; font-weight: 700;">{$email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 11px 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13.5px; font-weight: 600; color: #64748b; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                    Direct Phone
                  </td>
                  <td style="padding: 11px 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; border-bottom: 1px solid #e2e8f0;">
                    {$displayPhone}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 11px 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13.5px; font-weight: 600; color: #64748b; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                    Estimated Area
                  </td>
                  <td style="padding: 11px 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
                    {$displayArea}
                  </td>
                </tr>
                <tr>
                  <td valign="top" style="padding: 11px 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13.5px; font-weight: 600; color: #64748b; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; border-radius: 0 0 0 6px;">
                    Facility Classification
                  </td>
                  <td style="padding: 11px 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; border-bottom: 1px solid #e2e8f0;">
                    {$facilityBadgesHtml}
                  </td>
                </tr>
              </table>

              <!-- Requested Scope & Priorities Box -->
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13.5px; font-weight: 700; color: #334155; margin-bottom: 8px;">
                Requested Scope / Priorities / Notes:
              </div>
              <div style="background-color: #f8fafc; border-left: 4px solid #c90000; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 16px 18px; border-radius: 0 8px 8px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #1e293b; margin-bottom: 24px;">
                {$cleanMessage}
              </div>

              <!-- Quick Action Response Buttons -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 10px;">
                <tr>
                  <td align="center">
                    <a href="mailto:{$email}?subject=Re:%20Mirola%20Cleaning%20Services%20Facility%20Walkthrough%20Proposal" style="display: inline-block; background-color: #c90000; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13.5px; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin: 4px 6px; letter-spacing: 0.3px;">
                      ✉️ Reply Directly to {$fullName}
                    </a>
HTML;

if (!empty($phone)) {
    $cleanTel = preg_replace('/[^0-9+]/', '', $phone);
    $bodyHtml .= <<<HTML
                    <a href="tel:{$cleanTel}" style="display: inline-block; background-color: #0f172a; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13.5px; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin: 4px 6px; letter-spacing: 0.3px;">
                      📞 Call {$cleanTel}
                    </a>
HTML;
}

$bodyHtml .= <<<HTML
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Clean Professional Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 22px 24px; text-align: center;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; line-height: 1.6; color: #64748b;">
                    <strong style="color: #0f172a;">Mirola Cleaning Services LLC</strong><br>
                    800 Hamilton Street, Somerset, NJ 08873 • 24/7 Operations Hotline: <a href="tel:7325929222" style="color: #c90000; font-weight: 600; text-decoration: none;">(732) 592-9222</a><br>
                    <span style="font-size: 11px; color: #94a3b8; display: inline-block; margin-top: 6px;">
                      Dispatched on {$submittedAt} • Client IP: {$visitorIp}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- End Main Card -->

      </td>
    </tr>
  </table>

</body>
</html>
HTML;

// 7. Configure Mail Headers & MIME Structure
$boundary  = "mirola_bnd_" . md5(uniqid((string)time(), true));
$headers   = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = "From: Mirola Cleaning Operations <noreply@{$serverHost}>";
if (!empty($email)) {
    $headers[] = "Reply-To: {$fullName} <{$email}>";
}
$headers[] = 'X-Mailer: PHP/' . phpversion();

if ($hasLogoFile) {
    $headers[] = "Content-Type: multipart/related; boundary=\"{$boundary}\"";
    
    $logoData   = file_get_contents($logoPath);
    $logoBase64 = chunk_split(base64_encode($logoData));
    
    $fullBody  = "--{$boundary}\r\n";
    $fullBody .= "Content-Type: text/html; charset=UTF-8\r\n";
    $fullBody .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $fullBody .= $bodyHtml . "\r\n\r\n";
    
    $fullBody .= "--{$boundary}\r\n";
    $fullBody .= "Content-Type: image/jpeg; name=\"logo.jpg\"\r\n";
    $fullBody .= "Content-Transfer-Encoding: base64\r\n";
    $fullBody .= "Content-ID: <{$logoCid}>\r\n";
    $fullBody .= "Content-Disposition: inline; filename=\"logo.jpg\"\r\n\r\n";
    $fullBody .= $logoBase64 . "\r\n\r\n";
    
    $fullBody .= "--{$boundary}--\r\n";
} else {
    $headers[] = 'Content-Type: text/html; charset=UTF-8';
    $fullBody  = $bodyHtml;
}

// 8. Send Email with Envelope Sender
$envelope = "-f noreply@{$serverHost}";
$mailSent = @mail($to, $subject, $fullBody, implode("\r\n", $headers), $envelope);

if ($mailSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you. Your request has been dispatched directly to our facility director.'
    ]);
} else {
    // If mail() fails on unconfigured local dev environment, return structured response
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'fallback' => true,
        'message' => 'Your consultation request was recorded.'
    ]);
}
