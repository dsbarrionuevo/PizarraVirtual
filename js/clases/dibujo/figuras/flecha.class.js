Flecha.prototype = new Forma;
/**
 * Forma flecha
 * @param {float} xi Posicion x del punto inicial de la flecha.
 * @param {float} yi Posicion y del punto inicial de la flecha.
 * @param {float} xf Posicion x del punto final de la flecha.
 * @param {float} yf Posicion y del punto final de la flecha.
 * @param {type} estilo
 * @returns {Flecha}
 */
function Flecha(xi, yi, xf, yf, largoPunta, estilo) {
    Forma.call(this, xi, yi, xi + xf, yi + yf, estilo);
    this.xf = xf;
    this.yf = yf;
    this.largoPunta = largoPunta;
    if (this.largoPunta === undefined) {
        //valor por defecto,
        //tambien podria ser un 5% del largo total de la flecha
        this.largoPunta = 10;
    }
    this.dibujar = function (contexto) {
        this.__proto__.dibujar(contexto);
        this.estilo.preparar(contexto);
        contexto.beginPath();
        contexto.moveTo(this.x, this.y);
        contexto.lineTo(this.xf, this.yf);
        var angulo = Math.atan2(this.yf - this.y, this.xf - this.x);
        angulo = angulo * 180 / Math.PI;//en grados
        var punto1 = {
            x: (Math.cos((angulo - 135) * Math.PI / 180) * this.largoPunta),
            y: (Math.sin((angulo - 135) * Math.PI / 180) * this.largoPunta)
        };
        var punto2 = {
            x: (Math.cos((angulo + 135) * Math.PI / 180) * this.largoPunta),
            y: (Math.sin((angulo + 135) * Math.PI / 180) * this.largoPunta)
        };
        contexto.lineTo(this.xf + punto1.x, this.yf + punto1.y);
        contexto.lineTo(this.xf, this.yf);
        contexto.lineTo(this.xf + punto2.x, this.yf + punto2.y);
        contexto.lineTo(this.xf, this.yf);
        contexto.stroke();
        this.estilo.terminar(contexto);
    };
}