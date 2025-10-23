<?php
    session_start();

    include 'connection.php';

    $raw = file_get_contents("php://input");
    $data = json_decode($raw,true);

    $id = $data['id'];
    $title = $data['title'];
    $state = $data['state'];
    $seekerid = $_SESSION['seeker_id'];

    if($state == "save"){
        $sql = "insert into saved_jobs (seeker_id,job_id,job_title)values($seekerid,$id,'$title')";
        $res = mysqli_query($con,$sql);
        if($res){
            echo json_encode(["status"=>"success" , "state"=>"inserted"]);
        }
    }
    else{
        $sql = "delete from saved_jobs where job_id =$id";
        $res = mysqli_query($con,$sql);
        if($res){
            echo json_encode(["status"=>"success" , "state"=>"deleted"]);
        }
    }

?>