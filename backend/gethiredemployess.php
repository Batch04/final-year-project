<?php

session_start();
header('Content-Type: application/json');

include 'connection.php';
$provider_id = $_SESSION['provider_id'];

$sql = "SELECT s.*, pj.*, seekers.name , seekers.phone FROM hired s JOIN seekers ON seekers.id = s.seeker_id JOIN posted_jobs pj ON s.job_id = pj.job_id WHERE s.provider_id = $provider_id";

$res = mysqli_query($con,$sql);

$data = [];

while($row = mysqli_fetch_assoc($res)){
    $data[] = $row;
}

echo json_encode($data);

?>