<?php
include 'connect.php';
include 'dbcreate.php';
include 'tables.php';
 
$data=json_decode(file_get_contents("php://input"),true);
$email=$data["email"]?? '';
$otp=$data["otp"]?? '';
if(empty($email)||empty($otp)){
    echo json_encode(['status'=>'error','message'=>'Email and OTP  required']);
    exit;
}
$query="SELECT * FROM reset_tokens WHERE email=? AND otp=? AND expires_at>NOW() ORDER BY id DESC LIMIT 1";
$sql=$con->prepare($query);
$sql->bind_param('ss',$email,$otp);
$sql->execute();
$res=$sql->get_result();
if($res->num_rows>0){
    $row=$res->fetch_assoc();
    $reset_token=bin2hex(random_bytes(16));
    $update=$con->prepare("UPDATE reset_tokens SET reset_token=? WHERE id=?");
    $update->bind_param('si',$reset_token,$row['id']);
    $update->execute();
    echo json_encode(['status'=>'success','message'=>"OTP Verified","token"=>$reset_token]);

}
else{
    echo json_encode(['status'=>'error','message'=>'Invalid or expired OTP']);
}

?>