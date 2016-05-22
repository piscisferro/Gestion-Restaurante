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


if (isset($_POST["newdetpedido"])) {
    
    // Recuperamos el ultimo pedido abierto
    $pedido = Pedido::getUltimoPedidoAbierto($_POST["idusuario"]);
    
    // Creamos un array con los productos
    foreach ($_POST["productos"] as $id) {
        $productos[] = Producto::contructOnlyId($id);
    }
    
    // Guardamos los productos en el pedido
    $pedido->setProductos($productos);
    
    // Insertamos los productos en la base de datos como detalle de pedido
    $resultado = $pedido->insertDetPedido();
    
    // Si el resultado es false significara que ha fallado sino, habra sido un exito
    if ($resultado == false) {
        echo "error";   
    } else {
        
        $data["usuarios"] = Usuario::getUsuariosBarra();
        $data["datos"] = Pedido::getPedidosAbiertos();
        $data["categorias"] = Categoria::getAllCategorias();
        $data["productos"] = Producto::getAllProductos();

        echo $twig->render('workspace/pedidoWS.html.twig', $data);
        
        
    }
} else { // Si no hemos enviado el ID simplemente aparecera error
    echo "error1";  
}
