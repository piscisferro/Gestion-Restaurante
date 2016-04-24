<?php
/**
 * Clase Categoria, en esta clase tendremos todo lo relacionado con la carga y
 * obtencion de datos de las Categorias en la base de datos.
 *
 * @author Juan Jose Fernandez Romero
 */
require_once "restDB.php";

class Categoria {
// Atributos de la clase categoria
    private $id;
    private $nombre;
    private $imgDir;
    private $fecha;
    
    
    // Constructor donde se construye el objeto y se le asignan los atributos
    public function __construct($nombre, $imgDir = false, $id=null, $fecha = false) {
        $this->nombre = $nombre;
        $this->imgDir = $imgDir;
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
    public function getId() {
        return $this->id;
    }

    public function getNombre() {
        return $this->nombre;
    }

    public function getImgDir() {
        return $this->imgDir;
    }

    public function getFecha() {
        return $this->fecha;
    }

                
    /////////////////////////////
    // Métodos setter
    /////////////////////////////
    public function setId($id) {
        $this->id = $id;
    }

    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    public function setImgDir($imgDir) {
        $this->imgDir = $imgDir;
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
        $insert = "INSERT INTO categoria (nombre_categoria, img_categoria, fecha_categoria) VALUES ('$this->nombre', '$this->imgDir', '$this->fecha')";
        
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
        $borrado = "DELETE FROM categoria WHERE id_categoria='$this->id'";
        
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
        $update = "UPDATE categoria SET nombre_categoria='$this->nombre', img_categoria='$this->imgDir' WHERE id_categoria='$this->id'";
        
        // Ejecutamos la sentencia y guardamos la respuesta de la BD
        $resultado = $conexion->query($update);
        
        // Devolvemos la respuesta de la BD
        return $resultado;
    }
    
    ///////////////////////////////////////
    //    Método getById
    //////////////////////////////////////
    public static function getCategoriaById($id) {
        // Conectamos a la BD
        $conexion = restDB::connectDB();
        // Sentencia Select
        $seleccion = "SELECT * FROM categoria WHERE id_categoria=$id";
        // Ejecutamos la sentencia SELECT
        $consulta = $conexion->query($seleccion);
        // Convertimos en objeto la fila recibida
        $registro = $consulta->fetchObject();
        // Guardamos al objeto categoria en la variable
        $resultado = new Categoria($registro->nombre_categoria, $registro->img_categoria, $registro->id_categoria, $registro->fecha_categoria);
        // Devolvemos la variable resultado
        return $resultado;   
    }
    
    ///////////////////////////////////////
    //    Método Consulta all Productos
    //////////////////////////////////////
    public static function getAllCategorias() {
        // Conectamos a la BD
        $conexion = restDB::connectDB();
        // Sentencia SELECT
        $seleccion = "SELECT * FROM categoria";
        // Ejecutamos la consulta
        $consulta = $conexion->query($seleccion);
        
        // Inicializamos el array que contendra el resultado de la consulta
        $resultado = [];
        
        // Guardamos todos los resultados en el array resultado
        while ($registro = $consulta->fetchObject()) {
            $resultado[] = new Categoria($registro->nombre_categoria, $registro->img_categoria, $registro->id_categoria, $registro->fecha_categoria);
        }
        
        // Devolvemos resultado
        return $resultado;
    } 
}    