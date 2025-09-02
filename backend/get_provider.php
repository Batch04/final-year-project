<?php
include 'connect.php';
include 'dbcreate.php';
include 'tables.php';
header("Content-Type:application/json");
session_start();
if(!isset($_SESSION['provider_id'])){
    echo json_encode(['status'=>'error','message'=>'Not logged in']);
    exit;
}
$id=$_SESSION['provider_id'];
$sql=$con->prepare("SELECT company_name,email,provider_id FROM providers where provider_id=? ");
$sql->bind_param('i',$id);
$sql->execute();
$data=$sql->get_result()->fetch_assoc();
echo json_encode(['status'=>'success','user'=>$data]);
?>