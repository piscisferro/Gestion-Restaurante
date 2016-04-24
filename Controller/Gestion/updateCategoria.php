<?php
// Importamos las clase y Autoloader de Twig
require_once '../../Model/categoria.php';

if (isset($_POST["editCategoria"])) {
    
    // Recuperamos el objeto para update luego en base de datos
    $categoria = Categoria::getCategoriaById($_POST["editCatId"]);
    
    // Gestion de la imagen
    if (isset($_FILES["editCatImg"]["name"]) && $_FILES["editCatImg"]["name"]  !== "") {
    
        // Borramos la imagen del servidor
        unlink($_POST['defaultCatImg']);
        // Le damos un nombre nuevo a la imagen
        $imgName = "img" . rand(100, 999) . time();
        // Explotamos el type de archivo para recoger su extension
        $tipo = explode('image/', $_FILES["editCatImg"]["type"]);
        $extension = $tipo[1];
        // Direccion donde la guardaremos
        $imgDir = "../../Views/img/categorias/" . $imgName . "." . $extension;
        // Subimos el archivo al server
        move_uploaded_file($_FILES["editCatImg"]["tmp_name"], $imgDir);
    
       // Cambiamos la direccion de la imagen en el objeto
       $categoria->setImgDir($imgDir); 
        
    } 
    
    // Cambiamos el nombre por el del formulario
    $categoria->setNombre($_POST["editCatNombre"]);
    
    // Hacemos Update y guardamos el resultado en una variable
    $resultado =  $categoria->update();
    
    // Si el resultado es false significara que ha fallado sino, habra sido un exito
    if ($resultado == false) {
        echo "error";   
    } else {
        echo "success";
    }
} else { // Si no hemos enviado el ID simplemente aparecera error
    echo "error1";
}