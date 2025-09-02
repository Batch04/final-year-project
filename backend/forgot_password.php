<?php
include 'connect.php';
include 'dbcreate.php';
include 'tables.php';

$data = json_decode(file_get_contents("php://input"), true);
$email = $data["email"];
$newPassword = $data["newPassword"];

// hash password
$hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
$sql = $con->prepare("UPDATE seekers SET password=? WHERE email=?");
$sql->bind_param("ss", $hashedPassword, $email);
$sql->execute();

if ($sql->affected_rows > 0) {
    echo json_encode(["message" => "Password changed successfully!"]);
} else {
        $sql=$con->prepare("UPDATE providers SET password=? WHERE email=?");
        $sql->bind_param('ss',$hashedPassword,$email);
        $sql->execute();
        if($sql->affected_rows>0){
            echo json_encode(["message"=>"Password Changed Successfully"]);
        }else{
    echo json_encode(["message" => "Email not found."]);
        }
}
?>