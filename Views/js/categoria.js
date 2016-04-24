/////////////////////////////////////////////////////////////
//////
//////  Funcion para inicializar las funcionalidades.
//////
////////////////////////////////////////////////////////////
function iniciarCategorias(){
    $("#newCat").submit(addCategoria);
    $(".editCat").submit(updateCategoria);
    $(".deletecat").click(deleteCategoria); 
 }

/////////////////////////////////////////////////////////////
//////
//////  Ajax getListadoUsuarios
//////
////////////////////////////////////////////////////////////
function getListadoProductos(resultado) {
    $.post("../../Controller/Gestion/gestionApp.php", {ajax: true}, function (data) {
        
        $("#listado").html(data);
        
        iniciar();

        if (resultado == "error") {
            $("#error").slideDown(200);
        } else if (resultado == "error1") {
            $("#error1").slideDown(200);
        } else if (resultado == "success") {
            $("#success").slideDown(200);
        } else {
            $("#error2").slideDown(200);
        }
    });
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
    
    $.post("../../Controller/Gestion/deleteCategoria.php", {deleteId: id}, function(data) {
        
        var resultado = data;
        
        getListadoProductos(resultado);
        
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

    $.ajax({
        url: "../../Controller/Gestion/updateCategoria.php",
        data: datos, 
        contentType: false, 
        processData: false, 
        type: 'POST'
    }).done(function (data) {
        var resultado = data;

        getListadoProductos(resultado);
        
    });
}