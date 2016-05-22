$(document).ready(iniciarWorkspace);

/////////////////////////////////////////////////////////////
//////
//////  Funcion para inicializar las funcionalidades.
//////
////////////////////////////////////////////////////////////
function iniciarWorkspace() {
    
    $(".muestraPedido").click(muestraPedido);
    $(".añadirCarrito").click(añadirCarrito);
    $(".abrirModal").click(abrirModal);
    $(".cerrarPedido").click(cerrarPedido);
    $("#cerrarModal").click(cerrarModal);
    $("#botonPedir").click(addProWS);
    
    hideAllWS();
    
}



///////////////////////////////////////////////////////////////////////
//////  Funcion hideAll para esconder todas las clases hidden
///////////////////////////////////////////////////////////////////////
function hideAllWS() {
    
    $(".hiddenWS").hide();
    
}

//////////////////////////////////////////////////////////////////////
//////
//////  Funcion para mostrar el pedido del usuario
//////
//////////////////////////////////////////////////////////////////////
function muestraPedido() {
    
    // Recogemos el id del usuario y su nombre
    var idusuario = $(this).data("id");
    var usuario = $(this).text();
    
    // Si existe el pedido para el usuario
    if ($("#" + idusuario).length) {
        
        // Ocultamos toda la clase hidden
        hideAllWS();
        
        // Mostramos el pedido del usuario
        $("#" + idusuario).show();
        
    } else { // En caso de que el pedido no exista
        
        // Mandamos un post para crear un nuevo pedido para el usuario
        $.post("../../Controller/Workspace/addPedidoWS.php", { idusuario : idusuario, newpedido : true, usuario:usuario }, function(data) {
            // Nos devuelve un pedido en blanco, lo atamos al HTML
            $(".contenido").append(data);
            
            // reiniciamos el js
            hideAllWS();
            $(".abrirModal").click(abrirModal);
            $(".cerrarPedido").click(cerrarPedido);
            $("#cerrarModal").click(cerrarModal);
            
            // Mostramos el pedido del usuario
            $("#" + idusuario).show();
        });
    }
    
}

//////////////////////////////////////////////////////////////////////
//////
//////  Funcion para añadir productos al carrito
//////
//////////////////////////////////////////////////////////////////////
function añadirCarrito() {
    console.log("entro");
    // Variable con el contenido del li que crearemos
    var contenido = $(this).closest("li").find("p").html();
    // Variable con el id del producto para el li que crearemos
    var id = $(this).closest("li").attr("id");
    // Variable con el icono de borrar
    var imgdel = '<img class="icon borrarCarrito" src="../../Views/img/borrar.ico">';
    // Variable con el elemento para crear
    var li = $("<li data-id='" + id + "'>" + contenido + imgdel + "</li>");
    // Añadimos el elemento al carrito
    $("#listaCarrito").append(li);
    // Activamos el boton pedir
    $("#botonPedir").attr("disabled", false);
    // Le damos a las imagenes de clase borrarCarrito la funcion click.
    $(".borrarCarrito").click(borrarCarrito);
    
}

//////////////////////////////////////////////////////////////////////
//////
//////  Funcion para borrar productos del carrito
//////
//////////////////////////////////////////////////////////////////////
function borrarCarrito() {
    
    $(this).closest("li").remove();
    
    // Si el listado que hemos recuperado tiene 1 producto o mas
    if ($("#listaCarrito").children().length < 1) {
        // Mostramos el boton para pagar
        $("#botonPedir").attr("disabled", "true");
    }
    
}

//////////////////////////////////////////////////////////////////////
//////
//////  Funcion para mostrar el modal.
//////
//////////////////////////////////////////////////////////////////////
function abrirModal() {
    
    var id = $(this).closest("div").data("idusuario");
    $("#modal").show();
    $("#modal").data("idusuario", id);
    
}


//////////////////////////////////////////////////////////////////////
//////
//////  Funcion para mostrar el modal.
//////
//////////////////////////////////////////////////////////////////////
function cerrarModal() {
    
    $("#modal").hide();
    $("#modal").data("idusuario", false);
    
}

//////////////////////////////////////////////////////////////////////
//////
//////  Funcion para añadir los productos seleccionados del modal al pedido.
//////
//////////////////////////////////////////////////////////////////////
function addProWS() {
    
    var productos = [];
    
    $("#listaCarrito").children().each(function() {
        productos.push($(this).data("id"));
    });
    
    var idusuario = $("#modal").data("idusuario");
    
    $.post("../../Controller/Workspace/addDetPedidoWS.php", { newdetpedido: true, productos: productos, idusuario: idusuario }, function(data){
        
        $("#pedidos").html(data);
        cerrarModal();
        hideAll();
        hideAllWS();
        $("#" + idusuario).show();
        
    });
    
    // Borramos la lista que hubiera para actualizarla
    $("#listaCarrito").empty();
    
    
}

//////////////////////////////////////////////////////////////////////
//////
//////  Funcion para cerrar pedido
//////
//////////////////////////////////////////////////////////////////////
function cerrarPedido() {
    
    var idpedido = $(this).closest("div").data("idpedido");
    
    $.post("../../Controller/Workspace/cerrarPedido.php", { cerrarpedido: true, idpedido: idpedido }, function(){});
    
    $(this).closest("div").remove();
    
    
}












