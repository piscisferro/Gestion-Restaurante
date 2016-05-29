$(document).ready(iniciarUsuarios);

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
            "Borrar": function () {
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
            "Borrar": function () {
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

