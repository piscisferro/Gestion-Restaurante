<?php
/**
 * Clase Usuario, en esta clase tendremos todo lo relacionado con la carga y
 * obtencion de datos de los usuarios en la base de datos.
 *
 * @author Juan Jose Fernandez Romero
 */
require_once "restDB.php";

class Usuario {
    // Atributos de la clase usuarios
    private $nombre;
    private $password;
    private $tipo;
    private $fecha;
    private $id;
    
    // Constructor donde se construye el objeto y se le asignan los atributos
    public function __construct($nombre, $password, $tipo, $id=null, $fecha=false) {
        $this->nombre = $nombre;
        $this->password = $password;
        $this->tipo = $tipo;
        $this->id = $id;
        if (!$fecha) {
            $this->fecha = date('d-m-Y');
        } else {
            $this->fecha = $fecha;
        }
    }
    
    /////////////////////////////
    // Métodos Getter
    /////////////////////////////
    public function getNombre() {
        return $this->nombre;
    }
    public function getPassword() {
        return $this->password;
    }

    public function getTipo() {
        return $this->tipo;
    }
    
    public function getFecha() {
        return $this->fecha;
    }

    public function getId() {
        return $this->id;
    }

        
    /////////////////////////////
    // Métodos setter
    /////////////////////////////
    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

    public function setTipo($tipo) {
        $this->tipo = $tipo;
    }
    
    public function setFecha($fecha) {
        $this->fecha = $fecha;
    }
    
    public function setId($id) {
        $this->id = $id;
    }

    
    ///////////////////////////////////
    //    Método Insert 
    //////////////////////////////////
    public function insert() {
        
        // Establecemos conexion con la BD
        $conexion = restDB::connectDB();
        
        // Sentencia Insert
        $insert = "INSERT INTO usuario (nombre_usuario, password_usuario, tipo_usuario, fecha_usuario) VALUES ('$this->nombre', "
                . "'$this->password', '$this->tipo', STR_TO_DATE(\"$this->fecha\", '%d-%m-%Y'))";
        
        // Ejecutamos la sentencia y guardamos la respuesta de la BD
        $resultado = $conexion->query($insert);
        
        // Devolvemos la respuesta de la BD
        return $resultado;
        
    }
    
    //////////////////////////////////
    //  Método Delete
    /////////////////////////////////
    public function delete() {
        // Establecemos conexion con la BD
        $conexion = restDB::connectDB();
        
        // Sentencia para borrar el objeto
        $borrado = "DELETE FROM usuario WHERE id_usuario='$this->id'";
        
        // Ejecutamos la sentencia y guardamos la respuesta de la BD
        $resultado = $conexion->query($borrado);
        
        // Devolvemos la respuesta de la BD
        return $resultado;
    }
    
    
    //////////////////////////////////
    //  Método Update
    /////////////////////////////////
    public function update() {
        // Establecemos conexion con la BD
        $conexion = restDB::connectDB();
        
        // Sentencia para borrar el objeto
        $update = "UPDATE usuario SET nombre_usuario='$this->nombre', tipo_usuario='$this->tipo' WHERE id_usuario='$this->id'";
        
        // Ejecutamos la sentencia y guardamos la respuesta de la BD
        $resultado = $conexion->query($update);
        
        // Devolvemos la respuesta de la BD
        return $resultado;
    }
    
    //////////////////////////////////
    //  Método Update Password
    /////////////////////////////////
    public function updatePassword() {
        // Establecemos conexion con la BD
        $conexion = restDB::connectDB();
        
        // Sentencia para borrar el objeto
        $update = "UPDATE usuario SET password_usuario='$this->password' WHERE id_usuario='$this->id'";
        
        // Ejecutamos la sentencia y guardamos la respuesta de la BD
        $resultado = $conexion->query($update);
        
        // Devolvemos la respuesta de la BD
        return $resultado;
    }
    
    
    
    
    ///////////////////////////////////////
    //    Método getById
    //////////////////////////////////////
    public static function getUsuarioById($id) {
        // Conectamos a la BD
        $conexion = restDB::connectDB();
        // Sentencia Select
        $seleccion = "SELECT * FROM usuario WHERE id_usuario=$id";
        // Ejecutamos la sentencia SELECT
        $consulta = $conexion->query($seleccion);
        // Convertimos en objeto la fila recibida
        $registro = $consulta->fetchObject();
        // Guardamos al objeto usuario en la variable
        $usuario = new Usuario($registro->nombre_usuario, null, $registro->tipo_usuario, $registro->id_usuario, $registro->fecha_usuario);
        // Devolvemos la variable usuario
        return $usuario;   
    }
    
    
    ///////////////////////////////////////
    //    Método Consulta
    //////////////////////////////////////
    public static function getUsuario($nombre, $password) {
        
        // Conectamos a la BD
        $conexion = restDB::connectDB();
        // Sentencia Select
        $seleccion = "SELECT * FROM usuario WHERE nombre_usuario='$nombre'"
                . " AND password_usuario='$password'";
        // Ejecutamos la sentencia SELECT
        $consulta = $conexion->query($seleccion);
        // Convertimos en objeto el resultado de la consulta
        $resultado = $consulta->fetchObject();
        // Si la consulta llega informacion
        if ($resultado) {
            // Creamos un objeto usuario con el resultado de la consulta
            $usuario = new Usuario($resultado->nombre_usuario, $resultado->password_usuario, $resultado->tipo_usuario, $registro->fecha_usuario);
            return $usuario; 
        } else {
            return false;
        }
    }
    
    ///////////////////////////////////////
    //    Método Consulta all Usuarios
    //////////////////////////////////////
    public static function getAllUsuarios() {
        // Conectamos a la BD
        $conexion = restDB::connectDB();
        // Sentencia SELECT
        $seleccion = "SELECT * FROM usuario";
        // Ejecutamos la consulta
        $consulta = $conexion->query($seleccion);
        
        // Inicializamos el array que contendra el resultado de la consulta
        $resultado = [];
        
        // Guardamos todos los resultados en el array resultado
        while ($registro = $consulta->fetchObject()) {
            $resultado[] = new Usuario($registro->nombre_usuario, null, $registro->tipo_usuario, $registro->id_usuario, $registro->fecha_usuario);
        }
        
        // Devolvemos resultado
        return $resultado;
    } 
}
    