<?php
include 'connect.php';
include 'dbcreate.php';
include 'tables.php';
session_start();
if(isset($_POST['submit'])){
    $name=$_POST['name'];
    $email=$_POST['email'];
    $pass=$_POST['pass'];
    $hash_pass=password_hash($pass,PASSWORD_DEFAULT);
    $phone=$_POST['phone'];
    $education=$_POST['education'];
    $location=$_POST['location'];
    $age=$_POST['age'];
    $skills=$_POST['skills'];
    $sql=$con->prepare("INSERT INTO seekers(name,email,password,phone,location,education,age,skills)
                VALUES(?,?,?,?,?,?,?,?)");
    $sql->bind_param('sssissis',$name,$email,$hash_pass,$phone,$location,$education,$age,$skills);
    if($sql->execute()){
       $last_id=$con->insert_id;
       $_SESSION['seeker_id']=$last_id;
       header("Location:../jobseeker/dashboard.html");
       exit();
    }
    else{
        echo "Error".mysqli_error($con);
    }
  }
  $sql->close();
  $con->close();
?>