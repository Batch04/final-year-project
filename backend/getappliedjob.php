<?php

session_start();

include 'connection.php';

$seekerid = $_SESSION['seeker_id'];

$sql = "SELECT posted_jobs.* ,applied_job.applied_date FROM applied_job JOIN posted_jobs on applied_job.job_id = posted_jobs.job_id where applied_job.seeker_id = $seekerid";

$res = mysqli_query($con, $sql);
$appliedjobdata = [];
while ($row = mysqli_fetch_assoc($res)) {
    $appliedjobdata[] = [
        "jobs_id" => $row['job_id'],
        "provider_name" => $row['provider_name'],
        "job_title" => $row['job_title'],
        "job_type" => $row['job_type'],
        "job_location" => $row['job_location'],
        "job_salary" => $row['job_salary'],
        "job_salary_time" => $row['job_salary_time'],
        "job_experience" => $row['job_experience'],
        "job_posted" => $row['job_posted'],
        "job_description" => $row['job_description'],
        "job_benifits" => $row['job_benifits'],
        "job_status" => $row['job_status'],
        "company_name" => $row['company_name'],
        "workload" => $row['work_load'],
        "workperiod" => $row['work_period'],
        "applied_date"=>$row['applied_date']
    ];
}

header("Content-Type: application/json");
echo json_encode($appliedjobdata);


?>