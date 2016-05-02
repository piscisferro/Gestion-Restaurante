<?php
session_start();
// Importamos las clase necesarias
require_once '../../Model/pedido.php';


if (isset($_POST["hacerpago"])) {
    
    // Recuperamos el ultimo pedido abierto
    $pedido = Pedido::getUltimoPedidoAbierto($_SESSION["id_usuario"]);
    
    // Insertamos el pedido en la base de datos
    $resultado = $pedido->hacerPago();
    
    // Si el resultado es false significara que ha fallado sino, habra sido un exito
    if ($resultado == false) {
        echo "error";   
    } else {
        echo "success";
    }
} else { // Si no hemos enviado el ID simplemente aparecera error
    echo "error1";  
}



