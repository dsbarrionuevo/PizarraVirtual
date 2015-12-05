HerramientaCirculo.prototype = new Herramienta;
/**
 * Permite crear un circulo
 * @param {Papel} papel Papal de dibujo
 * @returns {HerramientaCirculo}
 */
function HerramientaCirculo(papel) {
    Herramienta.call(this, "Circulo", papel);
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
        var radio = Math.sqrt((ancho * ancho) + (alto * alto));
        var xc = this.x + ((evento.offsetX - this.x) / 2);
        var yc = this.y + ((evento.offsetY - this.y) / 2);
        var f = new Circulo(xc, yc, radio);
        papel.agregarObjeto(f);
        papel.dibujar();
    };
}