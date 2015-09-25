function Visualizable(x, y, ancho, alto, estilo) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.estilo = estilo;
    //metodo abstracto
    this.dibujar = function (contexto) {
    };
}