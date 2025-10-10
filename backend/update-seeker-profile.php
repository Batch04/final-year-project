<?php

session_start();
header('Content-Type: application/json');

include 'connection.php';

$seeker_id = $_SESSION['seeker_id'];
$input = json_decode(file_get_contents('php://input'), true);

$fullName = $input['name'];
$email = $input['email'];
$mobile = $input['mobile'];
$location = $input['location'];
$about = $input['about'];
$age = $input['age'];
$education = $input['education'];
$skills = $input['skills'];
$availability = $input['availability'];

$sql = "UPDATE seekers 
        SET 
            name = '$fullName',
            email = '$email',
            phone = '$mobile',
            age = '$age',
            skills = '$skills',
            location = '$location',
            about = '$about',
            education = '$education',
            availability = '$availability'
        WHERE id = $seeker_id";

$res = mysqli_query($con, $sql);
if ($res) {
    echo json_encode(['status' => 'success', 'message' => 'Profile updated successfully!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to update profile. Please try again.']);
}

?>