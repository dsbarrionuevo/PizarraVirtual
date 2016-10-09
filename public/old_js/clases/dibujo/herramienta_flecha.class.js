HerramientaFlecha.prototype = new Herramienta;
/**
 * Permite crear una flecha
 * @param {Papel} papel Papal de dibujo
 * @returns {HerramientaFlecha}
 */
function HerramientaFlecha(papel) {
    Herramienta.call(this, "Flecha", papel);
    this.x;
    this.y;

    this.onmousedown = function (evento) {
        this.__proto__.onmousedown(evento);
        this.x = evento.offsetX;
        this.y = evento.offsetY;
    };
    this.onmouseup = function (evento) {
        var xc = this.x + ((evento.offsetX - this.x) / 2);
        var yc = this.y + ((evento.offsetY - this.y) / 2);
        var f = new Flecha(xc, yc, evento.offsetX, evento.offsetY);
        papel.agregarObjeto(f);
        papel.dibujar();
    };
}