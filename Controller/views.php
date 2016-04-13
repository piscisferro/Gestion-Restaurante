<?php
session_start();

if(!$_SESSION["logado"]) {
    header("Location: ../index.php?error=1");
}


switch ($_SESSION["tipo_usuario"]){
    
}