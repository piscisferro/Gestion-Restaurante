<?php
session_start();

require_once '../../Model/categoria.php';
require_once '../../Model/producto.php';
require_once '../Twig/lib/Twig/Autoloader.php';

// Inicializamos Twig
Twig_Autoloader::register();
$loader = new Twig_Loader_Filesystem(__DIR__.'/../../Views');
$twig = new Twig_Environment($loader); 

// Si no esta logueado o no es administrador, ira a la pagina de logout.
if(!$_SESSION["logado"] || !$_SESSION["tipo_usuario"] == "administrador") {
   header("Location: logout.php");
}



$data["target"] = "productos";
$data["categorias"] = Categoria::getAllCategorias();
$data["productos"] = Producto::getAllProductos();


if (isset($_POST["ajax"])){
    echo $twig->render('Gestion/listadoproductos.html.twig', $data);
} else {
    echo $twig->render('Gestion/gestionApp.html.twig', $data);
}
