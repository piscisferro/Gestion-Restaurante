// Buscador Javascript
// Funciona bajo el resultado de indexOf. Para realizar la busqueda comparamos lo introducido y le hacemos un indexOf a todos los elementos con cada pulsacion de tecla, asi, si los elementos devuelven numero positivo significa que lo que estamos escribiendo en el buscador coincide dado que indexOf nos da la posicion en la que esta los caracteres que estamos escribiendo.

$("#search-criteria").on("keyup", function() {
    
    var textoABuscar = $(this).val().toLowerCase();
    
    $(".fbbox .fix label").each(function() {
        
        var contenidoEtiqueta = $(this).text().toLowerCase();
        
        if (contenidoEtiqueta.indexOf(textoABuscar) !== -1) {
            
            $(this).closest('.fbbox').show();
            
        } else {
            $(this).closest('.fbbox').hide();
        }
    });
});

$(document).ready(iniciar);

/////////////////////////////////////////////////////////////
//////
//////  Funcion para inicializar las funcionalidades.
//////
////////////////////////////////////////////////////////////
function iniciar(){
    $("#success").hide();
    $("#error").hide();
    $("#error1").hide();
    $("#error2").hide();
    
    
    
    $(".appCat").click(muestraCatPro);
    $(".editar").click(toggleEdit);
    $(".cancelar").click(toggleCancelar);
    $(".despliegaCat").click(toggleDesplegarCategoria);
    $(".despliegaPro").click(toggleDesplegarProducto);
    
    hideAll();
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
