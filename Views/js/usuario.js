$(document).ready(iniciarUsuarios);


$(document).ready(function(){
    jQuery.validator.addMethod("notEqualToGroup", function(value, element, options) {
        // get all the elements passed here with the same class
        var elems = $(element).parents('form').find(options[0]);
        // the value of the current element
        var valueToCompare = value;
        // count
        var matchesFound = 0;
        // loop each element and compare its value with the current value
        // and increase the count every time we find one
        jQuery.each(elems, function(){
            thisVal = $(this).val();
            if(thisVal == valueToCompare){
                matchesFound++;
            }
        });
        // count should be either 0 or 1 max
        if(this.optional(element) || matchesFound <= 1) {
                elems.removeClass('errorForm');
                return true;
            } else {
                elems.addClass('errorForm');
            }
    });
    
});



/////////////////////////////////////////////////////////////
//////
//////  Funcion para inicializar las funcionalidades.
//////
////////////////////////////////////////////////////////////
function iniciarUsuarios(){
    $("#usuarioadd").submit(addUsuario);
    $(".usuarioedit").submit(updateUsuario);
    $(".passwordedit").submit(updatePassword);
    $(".deleteusuario").click(deleteusuario); 
    $(".passwordEditAnchor").click(togglePassword);
    $(".passwordCancelar").click(togglePassword);
    
    $("#usuarioadd").validate({
        rules: {
                newusuario: {
                    required: true,
                    minlength: 3
                },
                newpassword: {
                    required: true,
                    minlength: 6
                }
            },
            errorClass: "errorForm"
    });
    
    $(".usuarioedit").each(function() {
        $(this).validate({
            rules: {
                usuarioEdit: {
                    required: true,
                    minlength: 3
                }
            },
            errorClass: "errorForm"
        });
        
    });
    
    $(".passwordedit").each(function() {
        $(this).validate({
            rules: {
                passwordEdit: {
                    required: true,
                    minlength: 6
                }, 
                passwordConfirm: {
                    notEqualToGroup: [".password"]
                }
            },
            errorClass: "errorForm"
        });
        
    });
    
    hideAll();
 }

/////////////////////////////////////////////////////////////
//////
//////  Toggle Effect Password Edit
//////
////////////////////////////////////////////////////////////
function togglePassword(e) {
    e.preventDefault();
    $(this).closest("li").find(".passwordToggle").toggle(200);
    $(this).closest("li").find(".usuario").toggle(200);
    
}


/////////////////////////////////////////////////////////////
//////
//////  Ajax addUsuario
//////
////////////////////////////////////////////////////////////
function addUsuario(e) {
    e.preventDefault();
    
    // Pasamos el validador
    if (!$(this).valid()) {
        return;
    }
    
    var datos = new FormData(this);

    $.ajax({
        url: "../../Controller/Gestion/addUsuario.php",
        data: datos, 
        contentType: false, 
        processData: false, 
        type: 'POST'
    }).done(function (data) {
        var resultado = data;

        getListadoUsuarios(resultado);
        
    });
}

/////////////////////////////////////////////////////////////
//////
//////  Ajax deleteUsuario
//////
////////////////////////////////////////////////////////////
function deleteusuario() {
    
    var id = $(this).closest("li").attr("id");
    
    // Creamos el dialog
    var dialog = $("<div>¿Esta seguro de que desea borrar este Usuario?</div>");
    
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
                $.post("../../Controller/Gestion/deleteUsuario.php", {deleteId: id}, function(data) {

                var resultado = data;

                getListadoUsuarios(resultado);

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
//////  Ajax updateUsuario
//////
////////////////////////////////////////////////////////////
function updateUsuario(e) {
    e.preventDefault();
    var datos = new FormData(this);
    
    // Pasamos el validador
    if (!$(this).valid()) {
        return;
    }
    
    // Creamos el dialog
    var dialog = $("<div>¿Esta seguro de que desea Modificar este Usuario?</div>");
    
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
                url: "../../Controller/Gestion/updateUsuario.php",
                data: datos, 
                contentType: false, 
                processData: false, 
                type: 'POST'
            }).done(function (data) {
                var resultado = data;

                getListadoUsuarios(resultado);

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
//////  Ajax updatePassword
//////
////////////////////////////////////////////////////////////
function updatePassword(e) {
    e.preventDefault();
    var datos = new FormData(this);

    // Pasamos el validador
    if (!$(this).valid()) {
        return;
    }
    
    // Creamos el dialog
    var dialog = $("<div>¿Esta seguro de que desea Modificar este Usuario?</div>");
    
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
                    url: "../../Controller/Gestion/updatePassword.php",
                    data: datos, 
                    contentType: false, 
                    processData: false, 
                    type: 'POST'
                }).done(function (data) {
                    var resultado = data;

                    getListadoUsuarios(resultado);

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

