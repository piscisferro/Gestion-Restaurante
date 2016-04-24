<!-- En este controlador controlaremos el logueo, recogeremos los datos del usuario
haremos una consulta en la base de datos para ver si el usuario existe, si existe,
recogeremos su categoria (admin, usuario o cocina), dependiendo de la categoria
ira a una pagina u otra. Si no existe se le devolvera a la pantalla de logueo con
un error-->
<?php
session_start();
require_once "../Model/usuario.php";

// Si nos llega a través del formulario.
if (isset($_POST["submitLogIn"])) {
   
    $usuario = Usuario::getUsuario($_POST["usuario"], $_POST["password"]); 
    
    if (!$usuario) {
        header("Location: ../index.php?error=1");
    } else {
        $_SESSION["logado"] = true;
        $_SESSION["tipo_usuario"] = $usuario->getTipo(); 
        header("Location: ../Controller/Views/views.php");
    }
 
} 