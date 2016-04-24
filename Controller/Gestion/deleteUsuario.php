<?php

// Importamos las clase y Autoloader de Twig
require_once '../../Model/usuario.php';

// Si hemos enviado el Id
if (isset($_REQUEST["deleteId"])) {

    // Guardamos el ID en una variable
    $id = $_REQUEST["deleteId"];

    // Recuperamos el usuario por su Id y lo metemos en una variable
    $usuario = Usuario::getUsuarioById($id);
    
    // Borramos el usuario y guardamos el resultado
    $resultado = $usuario->delete();
    
    // Si el resultado es false significara que ha fallado sino, habra sido un exito
    if ($resultado == false) {
        echo "error";   
    } else {
        echo "success";
    }
} else { // Si no hemos enviado el ID simplemente aparecera error
    echo "error1";  
}