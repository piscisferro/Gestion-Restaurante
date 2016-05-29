$(document).ready(iniciarCocina);

/////////////////////////////////////////////////////////////
//////
//////  Funcion para inicializar las funcionalidades.
//////
////////////////////////////////////////////////////////////
function iniciarCocina() {
    $(".servirPedido").click(servirPedido);
    
    checkForOrders();
}

function checkForOrders() {
    
    $.post("../../Controller/Cocina/cocina.php", { ajax: true }, function(data) {
        
        $("#listado").html(data);
        $(".servirPedido").click(servirPedido);
    });
    setTimeout(checkForOrders, 5000);
    
}


function servirPedido() {
    
    var id = $(this).closest("li").data("id");
    
    var li = $(this).closest("li");
    
    $.post("../../Controller/Cocina/servirPedido.php", { iddetpedido: id }, function() {
     
        li.remove();
    });
    
}