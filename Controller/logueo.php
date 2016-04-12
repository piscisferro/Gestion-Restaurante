<!-- En este controlador controlaremos el logueo, recogeremos los datos del usuario
haremos una consulta en la base de datos para ver si el usuario existe, si existe,
recogeremos su categoria (admin, usuario o cocina), dependiendo de la categoria
ira a una pagina u otra. Si no existe se le devolvera a la pantalla de logueo con
un error-->

<?php

// Si por algun casual el usuario llega aqui sin haber pasado por la pantalla
// de login, volvera a la pantalla de logueo.
if (!isset($_SESSION["logado"])) {
    header ("Location: ../index.php");
}

// Si nos llega a través del formulario.
if (isset($_POST["submitLogIn"])) {
    
    $usuario = new Usuario($_POST["usuario"], $_POST["password"]);
    
} 



