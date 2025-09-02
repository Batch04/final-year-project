<?php
session_start();
header('Content-Type:application/json');
error_reporting(E_ALL);
ini_set('display_errors',1);
ob_clean();
include 'connect.php';
include 'dbcreate.php';
include 'tables.php';
    $company_name=$_POST['company_name'];
    $email=$_POST['email'];
    $pass=$_POST['pass'];
    $hash_pass=password_hash($pass,PASSWORD_DEFAULT);
    $address=$_POST['address'];
    $location=$_POST['location'];
    $contact_number=$_POST['contact_number'];
    $sql=$con->prepare("INSERT INTO providers(company_name,email,password,address,location,contact_number) 
                VALUES(?,?,?,?,?,?)");
    $sql->bind_param('sssssi',$company_name,$email,$hash_pass,$address,$location,$contact_number);
    if($sql->execute()){
        $_SESSION['provider_id']=$con->insert_id;
        echo json_encode(['success'=>true,'provider'=>['id'=>$con->insert_id,'email'=>$email]]);
    }
    else{
        echo json_encode(['success'=>false,'message'=>'Database insert Failed'.$con->error]);
    }
    $sql->close();
    $con->close();
?>