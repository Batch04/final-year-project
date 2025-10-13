<?php

session_start();
header('Content-Type: application/json');

include 'connection.php';

$provider_id = $_SESSION['provider_id'];

$input = json_decode(file_get_contents('php://input'), true);

$seekerid = $input['seekerid'];
$jobid = $input['jobid'];

$sql = "delete from hired where 	job_id = $jobid and seeker_id = $seekerid";

$res = mysqli_query($con,$sql);

if($res){
    echo json_encode(['status'=>'success','message'=>'fired successfully']);
}
else{
    echo json_encode(['status'=>'error','message'=>'No changes made']);
}

?>