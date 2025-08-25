<?php
$host="localhost";
$username="root";
$pass="";
$con=mysqli_connect($host,$username,$pass);
if ($con){
    echo "connected successfully";
}
else{
    echo "connection error";
}
?>
