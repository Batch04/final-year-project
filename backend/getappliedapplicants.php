<?php

session_start();
include 'connection.php';

$data = json_decode(file_get_contents("php://input"), true);

$jobid = $data['jobid'];

$provider_id = $_SESSION['provider_id'];

$sql = "SELECT s.* , aj.* from seekers s join applied_job aj on s.id = aj.seeker_id WHERE provider_name = $provider_id AND job_id = $jobid ORDER BY applied_date DESC";

$res = mysqli_query($con, $sql);

$data = [];

while ($row = mysqli_fetch_assoc($res)) {

    $data[] = [
        "id" => $row['id'],
        "name" => $row['name'],
        "email" => $row['email'],
        "phone" => $row['phone'],
        "age" => $row['age'],
        "skills" => $row['skills'],
        "location" => $row['location'],
        "education" => $row['education'],
        "applied_jobid" => $row['applied_jobid'],
        "seeker_id" => $row['seeker_id'],
        "job_id" => $row['job_id'],
        "provider_name" => $row['provider_name'],
        "company_name" => $row['company_name'],
        "applied_date" => $row['applied_date'],
        "about"=>$row['about']
    ];
}

echo json_encode($data);
?>