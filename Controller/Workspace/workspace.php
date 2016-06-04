<?php

session_start();

// Importamos Autoloader de Twig
require_once '../Twig/lib/Twig/Autoloader.php';
require_once '../../Model/pedido.php';
require_once '../../Model/usuario.php';
require_once '../../Model/producto.php';
require_once '../../Model/categoria.php';

// Inicializamos Twig
Twig_Autoloader::register();
$loader = new Twig_Loader_Filesystem(__DIR__.'/../../Views');
$twig = new Twig_Environment($loader);


if (isset($_SESSION["logado"])) {
    if(!$_SESSION["logado"] || !$_SESSION["tipo_usuario"] == "administrador") {
    header("Location: ../logout.php");
    }
} else {
    header("Location: ../logout.php");
}


$data["admin"] = true;

$data["usuarios"] = Usuario::getUsuariosBarra();
$data["datos"] = Pedido::getPedidosAbiertos();
$data["categorias"] = Categoria::getAllCategorias();
$data["productos"] = Producto::getAllProductos();


echo $twig->render('Workspace/workspace.html.twig', $data);