<?php

session_start();

include 'connection.php';

header('Content-Type: application/json');

$data = file_get_contents("php://input");
$resposnedata = json_decode($data, true);


$title = $resposnedata['jobTitle'];
$description = $resposnedata['jobDescription'];
$location = $resposnedata['location'];
$type = $resposnedata['jobType'];
$salary = $resposnedata['salaryAmount'];
$salary_time = $resposnedata['salaryPeriod'];
$experience = $resposnedata['experienceRequired'];
$benifits = $resposnedata['whatTheyOffer'];
$posted_date = $resposnedata['postedDate'];
$workload = $resposnedata['workload'];
$workperiod = $resposnedata['workperiod'];
$jobid = $resposnedata['jobid'];

$sql ="UPDATE posted_jobs
SET
    job_title = '$title',
    job_type = '$type',
    job_location = '$location',
    job_salary = $salary,
    job_salary_time = '$salary_time',
    job_experience = '$experience',
    job_posted = '$posted_date',
    job_description = '$description',
    job_benifits = '$benifits',
    work_load = '$workload',
    work_period = '$workperiod'
WHERE job_id = $jobid";

$jobinsert = mysqli_query($con, $sql);
if ($jobinsert) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Job posted successfully'
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to add job: ' . mysqli_error($con)
    ]);
}

mysqli_close($con);



?>