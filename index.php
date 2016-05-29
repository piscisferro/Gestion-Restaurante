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
    header("Location: Controller/Views/views.php"); 
}

require_once "Model/usuario.php";

?>
<html lang="es">
    <head>
        <title>Log-In</title>
        <meta name="Author" content="Juan Jose Fernandez Romero"/>
        <meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="Views/css/style.css">
        <link rel="stylesheet" type="text/css" href="Views/css/login.css">
    </head>
    <body>
        <div class="container">
            <div class="divvideo">
                <div id="filtro"></div>
                <div id="video">
                    <video loop muted autoplay> 
                        <source src="Views/img/VideoRestaurante.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
                        <source src="Views/img/VideoRestaurante.mp4" type='video/ogg; codecs="theora, vorbis"'>
                        <source src="Views/img/VideoRestaurante.mp4" type='video/webm; codecs="vp8, vorbis"'>
                    </video>
                </div>
            </div>
            <div class="login">
                <h2>Log In</h2>
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