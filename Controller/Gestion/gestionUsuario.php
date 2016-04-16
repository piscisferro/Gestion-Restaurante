<?php
session_start();

// Si no esta logueado o no es administrador, ira a la pagina de logout.
if(!$_SESSION["logado"] || !$_SESSION["tipo_usuario"] == "administrador") {
   header("Location: logout.php");
}

$data["target"] = usuarios;
$data["usuarios"] = Usuario::getAllUsuarios();


$twig->render('gestionApp.html.twig', $data);