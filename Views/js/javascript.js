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