<?php

session_start();
include 'connection.php';
$seeker_id = $_SESSION['seeker_id'];

$sql1 = "SELECT * FROM `applied_job` where seeker_id = $seeker_id";

$res = mysqli_query($con, $sql1);
$applications_count = mysqli_num_rows($res);

$sql2 = "SELECT * FROM `saved_jobs`where seeker_id = $seeker_id";
$res2 = mysqli_query($con, $sql2);
$saved_jobs_count = mysqli_num_rows($res2);
echo json_encode([
    'applications_count' => $applications_count,
    'saved_jobs_count' => $saved_jobs_count
]);

?>