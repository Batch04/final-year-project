<?php
header("Content-Type:application/json");
session_start();

$con=mysqli_connect("localhost","root","","partconnectdb");
if (!$con) {
    echo json_encode(['status'=>'error','message'=>'Database connection failed']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status'=>'error','message'=>'Invalid request method']);
    exit;
}



if(!isset($_SESSION['seeker_id'])){
    echo json_encode(['status'=>'error','message'=>'Not logged in']);
    exit;
}
$id=$_SESSION['seeker_id'];
$sql="DELETE FROM seekers where id=$id";
$res=mysqli_query($con,$sql);
if($res){
    session_unset();
    session_destroy();
    echo json_encode(['status'=>'success','message'=>'Account deleted Successfully']);

}
else{
    echo json_encode(['status'=>'error','message'=>'Failed to delete account']);
}


?>