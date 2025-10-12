<?php

session_start();
header('Content-Type: application/json');

include 'connection.php';


$input = json_decode(file_get_contents('php://input'), true);

$id = $input['id'];

$sql = "SELECT * FROM `seekers`where id = $id";

$res = mysqli_query($con,$sql);

$data = [];

while($row = mysqli_fetch_assoc($res)){
    $data =$row; 
}

echo json_encode(['status' => 'success', 'user' => $data]);

?>