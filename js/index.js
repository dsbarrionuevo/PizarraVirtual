var papel;
window.addEventListener("load", function () {
    papel = new Papel(document.querySelector("canvas"));

    var c1 = new RectanguloRedondeado(0, 0, 100,100,30, new Estilo(function (contexto) {
        contexto.save();
        contexto.fillStyle = "#f00";
    }));
//    papel.agregarObjeto(r1);
//    papel.agregarObjeto(r2);
    papel.agregarObjeto(c1);
//    papel.agregarObjeto(c2);
    papel.dibujar();
    
    console.log(c1.intersecta(0,50));
//    console.log(c2.intersecta(301, 300));//en el borde izquierdo
//    console.log(c2.intersecta(300, 300));//fuera...
});