<?php
$con=mysqli_connect("localhost","root","",);
if(!$con){
    echo"connection error";
}
echo "connected";
$sql="CREATE DATABASE IF NOT EXISTS partconnectdb";
if (mysqli_query($con,$sql)){
  echo " created database successfully";
}
else{
    echo "creation error";
}
?>