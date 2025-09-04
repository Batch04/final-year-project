<?php
$con=mysqli_connect("localhost","root","","partconnectdb");

//seekers table
$sql="CREATE TABLE IF NOT EXISTS seekers(
id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
phone INT(10) NOT NULL ,
age INT(5) NOT NULL,
skills TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";
$res=mysqli_query($con,$sql);

//providers table
$sql2="CREATE TABLE  IF NOT EXISTS providers(
provider_id INT AUTO_INCREMENT PRIMARY KEY,
company_name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
address VARCHAR(255) NOT NULL,
location VARCHAR(255) NOT NULL,
contact_number VARCHAR(20),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";
$res=mysqli_query($con,$sql2);

//jobs table
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

//reset_tokens table
 $sql4="CREATE TABLE IF NOT EXISTS reset_tokens(
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            user_type ENUM('seeker','provider') NOT NULL,
            email VARCHAR(255) NOT NULL,
            otp VARCHAR(6) NOT NULL,
            reset_token VARCHAR(64) DEFAULT NULL,
            expires_at DATETIME NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";
$res=mysqli_query($con,$sql4);

//applications table
$sql5="CREATE TABLE  IF NOT EXISTS applications(
application_id INT AUTO_INCREMENT PRIMARY KEY,
job_id INT NOT NULL,
seeker_id INT NULL,
status ENUM('Pending','Accepted','Rejected') DEFAULT 'pending',
applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (job_id) REFERENCES jobs(job_id) ON DELETE CASCADE,
FOREIGN KEY (seeker_id) REFERENCES seekers(id) ON DELETE CASCADE)";
$res=mysqli_query($con,$sql5);


?>