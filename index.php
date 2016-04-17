<!-- Aqui estara la pantalla de login, dependiendo quien se 
loguee se redirigira a un sitio u otro. Si es cocinero se
redireccionara a cocina, si es usuario se redireccionara a 
users.php, si es admin a views.php 

Tambien se incluira un video de comida en el fondo mientras se loguea-->


<?php 
// Empezamos la sesion
session_start();

// Si no existe la variable para el logueo la creamos como false
if (!isset($_SESSION['logado'])) {
    $_SESSION['logado'] = false;
}

// Si entramos y ya estamos logueados nos redirigira al controlador logueo.php
// Ahi determinaremos que tipo de logueo tiene el usuario.
if ($_SESSION['logado'] == true) {
    header("Location: Controller/views.php");
}

require_once "Model/usuario.php";

?>
<!DOCTYPE html>
<html lang="">
    <head>
        <title>Log-In</title>
        <meta name="Author" content="Juan Jose Fernandez Romero"/>
        <meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="Views/css/style.css">
        <script type="text/javascript" src="Views/js/javscript.js"></script>
    </head>
    <body>
        <div class="container">
            <div class="video"></div>
            <div class="login">
                <h3>Log In</h3>
                <form action="Controller/logueo.php" method="post">
                    <p>Usuario:</p> 
                    <input type="text" name="usuario" placeholder="usuario" autofocus required>
                    <p>Contraseña:</p>
                    <input type="password" name="password" required>
                    <input type="submit" name="submitLogIn">
                </form>
            </div>
        </div>
    </body>
</html>
