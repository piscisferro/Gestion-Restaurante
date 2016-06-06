$(document).ready(iniciarWorkspace);

/////////////////////////////////////////////////////////////
//////
//////  Funcion para inicializar las funcionalidades.
//////
////////////////////////////////////////////////////////////
function iniciarWorkspace() {
    
    $(".muestraPedido").on("click", muestraPedido);
    $(".añadirCarrito").click(añadirCarrito);
    $(".abrirModal").click(abrirModal);
    $(".cerrarPedido").click(cerrarPedido);
    $("#cerrarModal").click(cerrarModal);
    $("#botonPedir").click(addProWS);
    $(".botonBorrar").click(borrarUsuarioBarra);
    $(".borrarProducto").click(borrarProducto);
    
    $("#newUserWS").submit(newUserWs);
    $("#newUserWS").validate({
            rules: {
                userWS: {
                    required: true,
                    minlength: 3
                }
            },
            errorClass: "errorForm"
    });
    
    actualizarListado();
    
    hideAll();
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
    var idusuario = $(this).closest("li").data("id");
    var usuario = $(this).closest("li").text();
    
    $(".activated").removeClass("activated");
    $(this).closest("li").addClass("activated");
    
    // Si existe el pedido para el usuario
    if ($("#pedido" + idusuario).length) {
        
        // Ocultamos toda la clase hidden
        hideAllWS();
        
        // Mostramos el pedido del usuario
        $("#pedido" + idusuario).show();
        
    } else { // En caso de que el pedido no exista
        
        // Mandamos un post para crear un nuevo pedido para el usuario
        $.post("../../Controller/Workspace/recuperarPedidoWS.php", { idusuario : idusuario, recpedido : true, usuario:usuario }, function(data) {
            
            // Nos devuelve un pedido en blanco, lo atamos al HTML
            $("#pedidos").append(data);
            
            // reiniciamos el js
            hideAllWS();
            
            // Mostramos el pedido del usuario
            $("#pedido" + idusuario).show();
            $("#pedido" + idusuario).find(".abrirModal").click(abrirModal);
            $("#pedido" + idusuario).find(".cerrarPedido").click(cerrarPedido);
        });
    }
    
}

//////////////////////////////////////////////////////////////////////
//////
//////  Funcion para añadir productos al carrito
//////
//////////////////////////////////////////////////////////////////////
function añadirCarrito() {
    // Variable con el contenido del li que crearemos
    var contenido = $(this).closest("li").find(".nombreProducto").html();
    // Variable con el id del producto para el li que crearemos
    var id = $(this).closest("li").attr("id");
    
    // Variable con el contenido del li que crearemos
    var precio = $(this).closest("li").find(".precioProducto").html();
    
    var nuevo = true;
    
    $("#listaCarrito").children().each(function(){
       
        if($(this).data("id") == id) {
            nuevo = false;
            
            var cantidad = $(this).find(".cantidad").text();
            $(this).find(".cantidad").text(parseInt(cantidad) + 1);
            var precioActual = $(this).find(".precio").text();
            $(this).find(".precio").text(Math.round((parseFloat(precioActual) + parseFloat(precio)) * 100)/100);
            $(this).find(".moneda").text("€");
        } 
    });
    
    if (nuevo) {
        // Variable con el icono de borrar
        var imgdel = '<img class="icon" src="../../Views/img/borrar.ico">';
        // Variable con el elemento para crear
        var li = $("<li data-id='" + id + "' data-preciouni='"+ precio +"'>" + "<span class='cantidad'>1</span><span class='nombreProducto'>" + contenido + "</span><div class='borrarCarrito'><span class='precio'>" + precio + "</span>" + "<span class='moneda'>€</span>" + imgdel + "</div></li>");
        // Le damos la propiedad click a la imagen de borrar carrito
        li.find(".borrarCarrito").click(borrarCarrito);
        // Añadimos el elemento al carrito
        $("#listaCarrito").append(li);
    }
    
    // Recogemos el precio total actual del carrito
    var total = $("#totalCarrito").text();
    // Actualizamos el precio total del carrito
    $("#totalCarrito").text(Math.round((parseFloat(total) + parseFloat(precio)) * 100)/100);
    // Activamos el boton pedir
    $("#botonPedir").attr("disabled", false);
    
}

