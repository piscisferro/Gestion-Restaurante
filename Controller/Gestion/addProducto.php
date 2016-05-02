<?php
// Importamos las clase necesarias
require_once '../../Model/producto.php';


if (isset($_POST["newProducto"])) {
    
    // Gestion de la imagen
    if (isset($_FILES["newProImg"]["name"]) && $_FILES["newProImg"]["name"]  !== "") {
    
        // Le damos un nombre nuevo a la imagen
        $imgName = "img" . rand(100, 999) . time();
        // Explotamos el type de archivo para recoger su extension
        $tipo = explode('image/', $_FILES["newProImg"]["type"]);
        $extension = $tipo[1];
        // Direccion donde la guardaremos
        $imgDir = "../../Views/img/productos/" . $imgName . "." . $extension;
        // Subimos el archivo al server
        move_uploaded_file($_FILES["newProImg"]["tmp_name"], $imgDir);
    
    } else {  
        $imgDir = false; 
    }
    
    // Creamos el objeto para insertar luego en base de datos
    $producto =new Producto($_POST["newProNombre"], $_POST["newProTipo"], $_POST["newProDesc"], $_POST["newProPrecio"], $imgDir, $_POST["newProCat"]);
    
    // Guardamos el resultado en una variable despues de insertar
    $resultado =  $producto->insert();
    
    // Si el resultado es false significara que ha fallado sino, habra sido un exito
    if ($resultado == false) {
        echo "error";   
    } else {
        echo "success";
    }
} else { // Si no hemos enviado el ID simplemente aparecera error
    echo "error1"; 
}
