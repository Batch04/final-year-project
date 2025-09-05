<?php
session_start();

$con = mysqli_connect("localhost", "root", "", "partconnectdb");

header('Content-Type: application/json');

$data = file_get_contents("php://input");
$resposnedata = json_decode($data, true);


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $provider_id = $_SESSION['provider_id'];
    $title = $resposnedata['jobTitle'];
    $description = $resposnedata['jobDescription'];
    $location = $resposnedata['location'];
    $type = $resposnedata['jobType'];
    $salary = $resposnedata['salaryAmount'];
    $salary_time = $resposnedata['salaryPeriod'];
    $experience = $resposnedata['experienceRequired'];
    $benifits = $resposnedata['whatTheyOffer'];
    $posted_date = $resposnedata['postedDate'];
    $sql = "insert into  posted_jobs (provider_name, job_title,job_type, job_location,job_salary,job_salary_time,job_experience,job_posted,job_description,job_benifits,job_status) 
                values ('$provider_id', '$title', '$type', '$location', $salary,'$salary_time', '$experience', '$posted_date', '$description', '$benifits','open')";


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
}
?>