<?php
session_start();

require_once '../../Model/usuario.php';
require_once '../Twig/lib/Twig/Autoloader.php';

// Inicializamos Twig
Twig_Autoloader::register();
$loader = new Twig_Loader_Filesystem(__DIR__.'/../../Views');
$twig = new Twig_Environment($loader); 

// Si no esta logueado o no es administrador, ira a la pagina de logout.
if(!$_SESSION["logado"] || !$_SESSION["tipo_usuario"] == "administrador") {
   header("Location: logout.php");
}

$data["target"] = "usuarios";
$data["usuarios"] = Usuario::getAllUsuarios();


if (isset($_POST["ajax"])){
    echo $twig->render('Gestion/listadousuarios.html.twig', $data);
} else {
    echo $twig->render('Gestion/gestionApp.html.twig', $data);
}