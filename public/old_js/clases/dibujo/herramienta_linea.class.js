HerramientaLinea.prototype = new Herramienta;
/**
 * Permite crear una linea
 * @param {Papel} papel Papal de dibujo
 * @returns {HerramientaLinea}
 */
function HerramientaLinea(papel) {
    Herramienta.call(this, "Linea", papel);
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
            var f = new Linea(xc, yc, evento.offsetX, evento.offsetY);
            papel.agregarObjeto(f);
            papel.dibujar();
    };
}