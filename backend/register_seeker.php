<?php
session_start();
header("Content-Type:application/json");
error_reporting(E_ALL);
ini_set('display_errors', 1);
ob_clean();
include 'connect.php';
include 'dbcreate.php';
include 'tables.php';
$data=json_decode(file_get_contents("php://input"),true);
    $name=$data['name']?? '';
    $email=$data['email']?? '';
    $pass=$data['pass']?? '';
    $hash_pass=password_hash($pass,PASSWORD_DEFAULT);
    $phone=$data['phone']?? '';
    $education=$data['education']?? '';
    $location=$data['location']?? '';
    $age=$data['age']?? '';
    $skills=$data['skills']?? '';
    $sql=$con->prepare("INSERT INTO seekers(name,email,password,phone,location,education,age,skills)
                VALUES(?,?,?,?,?,?,?,?)");
    $sql->bind_param('ssssssis',$name,$email,$hash_pass,$phone,$location,$education,$age,$skills);
    if($sql->execute()){
       $last_id=$con->insert_id;
       $_SESSION['seeker_id']=$last_id;
       echo json_encode(['status'=>'success','message'=>"Successfully Registered"]);
    }
    else{
        echo json_encode(['status'=>'error','message'=>'Failed to register']);
    }
    $sql->close();
$con->close();
?>