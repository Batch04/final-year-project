<?php

session_start();
header('Content-Type: application/json');

include 'connection.php';

$input = json_decode(file_get_contents('php://input'), true);

$jobid = $input['jobid'];
$providerid = $input['providerid'];

$sql = "select * from shortlisted where job_id=$jobid and provider_id=$providerid";

$res = mysqli_query($con, $sql);

$data = [];

while ($row = mysqli_fetch_assoc($res)) {
    $data[] = [
        "seekerid" => $row['seeker_id'],
        "provider_id" => $row['provider_id'], 
        "job_id" => $row['job_id']
    ];
}

echo json_encode($data);

?>