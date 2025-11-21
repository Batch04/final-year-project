<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

include 'connect.php';
include 'dbcreate.php';
include 'tables.php';

$data = json_decode(file_get_contents("php://input"), true);
$email = $data["email"]?? '';
if(empty($email)){
    echo json_encode(['status'=>'error','message'=>'Email is required']);
    exit;
}
$query="SELECT id AS user_id,'seeker' as type,email FROM seekers WHERE email=?
            UNION
            SELECT provider_id AS user_id,'provider' as type,email FROM providers WHERE email=?";
$sql=$con->prepare($query);
$sql->bind_param('ss',$email,$email);
$sql->execute();
$res=$sql->get_result();
if($res->num_rows>0){
    $row=$res->fetch_assoc();
    $user_id=$row['user_id'];
    $user_type=$row['type'];
    $otp=rand(100000,999999);
    $insert=$con->prepare("INSERT INTO reset_tokens(user_id,user_type,email,otp,expires_at)
        VALUES(?,?,?,?,DATE_ADD(NOW(),INTERVAL 10 MINUTE)) ");
    $insert->bind_param('isss',$user_id,$user_type,$email,$otp);
    $insert->execute();

    //Send OTP email
    $mail = new PHPMailer(true);
    try{
        $mail->isSMTP();
        $mail->Host='smtp.gmail.com';
        $mail->SMTPAuth=true;
        $mail->Username='parttimeconnect2025@gmail.com';
        $mail->Password='sxbu tvvl vfqe psaa';
        $mail->SMTPSecure='tls';
        $mail->Port=587;
        $mail->setFrom('parttimeconnect2025@gmail.com','Parttimeconnect');
        $mail->addAddress($email);
        $mail->isHTML(true);
        $mail->Subject='Your OTP Code';
        $mail->Body='Your OTP code is <b>'.$otp.' It will expire in 10 minutes.';
        $mail->send();
        echo json_encode(['status'=>'success','message'=>'OTP sent to your email']);   
    }
    catch(Exception $e){
        echo json_encode(['status'=>'error','message'=>'Mailer Error: '.$mail->ErrorInfo]);
    }
}
else{
    echo json_encode(['status'=>'error','message'=>'Email not Found']);
}
?>