<?php
session_start();
session_unset();
session_destroy();
header("Location:../auth/provider_login.html");
exit();
?>