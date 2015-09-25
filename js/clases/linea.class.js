Linea.prototype = new Forma;
function Linea(xi, yi, xf, yf, estilo) {
    Forma.call(this, xi, yi, xi + xf, yi + yf, estilo);
    this.xf = xf;
    this.yf = yf;
    this.dibujar = function (contexto) {
        this.__proto__.dibujar(contexto);
        contexto.save();
        this.estilo.estilizar(contexto);
        contexto.beginPath();
        contexto.moveTo(this.x, this.y);
        contexto.lineTo(this.xf, this.yf);
        contexto.stroke();
        contexto.restore();
    };
}