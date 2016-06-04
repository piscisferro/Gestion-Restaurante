$(document).ready(iniciarApp);

$(window).resize(function() {
    
    if ($(window).width() > 950) {
        $(".carritoP").show();
        $(".pedidoP").show();
    }
});

/////////////////////////////////////////////////////////////
//////
//////  Funcion para inicializar las funcionalidades.
//////
////////////////////////////////////////////////////////////
function iniciarApp() {
    $(".añadirCarrito").click(añadirCarrito);
    $("#botonPedir").attr("disabled", true);
    $("#botonPagar").hide();
    $("#botonPagar").click(hacerPago);
    $("#botonPedir").click(hacerPedido);
    $(".hamburguesa").click(mostrarCarrito);

    hideAll();
    getPedido();
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
            $(this).find(".precio").text(parseInt(precioActual) + parseInt(precio));
            $(this).find(".moneda").text("€");
        } 
    });
    
    if (nuevo) {
        // Variable con el icono de borrar
        var imgdel = '<img class="icon" src="../../Views/img/borrar.ico">';
        // Variable con el elemento para crear
        var li = $("<li data-id='" + id + "'>" + "<span class='cantidad'>1</span><span class='nombreProducto'>" + contenido + "</span><div class='borrarCarrito'><span class='precio'>" + precio + "</span>" + "<span class='moneda'>€</span>" + imgdel + "</div></li>");
        // Le damos la propiedad click a la imagen de borrar carrito
        li.find(".borrarCarrito").click(borrarCarrito);
        // Añadimos el elemento al carrito
        $("#listaCarrito").append(li);
    }
    
    // Recogemos el precio total actual del carrito
    var total = $("#totalCarrito").text();
    // Actualizamos el precio total del carrito
    $("#totalCarrito").text(parseInt(total) + parseInt(precio));
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
    var precio = $(this).closest("li").find(".precioProducto").text();
    
    console.log(precio);
    
    // Recogemos el precio total actual del carrito
    var total = $("#totalCarrito").text();
    
     console.log(total);
    
    // Actualizamos el precio total del carrito
    $("#totalCarrito").text(parseInt(total) - parseInt(precio));
    
    $(this).closest("li").remove();
    
    
    // Si el listado que hemos recuperado tiene 1 producto o mas
    if ($("#listaCarrito").children().length < 1) {
        // Mostramos el boton para pagar
        $("#botonPedir").attr("disabled", "true");
    }
}

//////////////////////////////////////////////////////////////////////
//////
//////  Funcion mostrar los productos del pedido
//////
//////////////////////////////////////////////////////////////////////
function getPedido() {
    // Hacemos un get para recuperar la informacion de ultimo pedido
    $.get("../../Controller/App/getUltimoPedido.php", function(data) {
        
        // Borramos la lista que hubiera para actualizarla
        $("#pedido").find("ul").remove();
        $("#pedido").find("#totalPedido").remove();
        
        // Insertamos la informacion (en html) al principio del div
        $("#pedido").prepend(data);
        
        unificarCantidades();
        
        // Si el listado que hemos recuperado tiene 1 producto o mas
        if ($("#listaPedido").children().length > 0) {
            // Mostramos el boton para pagar
            $("#botonPagar").show();
        }
    });
}

//////////////////////////////////////////////////////////////////////
//////
//////  Consulta Ajax para pedir el pedido
//////
//////////////////////////////////////////////////////////////////////
function hacerPedido() {
    
    // Creamos el dialog
    var dialog = $("<div>¿Quiere realizar el Pedido?</div>");
    
    //////////////
    // DIALOG
    //////////////
    $(dialog).dialog({
        autoOpen: true,
        resizable: false, 
        height: 150, 
        modal: true, 
        buttons: {
            "Confirmar": function () {
                var productos = [];
                
                $("#listaCarrito").children().each(function() {
                    var cantidad = parseInt($(this).find(".cantidad").text());
                    
                    for (var i = 0; i < cantidad; i++) {
                        productos.push($(this).data("id"));
                    }
                });

                var idpedido = $("#listaPedido").data("idpedido");

                if (idpedido == false) {

                    $.post("../../Controller/App/addPedido.php", { newpedido : true });
                }

                $.post("../../Controller/App/addDetPedido.php", { newdetpedido : true, productos : productos }, function(){
                    getPedido();
                });

                // Borramos la lista que hubiera para actualizarla
                $("#listaCarrito").empty();
                $("#totalCarrito").text(0);
                
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

//////////////////////////////////////////////////////////////////////
//////
//////  Consulta Ajax para pedir el pago
//////
//////////////////////////////////////////////////////////////////////
function hacerPago() {
    
    // Creamos el dialog
    var dialog = $("<div>¿Quiere realizar el Pago?</div>");
    
    //////////////
    // DIALOG
    //////////////
    $(dialog).dialog({
        autoOpen: true,
        resizable: false, 
        height: 150, 
        modal: true, 
        buttons: {
            "Confirmar": function () {
                $.post("../../Controller/App/hacerPago.php", { hacerpago : true }, function(data) {
                    if (data) {
                        window.location.href = "../../Views/App/acaja.html";
                    }
                });
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


function mostrarCarrito() {
    
    $(".carritoP").fadeToggle(200);
    $(".pedidoP").fadeToggle(200);
    
}


function unificarCantidades() {
    
    var productos = [];
    var cantidad = [];
    
    $("#listaPedido").children().each(function(){
       
        var id = $(this).data("id");
        productos[id]= 0; 
        cantidad[id] = 0;
    });
    
    $("#listaPedido").children().each(function(){
       
        var id = $(this).data("id");
        productos[id]+= 1; 
        cantidad[id]+= 1; 
        
    });
    
    console.log(productos);
    $("#listaPedido").children().each(function(){
       
        var id = $(this).data("id");
        
        if (productos[id] > 1) {
            $(this).remove();
            productos[id]--;
        }
    });
    
    $("#listaPedido").children().each(function(){
        var id = $(this).data("id");
        $(this).find(".cantidad").text(cantidad[id]);
        var precio = parseInt($(this).find(".precio").text());
        $(this).find(".precio").text(precio * cantidad[id]);
        
    });
    
    console.log(productos);
}