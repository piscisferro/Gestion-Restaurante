<?php
// Importamos las clase y Autoloader de Twig
require_once '../../Model/producto.php';


if (isset($_POST["editProducto"])) {
    
    // Recuperamos el objeto para update luego en base de datos
    $producto = Producto::getProductoById($_POST["editProId"]);
    
    // Gestion de la imagen
    if (isset($_FILES["editProImg"]["name"]) && $_FILES["editProImg"]["name"]  !== "") {
    
        // Borramos la imagen del servidor
        unlink($_POST['defaultProImg']);
        // Le damos un nombre nuevo a la imagen
        $imgName = "img" . rand(100, 999) . time();
        // Explotamos el type de archivo para recoger su extension
        $tipo = explode('image/', $_FILES["editProImg"]["type"]);
        $extension = $tipo[1];
        // Direccion donde la guardaremos
        $imgDir = "../../Views/img/productos/" . $imgName . "." . $extension;
        // Subimos el archivo al server
        move_uploaded_file($_FILES["editProImg"]["tmp_name"], $imgDir);
    
       // Cambiamos la direccion de la imagen en el objeto
       $producto->setImgDir($imgDir); 
        
    } 
    
    // Cambiamos los atributos del objeto
    $producto->setNombre($_POST["editProNombre"]);
    $producto->setPrecio($_POST["editProPrecio"]);
    $producto->setDescripcion($_POST["editProDesc"]);
    $producto->setCategoria($_POST["editProCat"]);
    $producto->setTipo($_POST["editProTipo"]);
    
    // Hacemos Update y guardamos el resultado en una variable
    $resultado =  $producto->update();
    
    // Si el resultado es false significara que ha fallado sino, habra sido un exito
    if ($resultado == false) {
        echo "error";   
    } else {
        echo "success";
    }
} else { // Si no hemos enviado el ID simplemente aparecera error
    echo "error1";  
}