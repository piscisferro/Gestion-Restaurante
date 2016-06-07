<?php
session_start();
// Importamos las clase necesarias
require_once '../Twig/lib/Twig/Autoloader.php';
require_once '../../Model/pedido.php';

// Inicializamos Twig
Twig_Autoloader::register();
$loader = new Twig_Loader_Filesystem(__DIR__.'/../../Views');
$twig = new Twig_Environment($loader);

if (isset($_POST["recpedido"])) {
    
    $pedido= Pedido::getProductosUltimoPedido($_POST["idusuario"]);
    
    if (!$pedido) {
        // Creamos el objeto pedido
        $pedido = new Pedido(null, $_POST["idusuario"], 'A');
    
        // Insertamos el pedido en la base de datos
        $resultado = $pedido->insert();
    
        // Si el resultado es false significara que ha fallado sino, habra sido un exito
        if ($resultado == false) {
            echo "error";
        } else {
        
            $pedido= Pedido::getUltimoPedidoAbierto($_POST["idusuario"]);

            $datos["pedido"] = $pedido->getId();
            $datos["iddetpedido"] = false;
            $datos["producto"] = false;
            $datos["precio"] = 0;
            $datos["idusuario"] = $_POST["idusuario"];
            $datos["usuario"] = $_POST["usuario"];
            $datos["tipousuario"] = false;

            $data["datos"][1] = $datos;
            echo $twig->render('Workspace/pedidoWS.html.twig', $data);
        }
    } else {

        $data["datos"] = $pedido;
        echo $twig->render('"orkspace/pedidoWS.html.twig', $data);
    }
} else { // Si no hemos enviado el ID simplemente aparecera error
    echo "error1";  
}

