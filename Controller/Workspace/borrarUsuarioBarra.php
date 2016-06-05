<?php
session_start();
// Importamos las clase necesarias
require_once '../Twig/lib/Twig/Autoloader.php';
require_once '../../Model/usuario.php';

// Inicializamos Twig
Twig_Autoloader::register();
$loader = new Twig_Loader_Filesystem(__DIR__.'/../../Views');
$twig = new Twig_Environment($loader);

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
        
        $data["usuarios"][0] = Usuario::getUsuario($_POST["usuario"], "usuario");
        echo $twig->render('workspace/listadoUsuariosBarra.html.twig', $data);
    }
} else { // Si no hemos enviado el ID simplemente aparecera error
    echo "error1";  
}