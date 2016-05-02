<?php

session_start();

// Importamos Autoloader de Twig
require_once '../Twig/lib/Twig/Autoloader.php';
require_once '../../Model/pedido.php';
require_once '../../Model/producto.php';

// Inicializamos Twig
Twig_Autoloader::register();
$loader = new Twig_Loader_Filesystem(__DIR__.'/../../Views');
$twig = new Twig_Environment($loader); 


$pedido = Pedido::getUltimoPedidoAbierto($_SESSION["id_usuario"]);

if ($pedido) {
    $pedido->getProductosPedido();
} 
$data["pedidos"] = $pedido;

echo $twig->render('app/pedido.html.twig', $data);

