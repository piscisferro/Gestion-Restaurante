<?php
/**
 * Clase Comida, en este clase tendremos todo lo relacionado con la carga y
 * obtencion de datos de los pedidos en la base de datos.
 *
 * @author Juan Jose Fernandez Romero
 */
require_once "restDB.php";
require_once '../../Model/producto.php';

class Pedido {
    
    private $id;
    private $usuario;
    private $abierto;
    private $productos = [];
    private $precio;
    
    // Constructor
    public function __construct($id, $usuario, $abierto, $productos = null, $fecha = null) {
        
        $this->id = $id;
        $this->usuario = $usuario;
        $this->abierto = $abierto;
        $this->productos = $productos;
        if (!$fecha) {
            $this->fecha = date('d-m-Y');
        } else {
            $this->fecha = $fecha;
        }
    }
    
    
    // Metodos Getter
    public function getId() {
        return $this->id;
    }

    public function getUsuario() {
        return $this->usuario;
    }

    public function getAbierto() {
        return $this->abierto;
    }

    public function getProductos() {
        return $this->productos;
    }

    public function getPrecio() {
        return $this->precio;
    }


    // Metodos Setter 
    public function setId($id) {
        $this->id = $id;
    }

    public function setUsuario($usuario) {
        $this->usuario = $usuario;
    }

    public function setAbierto($abierto) {
        $this->abierto = $abierto;
    }

    public function setProductos($productos) {
        $this->productos = $productos;
    }
    
    public function setPrecio($precio) {
        $this->precio = $precio;
    }

    ///////////////////////////////////
    //    Método Insert 
    //////////////////////////////////
    public function insert() {
        
        // Establecemos conexion con la BD
        $conexion = restDB::connectDB();
        
        // Sentencia Insert
        $insert = "INSERT INTO pedido (fecha_pedido, id_usuario, abierto_pedido) VALUES (STR_TO_DATE(\"$this->fecha\", '%d-%m-%Y'), '$this->usuario', '$this->abierto')";
        
        // Ejecutamos la sentencia y guardamos la respuesta de la BD
        $resultado = $conexion->query($insert);
        
        // Devolvemos la respuesta de la BD
        return $resultado;
        
    }
    
    ///////////////////////////////////
    //    Método Insert Productos
    //////////////////////////////////
    public function insertDetPedido() {
        
        // Establecemos conexion con la BD
        $conexion = restDB::connectDB();
        
        // Para cada producto del pedido.
        foreach ($this->productos as $producto) {
        
            // Guardamos la id del producto en una variable
            $idproducto = $producto->getId();
            
            // Sentencia Insert
            $insert = "INSERT INTO detpedido (pedido_detpedido, producto_detpedido, servido_detpedido) VALUES ($this->id, $idproducto, '0')";

            // Ejecutamos la sentencia y guardamos la respuesta de la BD
            $resultado = $conexion->query($insert);
        
            if (!$resultado) {
                return false;
            }
        }
        // Devolvemos la respuesta de la BD
        return true;
    }
    
    
    ///////////////////////////////////
    //    Método Hacer Pago
    //////////////////////////////////
    public function hacerPago() {
        
        // Establecemos conexion con la BD
        $conexion = restDB::connectDB();
        
        // Sentencia para hacer el update en la base de datos
        $update = "UPDATE pedido SET abierto_pedido='P' WHERE id_pedido = $this->id";
        
        // Ejecutamos la sentencia y guardamos la respuesta de la BD
        $resultado = $conexion->query($update);
        
        // Devolvemos la respuesta de la BD
        return $resultado;
    }
    
    
    ///////////////////////////////////
    //    Método getUltimoPedido 
    //////////////////////////////////
    public static function getUltimoPedidoAbierto($usuario) {
        
        // Establecemos conexion con la BD
        $conexion = restDB::connectDB();
        
        // Sentencia Select
        $select = "SELECT * FROM pedido WHERE id_usuario = $usuario AND abierto_pedido = 'A'";
        
        // Ejecutamos la sentencia
        $consulta = $conexion->query($select);
        
        // Guardamos en la variable registro la consulta
        $registro = $consulta->fetchObject();
        
        if (!$registro) {
            return false;
        }
        
        // Craemos un nuevo objeto y lo guardamos en la variable resultado
        $resultado = new Pedido($registro->id_pedido, $registro->id_usuario, $registro->abierto_pedido);
        
        // Devolvemos resultado
        return $resultado;
        
    }
    
    ///////////////////////////////////
    //    Método getProductos 
    //////////////////////////////////
    public function getProductosPedido() {
        
        // Establecemos conexion con la BD
        $conexion = restDB::connectDB();
        
        // Sentencia Select
        $select = "SELECT * FROM pedido JOIN detpedido ON id_pedido = pedido_detpedido JOIN producto ON id_producto = producto_detpedido WHERE id_pedido = $this->id";
        
        // Ejecutamos la sentencia
        $consulta = $conexion->query($select);
        
        $productos = [];
        
        // Recorremos todas las filas devueltas por la consulta
        while ($registro = $consulta->fetchObject()) {
            // Guardamos los productos en un array
            $productos[] = new Producto($registro->nombre_producto, $registro->tipo_producto, $registro->desc_producto, $registro->precio_producto, $registro->img_producto, $registro->categoria_producto, $registro->fecha_producto, $registro->id_producto);
        }
        
        // Guardamos el array anterior como atributo del objeto.
        $this->productos = $productos;
    }
    
    
    
    
    
    
}
    