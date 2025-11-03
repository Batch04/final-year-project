<?php
session_start();
header('Content-Type: application/json');
include 'connection.php';

// Read JSON data from request
$data = json_decode(file_get_contents("php://input"), true);

$company_name = $data['company_name'] ?? '';
$email = $data['email'] ?? '';
$pass = $data['pass'] ?? '';
$address = $data['address'] ?? '';
$location = $data['location'] ?? '';
$description = $data['description'] ?? '';
$contact_number = $data['contact_number'] ?? '';

$hash_pass = password_hash($pass, PASSWORD_DEFAULT);

try {
    $sql = $con->prepare("INSERT INTO providers (company_name, email, password, address, location, contact_number, company_description) 
                          VALUES (?, ?, ?, ?, ?, ?, ?)");
    $sql->bind_param('sssssss', $company_name, $email, $hash_pass, $address, $location, $contact_number, $description);

    if ($sql->execute()) {
        $_SESSION['provider_id'] = $con->insert_id;
        $_SESSION['company_name'] = $company_name;
        echo json_encode([
            'success' => true,
            'provider' => [
                'id' => $con->insert_id,
                'email' => $email
            ]
        ]);
    } else {
        // Check for duplicate entry error
        if ($con->errno === 1062) {
            echo json_encode(['success' => 'duplicate', 'message' => 'Account already exists']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Database insert failed: ' . $con->error]);
        }
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
} finally {
    if (isset($sql) && $sql instanceof mysqli_stmt) {
        $sql->close();
    }
    $con->close();
}
?>
