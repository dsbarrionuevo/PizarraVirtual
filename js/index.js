var papel;
window.addEventListener("load", function () {
    papel = new Papel(document.querySelector("canvas"));
    var r1 = new Rectangulo(10, 10, 20, 20);
    var r2 = new Rectangulo(40, 10, 20, 20);
    var c1 = new Circulo(80, 20, 10, new Estilo(function (contexto) {
        contexto.save();
        contexto.fillStyle = "#f00";
    }));
    var c2 = new Circulo(papel.canvas.width / 2, papel.canvas.height / 2, 100);
    
    papel.agregarObjeto(r1);
    papel.agregarObjeto(r2);
    papel.agregarObjeto(c1);
    papel.agregarObjeto(c2);
    papel.dibujar();
    console.log(c2.intersecta(301, 300));//en el borde izquierdo
    console.log(c2.intersecta(300, 300));//fuera...
});