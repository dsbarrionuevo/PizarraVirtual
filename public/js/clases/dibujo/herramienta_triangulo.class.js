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
            var f = new Triangulo(xi, yi, ancho, alto);
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