//////////////////////////////////////////////////////////////////////
//////
//////  Funcion para borrar productos del carrito
//////
//////////////////////////////////////////////////////////////////////
function borrarCarrito() {
    
        // Recogemos el precio actual del producto    
    var precio = $(this).closest("li").data("preciouni");
    var precioTotal = $(this).closest("li").find(".precio").text();
    var cantidad = $(this).closest("li").find(".cantidad").text();
    
    // Recogemos el precio total actual del carrito
    var total = $("#totalCarrito").text();
    
    // Actualizamos el precio total del carrito
    $("#totalCarrito").text(Math.round((parseFloat(total) - parseFloat(precio))*100)/100);
    
    if (parseFloat(cantidad) > 1) {
        $(this).closest("li").find(".cantidad").text(cantidad - 1);
        $(this).closest("li").find(".precio").text(Math.round((parseFloat(precioTotal) - parseFloat(precio))*100)/100);
    } else {
        $(this).closest("li").remove();
    }
    
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
        $("#pedido" + idusuario).show();
        
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
    
    var div = $(this).closest(".pedidoUsuario");
    var idusuario = $(this).closest(".pedidoUsuario").data("idusuario");
    var idpedido = $(this).closest(".pedidoUsuario").data("idpedido");
    
    
    // Creamos el dialog 
    var dialog = $("<div>¿Esta seguro de que desea Cerrar el pedido?</div>");
    
    //////////////
    // DIALOG
    //////////////
    $(dialog).dialog({
        autoOpen: true,
        resizable: false, 
        height: 150, 
        modal: true, 
        buttons: {
            "Cerrar": function () {
                $.post("../../Controller/Workspace/cerrarPedido.php", { cerrarpedido: true, idpedido: idpedido }, function(){});
    
                div.remove();
                $("#usuario" + idusuario).remove();
            },
            
            "Cancelar": function () {
                $(this).dialog("close");
            }
        }, 
        close: function(){ 
            $(dialog).remove();
        }
    });
    
}


function newUserWs(e) {
    
    e.preventDefault();
    
    var usuario = $(this).find("#userWS").val();
    var id;
    
    $.post("../../Controller/Workspace/addNewUsuarioBarra.php", { usuario: usuario, tipo: "barra" , newUser: true }, function(data){
        
        $("#newBarraUser").after(data);
        $(".listadoUsuarios").find("#userWS").val("");
        $(".toggle").toggle(200);
        
        $("#newBarraUser").next().find(".muestraPedido").click(muestraPedido);
        $("#newBarraUser").next().find(".botonBorrar").click(borrarUsuarioBarra);
        
    });
}


function borrarUsuarioBarra() {
    
    var id = $(this).closest("li").data("id");
    
    var li = $(this).closest("li");
    
    // Creamos el dialog 
    var dialog = $("<div>¿Esta seguro de que desea borrar este Usuario? Se cerraran los pedidos abiertos.</div>");
    
    //////////////
    // DIALOG
    //////////////
    $(dialog).dialog({
        autoOpen: true,
        resizable: false, 
        height: 150, 
        modal: true, 
        buttons: {
            "Borrar": function () {
                
                li.remove();
    
                // Si existe el pedido para el usuario lo cerramos
                if ($("#" + id).length) {

                    var idpedido = $("#" + id).data("idpedido");

                    $.post("../../Controller/Workspace/cerrarPedido.php", { cerrarpedido: true, idpedido: idpedido }, function(){});
                }

                $.post("../../Controller/Workspace/borrarUsuarioBarra.php", { deleteId: id }, function() {});
                
                $(this).dialog("close");
            },
            
            "Cancelar": function () {
                $(this).dialog("close");
            }
        }, 
        close: function(){ 
            $(dialog).remove();
        }
    });
}

function borrarProducto() {
    
    var id = $(this).closest("li").data("iddetpedido");
    
    // Creamos el dialog 
    var dialog = $("<div>¿Esta seguro de que desea borrar este registro?</div>");
    
    //////////////
    // DIALOG
    //////////////
    $(dialog).dialog({
        autoOpen: true,
        resizable: false, 
        height: 150, 
        modal: true, 
        buttons: {
            "Borrar": function () {
                
                li.remove();

                $.post("../../Controller/Workspace/borrarDetPedido.php", { id: id }, function() {});
                
                $(this).dialog("close");
            },
            
            "Cancelar": function () {
                $(this).dialog("close");
            }
        }, 
        close: function(){ 
            $(dialog).remove();
        }
    });
    
}

function actualizarListado() {
    
    $.post("../../Controller/Workspace/workspace.php", { usuario: true }, function(data) {
        
        $(".usuarios").empty();
        $(".usuarios").append(data);
        $(".usuario").find(".muestraPedido").unbind("click");
        $(".usuario").find(".muestraPedido").click(muestraPedido);
    });
    
    
    setTimeout(actualizarListado, 7000);
}


function contador() {
    
}

