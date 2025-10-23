<?php
session_start();
header('Content-Type:application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);
ob_clean();
include 'connection.php';
$data = json_decode(file_get_contents("php://input"), true);
$company_name = $data['company_name'];
$email = $data['email'];
$pass = $data['pass'];
$hash_pass = password_hash($pass, PASSWORD_DEFAULT);
$address = $data['address'];
$location = $data['location'];
$description = $data['description'];
$contact_number = $data['contact_number'];
try {
    $sql = $con->prepare("INSERT INTO providers(company_name,email,password,address,location,contact_number,company_description) 
                VALUES(?,?,?,?,?,?,?)");
    $sql->bind_param('sssssis', $company_name, $email, $hash_pass, $address, $location, $contact_number, $description);

    if ($sql->execute()) {
        $_SESSION['provider_id'] = $con->insert_id;
        $_SESSION['company_name'] = $company_name;
        echo json_encode(['success' => true, 'provider' => ['id' => $con->insert_id, 'email' => $email]]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Database insert Failed' . $con->error]);
    }
} catch (Exception $e) {
    echo json_encode(['success' => "duplicate", 'message' => 'account is alredy there']);
}

$sql->close();
$con->close();
?>