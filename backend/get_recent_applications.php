<?php
session_start();
header("Content-Type:application/json");
include 'connect.php';
include 'dbcreate.php';
include 'tables.php';


if(!isset($_SESSION['provider_id'])){
    echo json_encode(['status'=>'error','message'=>'unauthorized']);
    exit;
}
$provider_id=$_SESSION['provider_id'];
$query="SELECT a.application_id,a.status,a.applied_at,
                s.name AS seeker_name,s.email AS seeker_email,
                j.job_title AS job_title
        FROM applications a
        INNER JOIN posted_jobs j ON a.job_id=j.job_id
        INNER JOIN seekers s ON a.seeker_id=s.id
        WHERE j.provider_id=?
        ORDER BY a.applied_at DESC
        LIMIT 5";
   $sql=$con->prepare($query);
   $sql->bind_param("i",$provider_id);
   $sql->execute();
   $res=$sql->get_result();
   
   $applications=[];
   while($row=$res->fetch_assoc()){
    $applications[]=$row;
   }
   echo json_encode(['status'=>'success','applications'=>$applications]);
?>