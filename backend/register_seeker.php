<?php
include 'connect.php';
include 'dbcreate.php';
include 'tables.php';
if(isset($_POST['submit'])){
    $name=$_POST['name'];
    $email=$_POST['email'];
    $pass=$_POST['pass'];
    $hash_pass=password_hash($pass,PASSWORD_DEFAULT);
    $phone=$_POST['phone'];
    $age=$_POST['age'];
    $skills=$_POST['skills'];
    $sql="INSERT INTO seekers(name,email,password,phone,age,skills)
                VALUES('$name','$email','$hash_pass','$phone','$age','$skills')";
    $res=mysqli_query($con,$sql);
    if($res){
        echo "1 row inserted successfully";
    }
    else{
        echo "Error".mysqli_error($con);
    }
  }
?>