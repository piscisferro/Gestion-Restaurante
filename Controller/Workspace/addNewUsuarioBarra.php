<?php
session_start();
// Importamos las clase necesarias
require_once '../Twig/lib/Twig/Autoloader.php';
require_once '../../Model/usuario.php';

// Inicializamos Twig
Twig_Autoloader::register();
$loader = new Twig_Loader_Filesystem(__DIR__.'/../../Views');
$twig = new Twig_Environment($loader);

if (isset($_POST["newUser"])) {
    // Creamos el objeto pedido
    $usuario = new Usuario($_POST["usuario"], "usuario", $_POST["tipo"]);
    
    // Insertamos el pedido en la base de datos
    $resultado = $usuario->insert();
    
    // Si el resultado es false significara que ha fallado sino, habra sido un exito
    if ($resultado == false) {
        echo "error";   
    } else {
        
        $data["usuarios"][0] = Usuario::getUsuario($_POST["usuario"], "usuario");
        echo $twig->render('Workspace/listadoUsuariosBarra.html.twig', $data);
    }
} else { // Si no hemos enviado el ID simplemente aparecera error
    echo "error1";  
}

