<?php
session_start();
header('Content-Type: application/json');
require __DIR__ . '/../vendor/autoload.php';  // Composer autoload
include 'connection.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$data = json_decode(file_get_contents("php://input"), true);

$seekerid = $data['seekerid'];
$jobname = $data['jobname'] ?? "your job role";
$companyname = $_SESSION['company_name'];   // Company name from session

// Fetch employee details
$sql = "SELECT name, email FROM seekers WHERE id = '$seekerid'";
$result = mysqli_query($con, $sql);

if ($result && mysqli_num_rows($result) > 0) {

    $row = mysqli_fetch_assoc($result);
    $to = $row['email'];
    $name = $row['name'];

    // Send termination email
    $sent = sendTerminationMail($to, $name, $jobname, $companyname);

    if ($sent) {
        echo json_encode(["status" => "success", "message" => "Termination email sent successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to send email"]);
    }

} else {
    echo json_encode(["status" => "error", "message" => "Employee not found"]);
}



// Email function
function sendTerminationMail($to, $name, $jobname, $companyname)
{
    $mail = new PHPMailer(true);

    try {
        // SMTP Settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'svgpbatch4@gmail.com';
        $mail->Password = 'xtwsjfcgvkjwinzo';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Email Setup
        $mail->setFrom('svgpbatch4@gmail.com', $companyname . " HR Team");
        $mail->addAddress($to, $name);

        $mail->isHTML(true);
        $mail->Subject = "Termination of Employment - $jobname";

        // Email Body
        $mail->Body = "
            <div style='font-family: Arial; color:#333; line-height:1.7'>
                <h2 style='color:#c0392b;'>Hello $name,</h2>

                <p>This email is to inform you that your employment for the position of 
                <strong>$jobname</strong> at <strong>$companyname</strong> has been officially terminated.</p>

                <p>After a detailed review, the management has decided to discontinue your services with immediate effect. 
                This decision has been made considering internal requirements and organizational restructuring.</p>

                <p>Please return any company property (if applicable) and ensure all pending work is handed over properly.</p>

                <p>We appreciate your efforts during your time with us and wish you success in your future career.</p>

                <br>
                <p>Regards,<br>
                <strong>$companyname HR Team</strong></p>
            </div>
        ";

        $mail->AltBody = "Hello $name, your employment as $jobname at $companyname has been terminated effective immediately.";

        $mail->send();
        // SUCCESS RESPONSE (very important for JS)
        echo json_encode([
            "status" => "success",
            "message" => "Termination email sent successfully."
        ]);
        exit;

    } catch (Exception $e) {
        error_log("Email Error: " . $mail->ErrorInfo);
        return false;
    }
}
?>