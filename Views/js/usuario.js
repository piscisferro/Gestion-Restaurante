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
//////  Ajax getListadoUsuarios
//////
////////////////////////////////////////////////////////////
function getListadoUsuarios(resultado) {
    $.post("../../Controller/Gestion/gestionUsuarios.php", {ajax: true}, function (data) {
        
        $("#listado").html(data);
        
        iniciar();
        iniciarUsuarios();

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
    
    $.post("../../Controller/Gestion/deleteUsuario.php", {deleteId: id}, function(data) {
        
        var resultado = data;
        
        getListadoUsuarios(resultado);
        
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
}


/////////////////////////////////////////////////////////////
//////
//////  Ajax updatePassword
//////
////////////////////////////////////////////////////////////
function updatePassword(e) {
    e.preventDefault();
    var datos = new FormData(this);

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
}

