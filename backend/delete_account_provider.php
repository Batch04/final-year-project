<?php
header("Content-Type:application/json");
session_start();
$con=mysqli_connect("localhost","root","","partconnectdb");
if(!isset($_SESSION['provider_id'])){
    echo json_encode(['status'=>'error','message'=>'Not logged in']);
    exit;
}
$provider_id=$_SESSION['provider_id'];
 $sql="DELETE FROM providers where provider_id=$provider_id";
 $res=mysqli_query($con,$sql);
 if($res){
    session_unset();
    session_destroy();
    echo json_encode(['status'=>'success','message'=>' Account deleted successfully']);
 }
 else{
    echo json_encode(['status'=>'error','message'=>"failed to delete account"]);
 }


?>