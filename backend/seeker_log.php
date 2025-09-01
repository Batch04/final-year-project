<?php
include 'connect.php';
include 'dbcreate.php';
include 'tables.php';
session_start();
if(isset($_POST['submit'])){
    $email=$_POST['email'];
    $pass=$_POST['pass'];
    $sql=$con->prepare("SELECT * FROM seekers WHERE email=?");
    $sql->bind_param("s",$email);
    $sql->execute();
    $res=$sql->get_result();
    if($res->num_rows>0){
        while($row=$res->fetch_assoc()){
            if(password_verify($pass,$row['password'])){
                $_SESSION['seeker_id']=$row['id'];
                header("Location:../jobseeker/dashboard.html");
                exit();
            }
            else{
                echo "Incorrect Password";
            }
        }
    }
    else{
        echo "No data found";
    }
    $sql->close();
    $con->close();
}

?>