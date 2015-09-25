var papel;
window.addEventListener("load", function () {
    papel = new Papel(document.querySelector("canvas"));
    var estilo = new Estilo(function(contexto){
        contexto.fillStyle = "blue";
        contexto.lineWidth = 2;
    });
    var r1 = new Rectangulo(10, 10, 20, 20, estilo);
    var l1 = new Linea(40, 20, 150, 20, estilo);
    papel.agregarObjeto(r1);
    papel.agregarObjeto(l1);
    papel.dibujar();
});