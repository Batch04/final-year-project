<?php

session_start();
include 'connection.php';

header('Content-Type: application/json');

$provider_id = $_SESSION['provider_id'];

$sql = " SELECT s.*, aj.* FROM seekers s JOIN ( SELECT * FROM applied_job WHERE provider_name =$provider_id  ORDER BY applied_date DESC LIMIT 4 ) aj ON s.id=aj.seeker_id";


$res = mysqli_query($con, $sql);
$data = [];

while ($row = mysqli_fetch_assoc($res)) {
    $data[] = [
        'id' => $row['id'],
        'name' => $row['name'],
        'email' => $row['email'],
        'phone' => $row['phone'],
        'location' => $row['location'],
        'education' => $row['education'],
        'seeker_id' => $row['seeker_id'],
        'job_id' => $row['job_id'],
        'provider_name' => $row['provider_name'],
        'company_name' => $row['company_name'],
        'applied_date' => $row['applied_date']
    ];
}

echo json_encode($data);

?>