<?php
header('Content-Type: application/json');
session_start();
include 'connection.php';
require __DIR__ . '/../vendor/autoload.php';  // Composer autoload

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$companyname = $_SESSION['company_name'];   // Company name from session
$data = json_decode(file_get_contents("php://input"), true);

$seekerid = $data['seekerid'];
$jobid = $data['jobid'];
$providerid = $data['providerid'];
$jobname = isset($data['jobname']) ? $data['jobname'] : 'the position you applied for';

// ✅ Fetch seeker email & name
$sql = "SELECT name, email FROM seekers WHERE id = '$seekerid'";
$result = mysqli_query($con, $sql);

if ($result && mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $to = $row['email'];
    $name = $row['name'];

    // Send mail
    $sent = sendJobSelectionMail($to, $name, $jobname, $companyname);

    if ($sent) {
        echo json_encode(["status" => "success", "message" => "Mail sent successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to send mail"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Seeker not found"]);
}

// --------------------------------------------------------
//  PHPMailer Function
// --------------------------------------------------------
function sendJobSelectionMail($to, $name, $jobname, $companyname)
{
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'svgpbatch4@gmail.com';
        $mail->Password = 'xtwsjfcgvkjwinzo';  // Gmail App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Recipients
        $mail->setFrom('svgpbatch4@gmail.com', $companyname . ' Recruitment Team');
        $mail->addAddress($to, $name);

        // Content
        $mail->isHTML(true);
        $mail->Subject = "Selection Confirmation - $jobname at $companyname";

        // ----------------------------------------------------
        //  Professional HTML Email Body
        // ----------------------------------------------------
        $mail->Body = "
        <div style='font-family: Arial, sans-serif; line-height: 1.7; color: #2c3e50;'>
            <h2 style='color:#1a73e8;'>Congratulations, $name!</h2>

            <p>We are pleased to inform you that you have been 
            <strong style='color:#27ae60;'>selected</strong> for the position of 
            <strong>$jobname</strong> at <strong>$companyname</strong>.</p>

            <p>After reviewing your profile and qualifications, our hiring team found your experience to be a strong match for the role. We believe you will be an excellent addition to our organization.</p>

            <h3 style='margin-top:20px; color:#1a73e8;'>Next Steps</h3>
            <p>Our HR department will soon send you onboarding details, joining schedule, and documentation instructions. Kindly keep an eye on your email for further updates.</p>

            <p>If you have any questions or need clarification, feel free to reply to this email. We are here to assist you.</p>

            <br>
            <p>Warm Regards,<br>
            <strong>$companyname Recruitment Team</strong><br>
            <span style='color:#7f8c8d;'>Thank you for choosing to work with us.</span></p>
        </div>
        ";

        // ----------------------------------------------------
        //  Alt Body (Plain Text Version)
        // ----------------------------------------------------
        $mail->AltBody = "Hello $name,

            Congratulations! You have been selected for the position of $jobname at $companyname.

            Our hiring team was impressed with your profile. Onboarding details and joining instructions will be sent to you shortly.

            Regards,
            $companyname Recruitment Team";

        $mail->send();
        return true;

    } catch (Exception $e) {
        error_log("Mailer Error: {$mail->ErrorInfo}");
        return false;
    }
}
?>