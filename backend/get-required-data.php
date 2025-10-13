<?php

session_start();

include 'connection.php';

header('Content-Type: application/json');

$provider_id = $_SESSION['provider_id'];

// Get number of applicants

$sql = "SELECT * FROM `applied_job` WHERE provider_name = $provider_id";

$res = mysqli_query($con,$sql);

$cout = mysqli_num_rows($res);

// Get number of active job postings

$sql2 = "SELECT * FROM `posted_jobs` WHERE job_status = 'open' AND provider_name = $provider_id";

$res2 = mysqli_query($con,$sql2);

$active = mysqli_num_rows($res2);

// get hired numbers

$sql3 = "SELECT * FROM `hired` WHERE  provider_id = $provider_id";

$res3 = mysqli_query($con,$sql3);

$hire = mysqli_num_rows($res3);

echo json_encode(["count"=>$cout,"active"=>$active,"hired"=>$hire]);

?>