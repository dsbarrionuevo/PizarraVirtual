HerramientaRectanguloRedondeado.prototype = new Herramienta;
/**
 * Permite crear un rectangulo con esquinas redondeadas
 * @param {Papel} papel Papal de dibujo
 * @returns {HerramientaRectanguloRedondeado}
 */
function HerramientaRectanguloRedondeado(papel) {
    Herramienta.call(this, "RectanguloRedondeado", papel);
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
        var f = new RectanguloRedondeado(xi, yi, ancho, alto);
        papel.agregarObjeto(f);
        papel.dibujar();

    };
}