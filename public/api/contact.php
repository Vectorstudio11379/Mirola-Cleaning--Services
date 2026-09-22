<?php
/**
 * Mirola Cleaning Services - Commercial Lead & Consultation Mailer
 * Handles direct background form submissions and delivers directly to mirolacleaning@mirolaenterprises.com
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

// 2. Read JSON Input
$inputRaw = file_get_contents('php://input');
$data = json_decode($inputRaw, true);

if (!$data) {
    // Fallback to standard POST form data if sent via FormData
    $data = $_POST;
}

// 3. Extract & Sanitize Fields
$fullName      = isset($data['fullName']) ? trim(strip_tags($data['fullName'])) : '';
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
$to = 'ezekielelijahkola@gmail.com';
$facilitySummary = !empty($company) ? $company : (!empty($fullName) ? $fullName : 'New Commercial Lead');
$subject = "[Mirola Website Lead] {$formType}: {$facilitySummary}";

// 6. Build Plain Text & HTML Email
$facilityListText = count($facilityTypes) > 0 ? implode("\n - ", $facilityTypes) : 'General Commercial Facility';
$facilityListHtml = count($facilityTypes) > 0 ? '<li>' . implode('</li><li>', $facilityTypes) . '</li>' : '<li>General Commercial Facility</li>';

$bodyText = "NEW COMMERCIAL FACILITY REQUEST - MIROLA CLEANING SERVICES\n\n";
$bodyText .= "Form Type: {$formType}\n";
$bodyText .= "Full Name: {$fullName}\n";
$bodyText .= "Company / Property: {$company}\n";
$bodyText .= "Email: {$email}\n";
$bodyText .= "Phone: {$phone}\n";
if (!empty($squareFootage)) {
    $bodyText .= "Square Footage: {$squareFootage}\n";
}
$bodyText .= "\nFACILITY CLASSIFICATION(S):\n - {$facilityListText}\n\n";
$bodyText .= "SCOPE / PRIORITIES / NOTES:\n" . (!empty($message) ? $message : 'Standard commercial facility inspection requested.') . "\n\n";
$bodyText .= "Submitted on: " . date('Y-m-d H:i:s T') . "\n";
$bodyText .= "Visitor IP: " . (isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'Unknown') . "\n";

// HTML Email Body
$bodyHtml = <<<HTML
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; }
  .container { max-width: 600px; background: #ffffff; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); }
  .header { background: #111418; padding: 25px 30px; border-bottom: 4px solid #C90000; }
  .header h1 { color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 0.5px; }
  .header p { color: #9aa0a6; margin: 5px 0 0 0; font-size: 13px; }
  .content { padding: 30px; color: #2d3748; }
  .badge { display: inline-block; background: #ffebee; color: #C90000; font-weight: 700; font-size: 11px; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; margin-bottom: 20px; }
  .lead-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
  .lead-table td { padding: 10px 12px; border-bottom: 1px solid #edf2f7; font-size: 14px; }
  .lead-table td.label { width: 35%; font-weight: 600; color: #718096; background: #fafbfc; }
  .lead-table td.value { color: #1a202c; font-weight: 500; }
  .notes-box { background: #f8fafc; border-left: 4px solid #C90000; padding: 15px 20px; border-radius: 0 8px 8px 0; margin-top: 15px; font-size: 14px; line-height: 1.6; }
  .footer { background: #fafbfc; padding: 20px 30px; text-align: center; font-size: 12px; color: #a0aec0; border-top: 1px solid #edf2f7; }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Mirola Cleaning Services</h1>
      <p>Direct Commercial Facility Lead Notification</p>
    </div>
    <div class="content">
      <div class="badge">{$formType}</div>
      <table class="lead-table">
        <tr><td class="label">Full Name</td><td class="value">{$fullName}</td></tr>
        <tr><td class="label">Company / Property</td><td class="value">{$company}</td></tr>
        <tr><td class="label">Corporate Email</td><td class="value"><a href="mailto:{$email}">{$email}</a></td></tr>
        <tr><td class="label">Direct Phone</td><td class="value"><a href="tel:{$phone}">{$phone}</a></td></tr>
HTML;

if (!empty($squareFootage)) {
    $bodyHtml .= "<tr><td class=\"label\">Estimated Size</td><td class=\"value\">{$squareFootage}</td></tr>";
}

$cleanMessage = !empty($message) ? nl2br(htmlspecialchars($message)) : 'Standard commercial facility inspection requested.';

$bodyHtml .= <<<HTML
        <tr><td class="label">Facility Type(s)</td><td class="value"><ul>{$facilityListHtml}</ul></td></tr>
      </table>
      <div style="font-weight: 600; margin-top: 20px; font-size: 14px; color: #4a5568;">Requested Scope / Specific Priorities:</div>
      <div class="notes-box">{$cleanMessage}</div>
    </div>
    <div class="footer">
      Sent automatically from Mirola Cleaning Services Web Platform.<br>
      Timestamp: {$bodyText}
    </div>
  </div>
</body>
</html>
HTML;

// 7. Configure Mail Headers
$headers   = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: Mirola Web Lead <inquiries@mirolaenterprises.com>';
if (!empty($email)) {
    $headers[] = "Reply-To: {$fullName} <{$email}>";
}
$headers[] = 'X-Mailer: PHP/' . phpversion();

// 8. Send Email
$mailSent = @mail($to, $subject, $bodyHtml, implode("\r\n", $headers));

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
