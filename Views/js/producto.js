$(document).ready(iniciarProductos);

/////////////////////////////////////////////////////////////
//////
//////  Funcion para inicializar las funcionalidades.
//////
////////////////////////////////////////////////////////////
function iniciarProductos() {
    $(".addProducto").submit(addProducto);
    $(".editPro").submit(updateProducto);
    $(".deletePro").click(deleteProducto); 
    
    $(".addProducto").each(function(){
        $(this).validate({
            rules: {
                newProNombre: {
                    required: true,
                    minlength: 3
                },
                newProPrecio: {
                    required: true,
                    min: 0,
                    max: 9999
                },
                newProDesc: {
                    minlength: 5,
                    maxlength: 75
                }
            },
            errorClass: "errorForm"
        });
    });
    
    $(".editPro").each(function(){
        $(this).validate({
            rules: {
                newProNombre: {
                    required: true,
                    minlength: 3
                },
                newProPrecio: {
                    required: true,
                    min: 0,
                    max: 9999
                },
                newProDesc: {
                    minlength: 5,
                    maxlength: 75
                }
            },
            errorClass: "errorForm"
        });
    });
    
 }


/////////////////////////////////////////////////////////////
//////
//////  Ajax addProducto
//////
////////////////////////////////////////////////////////////
function addProducto(e) {
    // Evitamos que al enviar el formulario recargue la pagina
    e.preventDefault();
    
    // Pasamos el validador
    if (!$(this).valid()){
        return;
    } 
    
    // Guardamos en datos los datos del formulario
    var datos = new FormData(this);

    // Consulta ajax con los datos del formulario para añadir el producto
    $.ajax({
        url: "../../Controller/Gestion/addProducto.php",
        data: datos, 
        contentType: false, 
        processData: false, 
        type: 'POST'
    }).done(function (data) { // Una vez terminada la consulta
        // Guardamos la respuesta de la pagina
        var resultado = data;

        // Ejecutamos la funcion para obtener el listado
        getListadoProductos(resultado);
    });
}

/////////////////////////////////////////////////////////////
//////
//////  Ajax deleteProducto
//////
////////////////////////////////////////////////////////////
function deleteProducto() {
    // Guardamos en id la id del li mas cercano que contiene la id del producto a borrar
    var id = $(this).closest("li").attr("id");
    
    // Creamos el dialog
    var dialog = $("<div>¿Esta seguro de que desea borrar este Producto?</div>");
    
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
                $.post("../../Controller/Gestion/deleteProducto.php", {deleteId: id}, function(data) {
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
//////  Ajax updateProducto
//////
////////////////////////////////////////////////////////////
function updateProducto(e) {
    // Evitamos que al enviar el formulario recargue la pagina
    e.preventDefault();
    
    // Pasamos el validador
    if (!$(this).valid()){
        return;
    } 
    
    // Guardamos en datos los datos del formulario
    var datos = new FormData(this);
    
    // Creamos el dialog
    var dialog = $("<div>¿Esta seguro de que desea modificar este Producto?</div>");
    
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
                // Consulta ajax con los datos del formulario para editar el producto
                $.ajax({
                    url: "../../Controller/Gestion/updateProducto.php",
                    data: datos, 
                    contentType: false, 
                    processData: false, 
                    type: 'POST'
                }).done(function (data) { // Una vez terminada la consulta
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