<?php
/**
 * Clase Producto, en esta clase tendremos todo lo relacionado con la carga y
 * obtencion de datos de los productos en la base de datos.
 *
 * @author Juan Jose Fernandez Romero
 */
require_once "restDB.php";

class Producto {
    // Atributos de la clase producto
    private $id;
    private $nombre;
    private $tipo;
    private $categoria;
    private $descripcion;
    private $precio;
    private $imgDir;
    private $fecha;
    
    
    // Constructor donde se construye el objeto y se le asignan los atributos
    public function __construct($nombre=null, $tipo=null, $descripcion=null, $precio=0, $imgDir = false, $categoria=1, $fecha=false, $id=null) {
        $this->nombre = $nombre;
        $this->tipo = $tipo;
        $this->descripcion = $descripcion;
        $this->precio = $precio;
        $this->imgDir = $imgDir;
        $this->categoria = $categoria;
        $this->id = $id;
        
        if (!$fecha) {
            $this->fecha = date('d-m-Y');
        } else {
            $this->fecha = $fecha;
        }
    }
    
    // Funcion para construir usando solo el id
    public static function contructOnlyId ($id) {
        $producto = new self();
        $producto->id = $id;
        return $producto;
    }
    
    /////////////////////////////
    // Métodos Getter
    /////////////////////////////
    public function getNombre() {
        return $this->nombre;
    }

    public function getId() {
        return $this->id;
    }

    public function getTipo() {
        return $this->tipo;
    }

    public function getCategoria() {
        return $this->categoria;
    }

    public function getDescripcion() {
        return $this->descripcion;
    }

    public function getPrecio() {
        return $this->precio;
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

    public function setTipo($tipo) {
        $this->tipo = $tipo;
    }

    public function setCategoria($categoria) {
        $this->categoria = $categoria;
    }

    public function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }

    public function setPrecio($precio) {
        $this->precio = $precio;
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
        $insert = "INSERT INTO producto (nombre_producto, tipo_producto, categoria_producto, desc_producto, precio_producto, img_producto, fecha_producto) VALUES ('$this->nombre', "
                . "'$this->tipo', '$this->categoria' , '$this->descripcion', '$this->precio', '$this->imgDir', STR_TO_DATE(\"$this->fecha\", '%d-%m-%Y'))";
        
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
        $borrado = "DELETE FROM producto WHERE id_producto='$this->id'";
        
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
        $update = "UPDATE producto SET nombre_producto='$this->nombre', tipo_producto='$this->tipo', categoria_producto='$this->categoria', desc_producto='$this->descripcion', precio_producto='$this->precio', img_producto='$this->imgDir' WHERE id_producto='$this->id'";
        
        // Ejecutamos la sentencia y guardamos la respuesta de la BD
        $resultado = $conexion->query($update);
        
        // Devolvemos la respuesta de la BD
        return $resultado;
    }
    
    ///////////////////////////////////////
    //    Método getById
    //////////////////////////////////////
    public static function getProductoById($id) {
        // Conectamos a la BD
        $conexion = restDB::connectDB();
        // Sentencia Select
        $seleccion = "SELECT * FROM producto WHERE id_producto=$id";
        // Ejecutamos la sentencia SELECT
        $consulta = $conexion->query($seleccion);
        // Convertimos en objeto la fila recibida
        $registro = $consulta->fetchObject();
        // Guardamos el objeto producto en la variable
        $resultado = new Producto($registro->nombre_producto, $registro->tipo_producto, $registro->desc_producto, $registro->precio_producto, $registro->img_producto, $registro->categoria_producto, $registro->fecha_producto, $registro->id_producto);
        // Devolvemos la variable resultado
        return $resultado;   
    }
    
    ///////////////////////////////////////
    //    Método Consulta all Productos
    //////////////////////////////////////
    public static function getAllProductos() {
        // Conectamos a la BD
        $conexion = restDB::connectDB();
        // Sentencia SELECT
        $seleccion = "SELECT * FROM producto JOIN tipoproducto WHERE tipo_producto = id_tipo";
        // Ejecutamos la consulta
        $consulta = $conexion->query($seleccion);
        
        // Inicializamos el array que contendra el resultado de la consulta
        $resultado = [];
        
        // Guardamos todos los resultados en el array resultado
        while ($registro = $consulta->fetchObject()) {
            $resultado[] = new Producto($registro->nombre_producto, $registro->nombre_tipo, $registro->desc_producto, $registro->precio_producto, $registro->img_producto, $registro->categoria_producto, $registro->fecha_producto, $registro->id_producto);
        }
        
        // Devolvemos resultado
        return $resultado;
    } 
}    