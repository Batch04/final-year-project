<?php

session_start();
include 'connection.php';
header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"), true);
$provider_id = $_SESSION['provider_id'];

$status = $data['status'];
$jobid = $data['jobid'];

if ($status == "open") {
    $sql = " UPDATE posted_jobs set job_status = 'open' WHERE job_id = $jobid";
    $res = mysqli_query($con, $sql);
    echo json_encode(['status' => 'success', 'message' => 'job opend']);
} else {
    $sql = " UPDATE posted_jobs set job_status = 'close' WHERE job_id = $jobid";
    $res = mysqli_query($con, $sql);
    echo json_encode(['status' => 'success', 'message' => 'job closed']);
}

?>