Linea.prototype = new Forma;
/**
 * Forma linea
 * @param {float} xi Posicion x del punto inicial de la linea.
 * @param {float} yi Posicion y del punto inicial de la linea.
 * @param {float} xf Posicion x del punto final de la linea.
 * @param {float} yf Posicion y del punto final de la linea.
 * @param {Estilo} estilo
 * @returns {Linea}
 */
function Linea(xi, yi, xf, yf, estilo) {
    Forma.call(this, xi, yi, xi + xf, yi + yf, estilo);
    this.xf = xf;
    this.yf = yf;
    this.dibujar = function (contexto) {
        this.__proto__.dibujar(contexto);
        this.estilo.preparar(contexto);
        contexto.beginPath();
        contexto.moveTo(this.x, this.y);
        contexto.lineTo(this.xf, this.yf);
        contexto.stroke();
        this.estilo.terminar(contexto);
    };
}