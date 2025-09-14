<?php
include 'connection.php';
header("Content-Type:application/json");
session_start();
if(!isset($_SESSION['seeker_id'])){
    echo json_encode(['status'=>'error','message'=>'Not logged in']);
    exit;
}
$id=$_SESSION['seeker_id'];
$sql=$con->prepare("SELECT * FROM seekers where id=? ");
$sql->bind_param('i',$id);
$sql->execute();
$data=$sql->get_result()->fetch_assoc();
echo json_encode(['status'=>'success','user'=>$data]);
?>