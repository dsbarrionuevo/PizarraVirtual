Circulo.prototype = new Forma;
/**
 * Forma circulo
 * @param {float} x Posicion x del origen del circulo.
 * @param {float} y Posicion y del origen del circulo.
 * @param {float} radio Longitud del radio.
 * @param {Estilo} estilo
 * @returns {Circulo}
 */
function Circulo(x, y, radio, estilo) {
    Forma.call(this, x - radio, y - radio, radio * 2, radio * 2, estilo);
    this.radio = radio;
    this.obtenerNombre = function () {
        this.__proto__.obtenerNombre();
        return "Circulo";
    };
    this.dibujar = function (contexto) {
        this.__proto__.dibujar(contexto);
        this.estilo.preparar(contexto);
        contexto.beginPath();
        contexto.arc(this.x + this.radio, this.y + this.radio, this.radio, 0, 2 * Math.PI);
        this.estilo.terminar(contexto);
    };
    this.intersecta = function (x, y) {
        this.__proto__.intersecta(x, y);
        var cx = this.x + this.radio;
        var cy = this.y + this.radio;
        return ((Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy))) <= this.radio);
    };
    this.mover = function (x, y) {
        this.__proto__.mover(x, y);
        this.x = this.x + x;
        this.y = this.y + y;
    };
    this.escalar = function (x, y) {
        this.radio = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    };
    
      this.marcar = function (contexto) {
        this.__proto__.marcar(contexto);
        contexto.save();
        contexto.beginPath();
        contexto.strokeStyle = "#00f";
        contexto.lineWidth = 1;
        contexto.rect(this.x, this.y, this.ancho, this.alto);
        contexto.stroke();
        contexto.restore();
    };
}