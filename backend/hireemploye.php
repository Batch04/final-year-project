<?php

session_start();
header('Content-Type: application/json');

include 'connection.php';

$provider_id = $_SESSION['provider_id'];

$input = json_decode(file_get_contents('php://input'), true);

$seekerid = $input['seekerid'];
$jobid = $input['jobid'];
$providerid = $input['providerid'];

$sql = "insert into hired (job_id,provider_id,seeker_id)values($jobid,$providerid,$seekerid)";

$res = mysqli_query($con,$sql);

if ($res) {
    echo json_encode(['status' => 'success', 'message' => 'hired']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'not hired']);
}
?>