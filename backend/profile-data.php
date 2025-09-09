<?php

header("Content-Type:application/json");

include 'connect.php';
include 'dbcreate.php';

$resposnedata = json_decode(file_get_contents("php://input"), true);



?>