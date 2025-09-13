<?php

session_start();
include 'connection.php';
$seekerid = $_SESSION['seeker_id'];

$rawdata = file_get_contents("php://input");
$applydata = json_decode($rawdata , true);

$jobid = $applydata['jobid'];
$companyid = $applydata['companyid'];
$companyname = $applydata['companyname'];

$sql = "insert into applied_job (seeker_id,job_id,provider_name,company_name) values($seekerid,$jobid,$companyid,'$companyname')";

$res = mysqli_query($con, $sql);

if ($res) {
    echo json_encode(["status" => "succes"]);
} else {
    echo json_encode(["status" => "succes"]);
}

?>