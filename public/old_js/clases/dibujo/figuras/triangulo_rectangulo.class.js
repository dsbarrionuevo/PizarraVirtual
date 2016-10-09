TrianguloRectangulo.prototype = new Forma;
function TrianguloRectangulo(x, y, ancho, alto, estilo) {
    Forma.call(this, x, y, ancho, alto, estilo);
    this.obtenerNombre = function () {
        this.__proto__.obtenerNombre();
        return "TrianguloRectangulo";
    };
    this.dibujar = function (contexto) {
        this.__proto__.dibujar(contexto);
        this.estilo.preparar(contexto);
        contexto.beginPath();
        //Obtengo los puntos de inicio del rectangulo
        var xIni = this.x - ancho;
        var yIni = this.y - alto;
        var anchoT = this.ancho * 2;
        var altoT = this.alto * 2;

        trianguloRectangulo(contexto, xIni, yIni, anchoT, altoT);
        this.estilo.terminar(contexto);
    };

    //dibuja siempre un traingulo rectangulo donde los dos forman el angulo
    //de 90 grados en el vertice inferior izquierdo de la figura, es decir
    //en el punto = (x, y+alto)
    function trianguloRectangulo(ctx, x, y, ancho, alto) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, (y + alto));
        ctx.lineTo((x + ancho), (y + alto));
        ctx.lineTo(x, y);
    }

    this.intersecta = function (x, y) {
        this.__proto__.intersecta(x, y);

        //Obtengo los puntos de inicio del rectangulo
        var xIni = this.x - ancho;
        var yIni = this.y - alto;
        var anchoT = this.ancho * 2;
        var altoT = this.alto * 2;

        var x1 = xIni;
        var y1 = yIni + altoT;
        var x2 = xIni + anchoT;
        var y2 = yIni + altoT;

        var d1 = (y2 - y1) * x + (x1 - x2) * y + (x2 * y1 - y2 * x1);

        x1 = xIni;
        y1 = yIni;
        x2 = xIni;
        y2 = yIni + altoT;

        var d2 = (y2 - y1) * x + (x1 - x2) * y + (x2 * y1 - y2 * x1);

        x2 = xIni + anchoT;

        var d3 = (y2 - y1) * x + (x1 - x2) * y + (x2 * y1 - y2 * x1);

        return (d1 >= 0 && d2 >= 0 && d3 <= 0);
    };
}



