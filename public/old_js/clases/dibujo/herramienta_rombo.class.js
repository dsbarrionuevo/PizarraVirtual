HerramientaRombo.prototype = new Herramienta;
/**
 * Permite crear un rombo
 * @param {Papel} papel Papal de dibujo
 * @returns {HerramientaRombo}
 */
function HerramientaRombo(papel) {
    Herramienta.call(this, "Rombo", papel);
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
            var f = new Rombo(xi, yi, ancho, alto);
            papel.agregarObjeto(f);
            papel.dibujar();
    };
}
