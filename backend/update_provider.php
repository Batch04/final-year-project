<?php
header("Content-Type:application/json");
session_start();
$con=mysqli_connect("localhost","root","","partconnectdb");
if(!$con){
    echo json_encode(['status'=>'error','message'=>'Failed to connect']);
    exit;
}
if(isset($_SESSION['provider_id'])){
$provider_id=$_SESSION['provider_id'];
$company_name=$_POST['company_name']?? '';
$email=$_POST['contact-email']??'';
$description=$_POST['company-description']??'';
$phone=$_POST['contact-phone']?? '';
$location=$_POST['location']?? '';

if(empty($email)){
    echo json_encode(['status'=>'error','message'=>'Email is required']);
    exit;
}

$sql="UPDATE providers SET company_name='$company_name', email='$email',company_description='$description', contact_number='$phone', location='$location' WHERE provider_id='$provider_id'";
$res=mysqli_query($con,$sql);
if($res){
    if(mysqli_affected_rows($con)>0){

    
    echo json_encode(['status'=>'success','message'=>'Updated successfully']);}
    else{
        echo json_encode(['status'=>'error','message'=>'No changes made']);
    }
}
else{
    echo json_encode(['status'=>'error','message'=>'Failed to update']);
}
}
else{
    echo json_encode(['status'=>'error','message'=>'problem with sessions']);
}

?>