<?php
header("Content-Type:application/json");
session_start();
$con=mysqli_connect("localhost","root","","partconnectdb");
if(!isset($_SESSION['seeker_id'])){
    echo json_encode(['status'=>'error','message'=>'Unauthorized']);
    exit;
}
$seeker_id=$_SESSION['seeker_id'];
$currentPassword=$_POST['currentPassword']?? '';
$newPassword=$_POST['newPassword']?? '';
$confirmPassword=$_POST['confirmPassword']?? '';
if(empty($currentPassword) || empty($newPassword) || empty($confirmPassword)){
    echo json_encode(['status'=>'error','message'=>'Fields should not be empty']);
    exit;
}
$sql=$con->prepare("SELECT password FROM seekers where id=?");
$sql->bind_param('i',$seeker_id);
$sql->execute();
$sql->bind_result($res);
$sql->fetch();
$sql->close();
if(!$res || !password_verify($currentPassword,$res)){
    echo json_encode(['status'=>'error','message'=>'Current Password Incorrect']);
    exit;
}
if($newPassword != $confirmPassword){
    echo json_encode(['status'=>'error','message'=>'New Password ,Current Password should match']);
    exit;
}
$hashPass=password_hash($newPassword,PASSWORD_DEFAULT);
$update=$con->prepare("UPDATE seekers SET password=? where id=?");
$update->bind_param('si',$hashPass,$seeker_id);
if($update->execute()){
    echo json_encode(['status'=>'success','message'=>'Password Updated']);
}
else{
    echo json_encode(['status'=>'error','message'=>'Failed to Update']);
}
?>