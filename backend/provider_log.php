<?php
include 'connect.php';
include 'dbcreate.php';
include 'tables.php';
header("Content-Type:application/json");
session_start();

    $email=$_POST['email'];
    $pass=$_POST['pass'];
    $sql=$con->prepare("SELECT * FROM providers WHERE email=? ");
    $sql->bind_param('s',$email);
    $sql->execute();
    $res=$sql->get_result();
    if($res->num_rows>0){
        while($row=$res->fetch_assoc()){
            if(password_verify($pass,$row['password'])){
                $_SESSION['provider_id']=$row['provider_id'];
                echo json_encode(['status'=>'success']);
            }
            else{
                echo json_encode(['status'=>'error','message'=>'invalid login']);
            }
        }
    }
    else{
        echo "No data found";
    }
$sql->close();
$con->close();
?>