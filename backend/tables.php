<?php
$con=mysqli_connect("localhost","root","","partconnectdb");
if(!$con){
    echo "connection error";
}
echo "connected";
$sql="CREATE TABLE IF NOT EXISTS seekers(
id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
phone INT(10) NOT NULL ,
age INT(5) NOT NULL,
skills TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";
if(mysqli_query($con,$sql)){
    echo "seeker table created";
}
else{
    echo "creation error";
}
$sql2="CREATE TABLE  IF NOT EXISTS providers(
provider_id INT AUTO_INCREMENT PRIMARY KEY,
company_name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
address VARCHAR(255) NOT NULL,
location VARCHAR(255) NOT NULL,
contact_number VARCHAR(20),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";
if(mysqli_query($con,$sql2)){
    echo "provider table created";
}
else{
    echo "error";
}
$sql3="CREATE TABLE  IF NOT EXISTS jobs(
job_id INT AUTO_INCREMENT PRIMARY KEY,
provider_id INT NOT NULL,
title VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
location VARCHAR(255) NOT NULL,
type VARCHAR(255) NOT NULL,
salary VARCHAR(100),
status ENUM('ACTIVE','PAUSED') DEFAULT 'ACTIVE',
posted_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY(provider_id) REFERENCES
 providers(provider_id)ON DELETE CASCADE)";
 $res=mysqli_query($con,$sql3);
if($res){
    echo "Jobs table created";
}
else{
    echo "Error";
}
?>