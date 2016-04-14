<?php

$_SESSION["logado"] = false;
unset($_SESSION["tipo_usuario"]);

header("Location: ../index.php?error=1");
