<?php
session_start();
// Importamos las clase necesarias
require_once '../Twig/lib/Twig/Autoloader.php';
require_once '../../Model/pedido.php';

// Inicializamos Twig
Twig_Autoloader::register();
$loader = new Twig_Loader_Filesystem(__DIR__.'/../../Views');
$twig = new Twig_Environment($loader);

// Si hemos enviado el Id
if (isset($_POST["id"])) {

    // Guardamos el ID en una variable
    $id = $_POST["id"];

    // Borramos el usuario y guardamos el resultado
    $resultado = Pedido::borrarDetPedido($_POST["id"]);
    
    // Si el resultado es false significara que ha fallado sino, habra sido un exito
    if ($resultado == false) {
        echo "error";   
    } else {
        
        echo "success";
    }
} else { // Si no hemos enviado el ID simplemente aparecera error
    echo "error1";  
}