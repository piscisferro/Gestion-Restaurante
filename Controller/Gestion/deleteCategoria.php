<?php

// Importamos las clase y Autoloader de Twig
require_once '../../Model/categoria.php';
require_once '../Twig/lib/Twig/Autoloader.php';

// Si hemos enviado el Id
if (isset($_REQUEST["deleteId"])) {

    // Guardamos el ID en una variable
    $id = $_REQUEST["deleteId"];

    // Recuperamos el categoria por su Id y lo metemos en una variable
    $categoria = Categoria::getCategoriaById($id);
    
    // Borramos el categoria y guardamos el resultado
    $resultado = $categoria->delete();
    
    // Si el resultado es false significara que ha fallado sino, habra sido un exito
    if ($resultado == false) {
        echo "error";   
    } else {
        echo "success";
    }
} else { // Si no hemos enviado el ID simplemente aparecera error
    echo "error1";  
}