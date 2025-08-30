<?php
session_start();
session_unset();
session_destroy();
header("Location:../auth/seeker_login.html");
exit();
?>