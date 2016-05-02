<?php
session_start();

// Importamos las clase necesarias
require_once '../../Model/pedido.php';
require_once '../../Model/producto.php';


if (isset($_POST["newdetpedido"])) {
    
    // Recuperamos el ultimo pedido abierto
    $pedido = Pedido::getUltimoPedidoAbierto($_SESSION["id_usuario"]);
    
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
        echo "success";
    }
} else { // Si no hemos enviado el ID simplemente aparecera error
    echo "error1";  
}
