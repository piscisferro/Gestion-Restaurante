/////////////////////////////////////////////////////////////
//////
//////  Funcion para inicializar las funcionalidades.
//////
////////////////////////////////////////////////////////////
function iniciarProductos() {
    $(".addProducto").submit(addProducto);
    $(".editPro").submit(updateProducto);
    $(".deletePro").click(deleteProducto); 
 }


/////////////////////////////////////////////////////////////
//////
//////  Ajax addProducto
//////
////////////////////////////////////////////////////////////
function addProducto(e) {
    e.preventDefault();
    var datos = new FormData(this);

    $.ajax({
        url: "../../Controller/Gestion/addProducto.php",
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
//////  Ajax deleteProducto
//////
////////////////////////////////////////////////////////////
function deleteProducto() {
    
    var id = $(this).closest("li").attr("id");
    
    $.post("../../Controller/Gestion/deleteProducto.php", {deleteId: id}, function(data) {
        
        var resultado = data;
        
        getListadoProductos(resultado);
        
    });
}
 


/////////////////////////////////////////////////////////////
//////
//////  Ajax updateProducto
//////
////////////////////////////////////////////////////////////
function updateProducto(e) {
    e.preventDefault();
    var datos = new FormData(this);

    $.ajax({
        url: "../../Controller/Gestion/updateProducto.php",
        data: datos, 
        contentType: false, 
        processData: false, 
        type: 'POST'
    }).done(function (data) {
        var resultado = data;

        getListadoProductos(resultado);
        
    });
}