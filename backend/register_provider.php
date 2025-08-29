<?php
include 'connect.php';
include 'dbcreate.php';
include 'tables.php';
if(isset($_POST['submit'])){
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
        header("Location:../jobprovider/dashboard.html");
        exit();
    }
    else{
        echo "Error".mysql_error($con);
    }
    $sql->close();
    $con->close();
}
?>