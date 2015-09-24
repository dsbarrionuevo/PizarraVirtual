Rectangulo.prototype = new Forma;
function Rectangulo(x, y, ancho, alto) {
    Forma.call(this, x, y);
    this.ancho = ancho;
    this.alto = alto;
    this.dibujar = function (contexto) {
        //llamo al metodo del padre
        this.__proto__.dibujar(contexto);
        contexto.fillRect(this.x, this.y, this.ancho, this.alto);
    };
}