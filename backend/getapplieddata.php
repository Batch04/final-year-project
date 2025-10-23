<?php

    session_start();

    include 'connection.php';
    $seekerid = $_SESSION['seeker_id'];

    $sql = "select * from applied_job where seeker_id = $seekerid";

    $res = mysqli_query($con,$sql);

    $data =[];
    while($row = mysqli_fetch_assoc($res)){

        $data[] = $row;
    }

    echo json_encode(['status'=>'sucess','data'=>$data]);

?>