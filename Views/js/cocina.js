$(document).ready(iniciarCocina);

/////////////////////////////////////////////////////////////
//////
//////  Funcion para inicializar las funcionalidades.
//////
////////////////////////////////////////////////////////////
function iniciarCocina() {
    $(".servirPedido").click(servirPedido);
}


function servirPedido() {
    
    var id = $(this).closest("li").data("id");
    
    var li = $(this).closest("li");
    
    $.post("../../Controller/Cocina/servirPedido.php", { iddetpedido: id }, function() {
     
        li.remove();
    });
    
}