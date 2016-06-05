<?php
session_start();
// Importamos las clase necesarias
require_once '../../Model/pedido.php';


if (isset($_POST["hacerpago"])) {
    
    // Recuperamos el ultimo pedido abierto
    $pedido = Pedido::getUltimoPedido($_SESSION["id_usuario"]);
    $resultado=false;
    
    if (!$pedido) {
        echo "success";
        return;
    } else {
        
       $abierto = $pedido->getAbierto();
        if ($abierto == "A") {
            // Insertamos el pedido en la base de datos
            $resultado = $pedido->hacerPago();
        }
    } 
} else { // Si no hemos enviado el ID simplemente aparecera error
    echo "error1";  
}



