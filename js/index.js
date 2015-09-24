var papel;
window.addEventListener("load", function () {
    papel = new Papel(document.querySelector("canvas"));
    var r1 = new Rectangulo(10, 10, 20, 20);
    papel.agregarObjeto(r1);
    papel.dibujar();
});