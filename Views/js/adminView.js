function reproducir() {
    
    var player = document.getElementById("audio");
           
    player.currentTime = 0;
    player.play();
    
}

var lienzo;
var konami;
var colores = ["#0aff00", "#00ffff", "#ff0000", "#ffff00", "#ffa500", "#0000ff", "#ff00ff", "#8000ff"];

function canvas () {
    // Seleccionamos el elemento lienzo
    konami = document.getElementById('lienzo'); 
    
    // Seleccionamos el contexto 2d del elemento que hemos seleccionado antes
    lienzo = konami.getContext('2d'); 
    
    // Lanzamos la funcion para pintar el texto
    texto();
}


function texto() {
    // Seleccionamos el elemento lienzo
    var elemento = document.getElementById('lienzo'); 
    
    // Seleccionamos el contexto 2d del elemento que hemos seleccionado antes
    var lienzo = elemento.getContext('2d'); 
    
    // Definimos la fuente y el tamaño como en CSS
    lienzo.font="bold 120px Arial, sans-serif"; 
    
    lienzo.fillStyle= "rgb(255, 255, 255)";
    
        /////   TEXTO SIN TRANSFORMACION RELLENO Y SIN RELLENO  /////
    // Posicion del texto, puede ser start, left, right, center o end
    lienzo.textAlign="start"; 
    
    // Pintamos el mensaje en x=0 y=50
    lienzo.fillText("NYANCAT", 0, 100);
    
    // Cerramos el trazado
    lienzo.closePath();
    
    // Lanzamos la funcion para las gotas exteriores
    pixelado();
    
}

function pixelado() {
    
    // Color negro semi transparente
    lienzo.fillStyle= "rgba(0, 0, 0, 0.6)";
    
    // Empezamos a dibujar
    lienzo.beginPath();
    
    lienzo.globalCompositeOperation="source-atop";
    
    // Color del relleno
    lienzo.fillStyle=colores[randomRange(0, 7)]; 
    
    // Posicion Aleatoria
    var posX = randomRange(5, konami.width);
    var posY = randomRange(0, konami.height);
    
    // 360º
        // Dibuja un rectangulo solido posicion x = 110, posicion y = 110. 100px alto x 100 ancho.
    lienzo.fillRect(posX,posY,5,30); 
    
    // Terminamos el trazado
    lienzo.closePath();
    
    // Volvemos a lanzar la funcion con un timeOut
    setTimeout(pixelado, 1);
}

// Funcion Random entre un minimo y un maximo
function randomRange(min, max) {
    
	// Si queremos numeros enteros con esta formula conseguimos que todos los numeros tengan la misma probabilidad de salir
	var resultado = Math.floor((Math.random() * (max - min + 1)) + min);
    
    return resultado;
}


(function(){
    var app = angular.module('konamiCode', []);

    app.directive("konamiCode", function ($rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                var konami_keys = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
                var konami_index = 0;

                var activaKonamiCode = function (event) {
                    if (event.which === konami_keys[konami_index++]) {
                        if (konami_index === konami_keys.length) {
                            $rootScope.$broadcast('konamiFTW', event.target);
                            element.off('keydown', activaKonamiCode);
                        }
                    } else {
                        konami_index = 0;
                    }
                };

                element.on('keydown', activaKonamiCode);
            }
        };
    });
    
    app.controller('Controller', function ($scope) {
        $scope.konamiCodeYeah = false;

        $scope.$on('konamiFTW', function () {
            $scope.konamiCodeYeah = true;
            $scope.$apply();
            canvas();
            reproducir();
        });
    });
})();