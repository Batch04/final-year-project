<?php
$con=mysqli_connect("localhost","root","",);
$sql="CREATE DATABASE IF NOT EXISTS partconnectdb";
$res=mysqli_query($con,$sql);

?>