<?php
session_start();
header("Content-Type:application/json");
error_reporting(E_ALL);
ini_set('display_errors', 1);
ob_clean();
include 'connection.php';
$data = json_decode(file_get_contents("php://input"), true);
$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$pass = $data['pass'] ?? '';
$hash_pass = password_hash($pass, PASSWORD_DEFAULT);
$phone = $data['phone'] ?? '';
$education = $data['education'] ?? '';
$location = $data['location'] ?? '';
$age = $data['age'] ?? '';
$skills = $data['skills'] ?? '';
try {
    $sql = $con->prepare("INSERT INTO seekers(name,email,password,phone,age,skills,location,education)
                VALUES(?,?,?,?,?,?,?,?)");
    $sql->bind_param('ssssisss', $name, $email, $hash_pass, $phone, $age, $skills, $location, $education);
    if ($sql->execute()) {
        $last_id = $con->insert_id;
        $_SESSION['seeker_id'] = $last_id;
        $_SESSION['seeker_name'] = $name;
        echo json_encode(['status' => 'success', 'message' => "Successfully Registered"]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to register']);
    }
}catch(Exception $e){
     echo json_encode(['status' => 'duplicate', 'message' => 'Failed to register', 'error' => $e]);
}

$con->close();
?>