<?php
// Importamos las clase y Autoloader de Twig
require_once '../../Model/categoria.php';


if (isset($_POST["newCategoria"])) {
    
    // Gestion de la imagen
    if (isset($_FILES["newCatImg"]["name"]) && $_FILES["newCatImg"]["name"]  !== "") {
    
        // Le damos un nombre nuevo a la imagen
        $imgName = "img" . rand(100, 999) . time();
        // Explotamos el type de archivo para recoger su extension
        $tipo = explode('image/', $_FILES["newCatImg"]["type"]);
        $extension = $tipo[1];
        // Direccion donde la guardaremos
        $imgDir = "../../Views/img/categorias/" . $imgName . "." . $extension;
        // Subimos el archivo al server
        move_uploaded_file($_FILES["newCatImg"]["tmp_name"], $imgDir);
    
    } else {  
        $imgDir = false; 
    }
    
    // Creamos el objeto para insertar luego en base de datos
    $categoria = new Categoria($_POST["newCatNombre"], $imgDir);
    
    // Guardamos el resultado en una variable despues de insertar
    $resultado =  $categoria->insert();
    
    // Si el resultado es false significara que ha fallado sino, habra sido un exito
    if ($resultado == false) {
        echo "error";   
    } else {
        echo "success";
    }
} else { // Si no hemos enviado el ID simplemente aparecera error
    echo "error1";  
}

