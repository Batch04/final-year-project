<?php

session_start();
header('Content-Type: application/json');

include 'connection.php';

$provider_id = $_SESSION['provider_id'];

$input = json_decode(file_get_contents('php://input'), true);

$company_name = $input['companyname'];
$email = $input['email'];
$location = $input['location'];
$contact_number = $input['phone'];
$company_description = $input['description'];

$sql = "UPDATE providers 
        SET 
            company_name = '$company_name',
            email = '$email',
            location = '$location',
            contact_number = '$contact_number',
            company_description = '$company_description'
        WHERE provider_id = $provider_id";

$res = mysqli_query($con,$sql);

if ($res) {
    echo json_encode(['status' => 'success', 'message' => 'Profile updated successfully!']);
    $_SESSION['company_name'] = "$company_name";
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to update profile. Please try again.']);
}

?>