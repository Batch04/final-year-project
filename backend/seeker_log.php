<?php
header('Content-Type:application/json');
include 'connect.php';
include 'dbcreate.php';
include 'tables.php';
session_start();
$data=json_decode(file_get_contents("php://input"),true);
    $email=$data['email']?? '';
    $pass=$data['pass']?? '';
    $sql=$con->prepare("SELECT * FROM seekers WHERE email=?");
    $sql->bind_param("s",$email);
    $sql->execute();
    $res=$sql->get_result();
    if($res->num_rows>0){
        while($row=$res->fetch_assoc()){
            if(password_verify($pass,$row['password'])){
                $_SESSION['seeker_id']=$row['id'];
                echo json_encode(['status'=>'success','message'=>'log in succesfully']);
                exit;
            }
            else{
                echo json_encode(['status'=>'error','message'=>'invalid login or Password']);
                exit;
            }
        }
    }
    
    else{
        echo json_encode(['status'=>'error','message'=>'No user found']);
    }
    $sql->close();
    $con->close();

?>