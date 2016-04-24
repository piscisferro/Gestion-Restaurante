<?php
// Importamos las clase y Autoloader de Twig
require_once '../../Model/usuario.php';

if (isset($_POST["addusuario"])) {
    
    // Creamos el objeto para insertar luego en base de datos
    $usuario = new Usuario($_POST["newusuario"], $_POST["newpassword"], $_POST["newtipo"]);
    
    // Guardamos el resultado en una variable despues de insertar
    $resultado =  $usuario->insert();
    
    // Si el resultado es false significara que ha fallado sino, habra sido un exito
    if ($resultado == false) {
        echo "error";   
    } else {
        echo "success";
    }
} else { // Si no hemos enviado el ID simplemente aparecera error
    echo "error1"; 
}