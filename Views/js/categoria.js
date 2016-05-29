$(document).ready(iniciarCategorias);

/////////////////////////////////////////////////////////////
//////
//////  Funcion para inicializar las funcionalidades.
//////
////////////////////////////////////////////////////////////
function iniciarCategorias(){
    $("#newCat").submit(addCategoria);
    $(".editCat").submit(updateCategoria);
    $(".deletecat").click(deleteCategoria); 
    
    hideAll();
 }

/////////////////////////////////////////////////////////////
//////
//////  Ajax addCategoria
//////
////////////////////////////////////////////////////////////
function addCategoria(e) {
    e.preventDefault();
    var datos = new FormData(this);

    $.ajax({
        url: "../../Controller/Gestion/addCategoria.php",
        data: datos, 
        contentType: false, 
        processData: false, 
        type: 'POST'
    }).done(function (data) {
        var resultado = data;

        getListadoProductos(resultado);
        
    });
}

/////////////////////////////////////////////////////////////
//////
//////  Ajax deleteCategoria
//////
////////////////////////////////////////////////////////////
function deleteCategoria() {
    
    var id = $(this).closest("li").attr("id");
    
    // Creamos el dialog
    var dialog = $("<div>¿Esta seguro de que desea borrar esta Categoria?</div>");
    
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
                // Consulta Ajax post con el id a borrar
                $.post("../../Controller/Gestion/deleteCategoria.php", {deleteId: id}, function(data) {
                    // Guardamos la respuesta de la pagina
                    var resultado = data;
                    // Ejecutamos la funcion para obtener el listado
                    getListadoProductos(resultado);
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
 


/////////////////////////////////////////////////////////////
//////
//////  Ajax updateCategoria
//////
////////////////////////////////////////////////////////////
function updateCategoria(e) {
    e.preventDefault();
    var datos = new FormData(this);

    // Creamos el dialog
    var dialog = $("<div>¿Esta seguro de que desea modificar esta Categoria?</div>");
    
    //////////////
    // DIALOG
    //////////////
    $(dialog).dialog({
        autoOpen: true,
        resizable: false, 
        height: 150, 
        modal: true, 
        buttons: {
            "Modificar": function () { 
                $.ajax({
                    url: "../../Controller/Gestion/updateCategoria.php",
                    data: datos, 
                    contentType: false, 
                    processData: false, 
                    type: 'POST'
                }).done(function (data) {
                    // Guardamos la respuesta de la pagina
                    var resultado = data;
                    // Ejecutamos la funcion para obtener el listado
                    getListadoProductos(resultado);

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