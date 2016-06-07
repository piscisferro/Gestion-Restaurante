<?php
session_start();

require_once '../../Model/pedido.php';
require_once '../Twig/lib/Twig/Autoloader.php';

// Inicializamos Twig
Twig_Autoloader::register();
$loader = new Twig_Loader_Filesystem(__DIR__.'/../../Views');
$twig = new Twig_Environment($loader); 

if ($_SESSION["logado"] != true) {
    header("Location: logout.php");
}

if ($_SESSION["tipo_usuario"] == "administrador") {
    $data["admin"] = true;
}

$data["datos"] = Pedido::getProductosPorServir();

if (isset($_POST["ajax"])){
    echo $twig->render('Cocina/listadococina.html.twig', $data);
} else {
    echo $twig->render('Cocina/cocina.html.twig', $data);
}

?>