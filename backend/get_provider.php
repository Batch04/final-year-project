<?php
include 'connection.php';
header("Content-Type:application/json");
session_start();

if (!isset($_SESSION['provider_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    exit;
}

$id = $_SESSION['provider_id']; 

$sql = "SELECT * FROM providers WHERE provider_id = $id";
$result = mysqli_query($con, $sql);

if ($result && mysqli_num_rows($result) > 0) {
    $data = mysqli_fetch_assoc($result);
    echo json_encode(['status' => 'success', 'user' => $data]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'User not found']);
}

mysqli_close($con);
?>
