/////////////////////////////////////////////////////////////
//////
//////  Funcion para inicializar las funcionalidades.
//////
////////////////////////////////////////////////////////////
function iniciarApp() {
    $(".appCat").click(muestraCatPro);
    $(".añadirCarrito").click(añadirCarrito);
    $("#botonPedir").attr("disabled", true);
    $("#botonPagar").hide();
    $("#botonPagar").click(hacerPago);
    $("#botonPedir").click(hacerPedido);
    hideAll();
    getPedido();
}

///////////////////////////////////////////////////////////////////////
//////  Funcion para dejar de mostrar los elementos con clase hidden
///////////////////////////////////////////////////////////////////////
function hideAll() {
    $(".hidden").hide();
}

//////////////////////////////////////////////////////////////////////
//////
//////  Funcion mostrar los productos de la categoria seleccionada
//////
//////////////////////////////////////////////////////////////////////
function muestraCatPro() {
    
    var idCat = $(this).attr("id");
    hideAll();
    $("." + idCat).show();
    
}

//////////////////////////////////////////////////////////////////////
//////
//////  Funcion para añadir productos al carrito
//////
//////////////////////////////////////////////////////////////////////
function añadirCarrito() {
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
//////  Funcion mostrar los productos del pedido
//////
//////////////////////////////////////////////////////////////////////
function getPedido() {
    // Hacemos un get para recuperar la informacion de ultimo pedido
    $.get("../../Controller/App/getUltimoPedido.php", function(data) {
        
        // Borramos la lista que hubiera para actualizarla
        $("#pedido").find("ul").remove();
        
        // Insertamos la informacion (en html) al principio del div
        $("#pedido").prepend(data);
        
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
    
    var productos = [];
    
    $("#listaCarrito").children().each(function() {
        productos.push($(this).data("id"));
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
}

function hacerPago() {
    
    $.post("../../Controller/App/hacerPago.php", { hacerpago : true }, function(data) {
        if (data) {
            window.location.href = "../../Views/App/acaja.html";
        }
    });
    
    
}