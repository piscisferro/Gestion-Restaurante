<?php
/**
 * Clase Comida, en este clase tendremos todo lo relacionado con la carga y
 * obtencion de datos de los comida del post en la base de datos.
 *
 * @author Juan Jose Fernandez Romero
 */
require_once "restDB.php";

class Usuarios {
    // Atributos de la clase usuarios
    private $nombre;
    private $password;
    private $tipo;
    private $fecha;
    
    // Constructor donde se construye el objeto y se le asignan los atributos
    public function __construct($nombre, $password, $tipo, $id=null) {
        $this->nombre = $nombre;
        $this->password = $password;
        $this->tipo = $tipo;
        $this->fecha = date('d-m-Y');
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
    

    ///////////////////////////////////
    //    Método Insert 
    //////////////////////////////////
    public function insert() {
        
        // Establecemos conexion con la BD
        $conexion = restDB::connectDB();
        
        // Sentencia Insert
        $insert = "INSERT INTO usuario (nombre_usuario, password_usuario, tipo_usuario) VALUES ('$this->nombre', "
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
        $borrado = "DELETE FROM usuario WHERE id='$this->id'";
        
        // Ejecutamos la sentencia y guardamos la respuesta de la BD
        $resultado = $conexion->query($borrado);
        
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
        $seleccion = "SELECT * FROM usuario WHERE id=$id";
        // Ejecutamos la sentencia SELECT
        $consulta = $conexion->query($seleccion);
        // Convertimos en objeto la fila recibida
        $registro = $consulta->fetchObject();
        // Guardamos la comida
        $usuario = new Usuarios($registro->nombre, $registro->password, $registro->tipo, $registro->id);
        // Devolvemos el array comida
        return $usuario;   
    }
    


    
    
}
    