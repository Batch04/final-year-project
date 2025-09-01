<?php
session_start();
include 'connect.php';
include 'dbcreate.php';
include 'tables.php';
if((isset($_POST['submit']))&& ( isset($_SESSION['provider_id']))){
    $provider_id=$_SESSION['provider_id'];
    $title=$_POST['title'];
    $description=$_POST['description'];
    $location=$_POST['location'];
    $type=$_POST['type'];
    $salary= $_POST['salary'];
    $sql=$con->prepare("INSERT INTO jobs(provider_id,title,description,location,type,salary)
            VALUES(?,?,?,?,?,?)");
    $sql->bind_param("isssss",$provider_id,$title,$description,$location,$type,$salary);
    if ($sql->execute()){
        $job_id=$sql->insert_id;
        echo json_encode(['status'=>'success','message'=>'job posted successfully']);
    }
    else{
        echo json_encode(['status'=>'error','message'=>'failed to add job']);
    }
    $sql->close();
    $con->close();
}
?>