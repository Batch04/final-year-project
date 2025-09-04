<?php
error_log("RAW INPUT:".file_get_contents("php://input"));
include 'connect.php';
include 'dbcreate.php';
include 'tables.php';

$data = json_decode(file_get_contents("php://input"), true);
if(!is_array($data)){
    echo json_encode(['status'=>'error','message'=>'Invalid JSON input']);
    exit;
}
$email = $data['email']?? '';
$token = $data['token'] ?? '';
$password = $data['password']?? ''  ;

if(empty($email) || empty($token) || empty($password)){
    echo json_encode(["status"=>"error","message"=>"All fields required"]);
    exit;
}

// Validate token
$query = "SELECT * FROM reset_tokens WHERE email=? AND reset_token=? AND expires_at > NOW() ORDER BY id DESC LIMIT 1";
$sql = $con->prepare($query);
$sql->bind_param("ss", $email, $token);
$sql->execute();
$result = $sql->get_result();

if($result->num_rows == 0){
    echo json_encode(["status"=>"error","message"=>"Invalid or expired token"]);
    exit;
}

$row = $result->fetch_assoc();
$user_id = $row['user_id'];
$user_type = $row['user_type'];

// Hash password
$hashed = password_hash($password, PASSWORD_DEFAULT);

// Update password in correct table
if($user_type === "seeker"){
    $update = $con->prepare("UPDATE seekers SET password=? WHERE id=?");
    $update->bind_param("si", $hashed, $user_id);
} else {
    $update = $con->prepare("UPDATE providers SET password=? WHERE provider_id=?");
    $update->bind_param("si", $hashed, $user_id);
}

$update->execute();

// Optional: delete used token
$con->query("DELETE FROM reset_tokens WHERE id='".$row['id']."'");

echo json_encode(["status"=>"success","message"=>"Password reset successfully"]);
?>