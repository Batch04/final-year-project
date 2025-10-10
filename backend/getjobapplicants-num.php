<?php

session_start();

include 'connection.php';

$data = json_decode(file_get_contents("php://input"), true);

$jobid = $data['jobid'];

$sql = "SELECT * FROM `applied_job` WHERE job_id = $jobid";

$result = mysqli_query($con, $sql);
$num = mysqli_num_rows($result);

echo json_encode(["count" => $num]);


?>