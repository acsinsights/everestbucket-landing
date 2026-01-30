<?php
// PHPMailer SMTP Configuration
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load PHPMailer
require 'vendor/autoload.php';

// Enable error reporting for debugging (remove in production)
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// Set response header
header('Content-Type: application/json');

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get form data
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '';
    $size = isset($_POST['size']) ? htmlspecialchars(trim($_POST['size'])) : 'Not specified';
    $material = isset($_POST['material']) ? htmlspecialchars(trim($_POST['material'])) : 'Not specified';
    $quantity = isset($_POST['quantity']) ? htmlspecialchars(trim($_POST['quantity'])) : 'Not specified';
    $type = isset($_POST['type']) ? htmlspecialchars(trim($_POST['type'])) : 'Not specified';

    // Validate required fields
    if (empty($name) || empty($phone)) {
        echo json_encode([
            'success' => false,
            'message' => 'Name and Phone are required fields.'
        ]);
        exit;
    }

    // Create PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';           // Gmail SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'Kartikpaul366@gmail.com';    // Your SMTP username
        $mail->Password   = 'vgawxjxndkjgamht';         // Gmail App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Email Recipients
        $mail->setFrom('Kartikpau366@gmail.com', 'EVEREST Website');
        $mail->addAddress('tech@acsinsights.com', 'EVEREST Sales');
        $mail->addBCC('leadbackup@bingeatmedia.com');
        $mail->addReplyTo($mail->Username, $name);

        // Email Content
        $mail->isHTML(true);
        $mail->Subject = 'New Enquiry from EVEREST Website - ' . $name;

        // HTML Email Body
        $emailBody = "
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #1E40AF 0%, #1D4ED8 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
                .field { margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #1D4ED8; }
                .label { font-weight: bold; color: #1E40AF; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
                .value { font-size: 16px; color: #333; margin-top: 5px; }
                .footer { background: #1A1F3B; color: white; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }
                .highlight { background: #FEF3C7; border-left-color: #F59E0B; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1 style='margin:0;'>New Enquiry Received!</h1>
                    <p style='margin:10px 0 0 0; opacity: 0.9;'>EVEREST Elevator Buckets</p>
                </div>
                <div class='content'>
                    <div class='field highlight'>
                        <div class='label'>Customer Name</div>
                        <div class='value'>{$name}</div>
                    </div>
                    <div class='field highlight'>
                        <div class='label'>Phone Number</div>
                        <div class='value'>{$phone}</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Size of Bucket</div>
                        <div class='value'>{$size}</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Material</div>
                        <div class='value'>{$material}</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Quantity</div>
                        <div class='value'>{$quantity}</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Type of Bucket</div>
                        <div class='value'>{$type}</div>
                    </div>
                </div>
                <div class='footer'>
                    <p style='margin:0;'>This enquiry was submitted from the EVEREST website</p>
                    <p style='margin:5px 0 0 0; opacity: 0.7;'>© " . date('Y') . " V. L. Industrial Works</p>
                </div>
            </div>
        </body>
        </html>
        ";

        $mail->Body = $emailBody;

        // Plain text alternative
        $mail->AltBody = "
New Enquiry from EVEREST Website
================================

Customer Name: {$name}
Phone Number: {$phone}

Requirements:
- Size of Bucket: {$size}
- Material: {$material}
- Quantity: {$quantity}
- Type of Bucket: {$type}

---
This enquiry was submitted from the EVEREST website.
        ";

        // Send email
        $mail->send();

        echo json_encode([
            'success' => true,
            'message' => 'Email sent successfully!'
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Email could not be sent. Error: ' . $mail->ErrorInfo
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
}