<?php
header("Content-Type:application/json");
session_start();
$con=mysqli_connect("localhost","root","","partconnectdb");
if(!$con){
    echo json_encode(['status'=>'error','message'=>'Failed to connect']);
    exit;
}
if(isset($_SESSION['seeker_id'])){
    $seeker_id=$_SESSION['seeker_id'];
    $fullName=$_POST['full-name']??'';
    $email=$_POST['email']??'';
    $mobile=$_POST['mobile']??'';
    $location=$_POST['location']??'';
    $education=$_POST['education']??'';
    $educationArray=json_decode($education,true);
    $skills=$_POST['skills']??'';
    $skillsArray=json_decode($skills,true);
    if(empty($email)){
        echo json_encode(['status'=>'error','message'=>'email is empty']);
        exit;
    }
$sql="UPDATE seekers SET name='$fullName', email='$email',phone='$mobile',location='$location',education='$education',skills='$skills' WHERE id='$seeker_id'";
$res=mysqli_query($con,$sql);
if($res){
    if(mysqli_affected_rows($con)>0){
        echo json_encode(['status'=>'success','message'=>'Updated Successfully']);
    }
    else{
        echo json_encode(['status'=>'error','message'=>'No changes made']);
    }
}
else{
    echo json_encode(['status'=>'error','message'=>'Failed to update']);
}
}
else{
    echo json_encode(['status'=>'error','message'=>'Error with session']);
}
?>