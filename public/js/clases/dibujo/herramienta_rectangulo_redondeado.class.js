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
    var bandera = true;
    this.onclick = function (evento) {
        this.__proto__.onclick(evento);
        if (bandera) {
            this.x = evento.offsetX;
            this.y = evento.offsetY;
            bandera = false;
        } else {
            var ancho = (evento.offsetX - this.x) / 2;
            var alto = (evento.offsetY - this.y) / 2;
            var xi = this.x + ancho;
            var yi = this.y + alto;
            var f = new RectanguloRedondeado(xi, yi, ancho, alto);
            papel.agregarObjeto(f);
            papel.dibujar();
            bandera = true;
        }
    };
    this.ontoolchanged = function (evento) {
        this.__proto__.ontoolchanged(evento);
        bandera = true;
    };
}