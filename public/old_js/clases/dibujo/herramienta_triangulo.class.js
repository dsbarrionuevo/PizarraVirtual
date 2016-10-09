HerramientaTriangulo.prototype = new Herramienta;
/**
 * Permite crear un triangulo
 * @param {Papel} papel Papal de dibujo
 * @returns {HerramientaTriangulo}
 */
function HerramientaTriangulo(papel) {
    Herramienta.call(this, "Triangulo", papel);
    this.x;
    this.y;

    this.onmousedown = function (evento) {
        this.__proto__.onmousedown(evento);
        this.x = evento.offsetX;
        this.y = evento.offsetY;
    };
    this.onmouseup = function (evento) {
        var ancho = (evento.offsetX - this.x) / 2;
        var alto = (evento.offsetY - this.y) / 2;
        var xi = this.x + ancho;
        var yi = this.y + alto;
        var f = new Triangulo(xi, yi, ancho, alto);
        papel.agregarObjeto(f);
        papel.dibujar();

    };
}