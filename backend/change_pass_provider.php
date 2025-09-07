<?php
header("Content-Type:application/json");
include 'connect.php';
include 'dbcreate.php';
include 'tables.php';
session_start();
if(!isset($_SESSION['provider_id'])){
    echo json(['status'=>'error','message'=>'Unauthorized access']);
    exit;
}
$provider_id=$_SESSION['provider_id'];
$currentPassword=$_POST['currentPassword']?? '';
$newPassword=$_POST['newPassword']?? '';
$confirmPassword=$_POST['confirmPassword']??'';

if(empty($newPassword) || empty($currentPassword) || empty($confirmPassword)){
    echo json_encode(['status'=>'error','message'=>'Please Enter all fields']);
    exit;
}

$sql=$con->prepare("SELECT password from providers where provider_id=?");
$sql->bind_param('i',$provider_id);
$sql->execute();
$sql->bind_result($res);
$sql->fetch();
$sql->close();

if(!$res || !password_verify($currentPassword,$res)){
    echo json_encode(['status'=>'error','message'=>'Current Password Incorrect']);
    exit;

}
if($newPassword!=$confirmPassword){
    echo json_encode(['status'=>'error','message'=>'new password ,confirm password do not match']);
    exit;
}
$hashPass=password_hash($newPassword,PASSWORD_DEFAULT);
$update=$con->prepare("UPDATE providers SET password=? where provider_id=?");
$update->bind_param('si',$hashPass,$provider_id);
if($update->execute()){
    echo json_encode(['status'=>'success','message'=>'Password Updated']);
}
else{
    echo json_encode(['status'=>'error','message'=>'Failed to Update']);
}


?>