<?php
session_start();
include 'connect.php';
include 'dbcreate.php';
include 'tables.php';
header('Content-Type:application/json');
if($_SERVER["REQUEST_METHOD"]=="POST"){
            if(isset($_SESSION['provider_id'])){
                $provider_id=$_SESSION['provider_id'];
                $title=$_POST['jobTitle'];
                $description=$_POST['jobDescription'];
                $location=$_POST['location'];
                $type=$_POST['jobType'];
                $salary= $_POST['salaryAmount'];
                $sql=$con->prepare("INSERT INTO jobs(provider_id,title,description,location,type,salary)
                        VALUES(?,?,?,?,?,?)");
                $sql->bind_param("isssss",$provider_id,$title,$description,$location,$type,$salary);
                if ($sql->execute()){
                    $job_id=$con->insert_id;

                    echo json_encode(['status'=>'success','message'=>'job posted successfully','job_id'=>$job_id]);
                }
                else{
                    echo json_encode(['status'=>'error','message'=>'failed to add job']);
                }
                $sql->close();
                $con->close();
}
}
?>