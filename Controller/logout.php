<?php
session_start();

$_SESSION["logado"] = false;
unset($_SESSION["tipo_usuario"]);

header("Location: ../index.php");
