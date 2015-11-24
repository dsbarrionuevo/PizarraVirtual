Rectangulo.prototype = new Forma;
function Rectangulo(x, y, ancho, alto, estilo) {
    Forma.call(this, x, y, ancho, alto, estilo);
    this.obtenerNombre = function () {
        this.__proto__.obtenerNombre();
        return "Rectangulo";
    };
    this.dibujar = function (contexto) {
        //llamo al metodo del padre, si bien forma no posee este metodo, pero llama al metodo de visualizable
        this.__proto__.dibujar(contexto);
        this.estilo.preparar(contexto);
        contexto.beginPath();
        //Obtengo los puntos de inicio del rectangulo
        var xIni = this.x - ancho;
        var yIni = this.y - alto;
        var anchoT= this.ancho*2;
        var altoT= this.alto*2;
        //Lo diibujo
        contexto.rect(xIni, yIni, anchoT, altoT);
        this.estilo.terminar(contexto);
    };
    this.intersecta = function (x, y) {
        var xIni = this.x - ancho;
        var yIni = this.y - alto;
        var anchoT= this.ancho*2;
        var altoT= this.alto*2;
        
        this.__proto__.intersecta(x, y);
        return ((x > xIni && x < xIni + anchoT) && (y > yIni && y < yIni + altoT));
    };
    this.mover = function (x, y) {
        this.__proto__.mover(x, y);
        this.x = this.x + x;
        this.y = this.y + y;
    };
}