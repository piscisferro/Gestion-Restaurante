// Buscador Javascript
// Funciona bajo el resultado de indexOf. Para realizar la busqueda comparamos lo introducido y le hacemos un indexOf a todos los elementos con cada pulsacion de tecla, asi, si los elementos devuelven numero positivo significa que lo que estamos escribiendo en el buscador coincide dado que indexOf nos da la posicion en la que esta los caracteres que estamos escribiendo.

 
function buscar() {    
    var textoABuscar = $(this).val().toLowerCase();
    
    $(".categorias").find(".nombreOrdenar").each(function() {
        
        var contenidoEtiqueta = $(this).text().toLowerCase();
        
        console.log(textoABuscar);
        
        if (contenidoEtiqueta.indexOf(textoABuscar) !== -1 && textoABuscar != "") {
            
            console.log(contenidoEtiqueta.indexOf(textoABuscar));
            
            $(this).closest('.ordenarPadre').show();
            $(this).closest(".ordenar").show();
            
            if ($(this).closest(".ordenarPadre").find(".unhideCat").css('display') == "none") {
                    $(this).closest(".categoria").find(".unhideCat").show();
            }
            
            
        } else if(textoABuscar == "") { 
            $(".categorias").find(".ordenarPadre").show();
            $(".categorias").find(".ordenar").show();
            $(".categorias").find(".ordenarPadre").find(".unhideCat").hide();
        
        
        } else {
            $(this).closest(".ordenar").hide();
        }
    });
}

$(document).ready(iniciar);

/////////////////////////////////////////////////////////////
//////
//////  Funcion para inicializar las funcionalidades.
//////
////////////////////////////////////////////////////////////
function iniciar(){
    $(".gestionProducto").click(productButton);
    $(".gestionUsuario").click(userButton);
    
    $("#buscador").on("keyup", buscar);
    $(".categorias").sortable();
    $(".productos").sortable();
    
    iniciarGestionApp();
}

/////////////////////////////////////////////////////////////
//////
//////  Funcion para inicializar las funcionalidades de GestionApp.
//////
////////////////////////////////////////////////////////////
function iniciarGestionApp() {
    $(".appCat").click(muestraCatPro);
    $(".editar").click(toggleEdit);
    $(".cancelar").click(toggleCancelar);
    $(".despliegaCat").click(toggleDesplegarCategoria);
    $(".despliegaPro").click(toggleDesplegarProducto);
}

///////////////////////////////////////////////////////////////////////
//////  Funcion hideAll para esconder todas las clases hidden
///////////////////////////////////////////////////////////////////////
function hideAll() {
    
    $(".hidden").hide();
    
}

///////////////////////////////////////////////////////////////////////
//////  Funcion toggleEdit pertenece a Gestion App
///////////////////////////////////////////////////////////////////////
function toggleEdit() {
    
    $(this).closest("li").children(".toggle").slideToggle(100);
    
}


///////////////////////////////////////////////////////////////////////
//////  Funcion toggleCancelar pertenece a Gestion App
///////////////////////////////////////////////////////////////////////
function toggleCancelar(e) {
    e.preventDefault();
    
    $(this).closest("li").children(".toggle").slideToggle(100);
    
}


///////////////////////////////////////////////////////////////////////
//////  Funcion toggleDesplegarCategoria pertenece a Gestion App
///////////////////////////////////////////////////////////////////////
function toggleDesplegarCategoria() {
    
    $(this).closest("li").find(".unhideCat").toggle(200);
    
}


///////////////////////////////////////////////////////////////////////
//////  Funcion toggleDesplegarProducto pertenece a Gestion App
///////////////////////////////////////////////////////////////////////
function toggleDesplegarProducto() {
    $(this).closest("li").find(".unhidePro").toggle(200);
    
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

/////////////////////////////////////////////////////////////
//////
//////  Ajax getListadoUsuarios
//////
////////////////////////////////////////////////////////////
function getListadoUsuarios(resultado) {
    $.post("../../Controller/Gestion/gestionUsuarios.php", {ajax: true}, function (data) {
        
        $("#listado").html(data);
        
        iniciarUsuarios();
        iniciarGestionApp();

        if (resultado == "error") {
            $("#error").slideDown(200);
        } else if (resultado == "error1") {
            $("#error1").slideDown(200);
        } else if (resultado == "success") {
            $("#success").slideDown(200);
        } else if (resultado == false) {
            
        } else {
            $("#error2").slideDown(200);
        }
    });
}

/////////////////////////////////////////////////////////////
//////
//////  Ajax getListadoProductos
//////
////////////////////////////////////////////////////////////
function getListadoProductos(resultado) {
    $.post("../../Controller/Gestion/gestionApp.php", {ajax: true}, function (data) {
        
        $("#listado").html(data);
        
        iniciarCategorias();
        iniciarGestionApp();
        iniciarProductos();

        if (resultado == "error") {
            $("#error").slideDown(200);
        } else if (resultado == "error1") {
            $("#error1").slideDown(200);
        } else if (resultado == "success") {
            $("#success").slideDown(200);
        } else if (resultado == false) {
            
        } else {
            $("#error2").slideDown(200);
        }
    });
}

///////////////////////////////////////////////////////////////////////
//////  Funcion para cargar listado de productos
///////////////////////////////////////////////////////////////////////
function productButton() {
    getListadoProductos(false);
    $(this).addClass("activated");
    $(".gestionUsuario").removeClass("activated");
    
}



///////////////////////////////////////////////////////////////////////
//////  Funcion para cargar listado de usuarios
///////////////////////////////////////////////////////////////////////
function userButton() {
    
    getListadoUsuarios(false);
    $(this).addClass("activated");
    $(".gestionProducto").removeClass("activated");
    
    
}