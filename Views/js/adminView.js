$(document).ready(function() {
    
    $(".modulo").mouseenter(reproducir);
});

function reproducir() {
    
    var player = document.getElementById("audio");
           
    player.currentTime = 0;
    player.play();
    
    
}