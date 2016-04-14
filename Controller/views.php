<?php
session_start();

// Importamos las clases de Comida, Bebida y Autoloader de Twig
require_once 'Twig/lib/Twig/Autoloader.php';
// Inicializamos Twig
Twig_Autoloader::register();
$loader = new Twig_Loader_Filesystem(__DIR__.'/../View');
$twig = new Twig_Environment($loader); 

if(!$_SESSION["logado"]) {
    header("Location: ../index.php?error=1");
}


switch ($_SESSION["tipo_usuario"]){
    
}