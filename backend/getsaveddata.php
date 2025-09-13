<?php

session_start();

include 'connection.php';

$seekerid = $_SESSION['seeker_id'];
$data = [];
$sql = "select job_id from saved_jobs where seeker_id = $seekerid";
$res = mysqli_query($con, $sql);
while ($row = mysqli_fetch_assoc($res)) {
    $data[] = $row;
}

header("Content-Type: application/json");
echo json_encode($data);

?>