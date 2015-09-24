Forma.prototype = new Visualizable;
function Forma(x, y) {
    this.x = x;
    this.y = y;
    this.ancho;
    this.alto;
    //metodo abstracto
    this.dibujar = function (contexto) {
    };
}