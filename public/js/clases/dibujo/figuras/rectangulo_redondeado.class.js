RectanguloRedondeado.prototype = new Forma;

function RectanguloRedondeado(x, y, alto, ancho, radio, estilo) {
    Forma.call(this, x, y, ancho, alto, estilo);
    this.radio = radio;
    if (this.radio === undefined) {
        this.radio = 5;//valor por defecto
    }
    this.obtenerNombre = function () {
        this.__proto__.obtenerNombre();
        return "RectanguloRedondeado";
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
        //Lo dibujo
        rectanguloRedondeado(contexto, xIni, yIni, anchoT, altoT, this.radio);
        this.estilo.terminar(contexto);
    };

    function rectanguloRedondeado(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
        ctx.lineTo(x + width - radius, y + height);
        ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        ctx.lineTo(x + width, y + radius);
        ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
        ctx.lineTo(x + radius, y);
        ctx.quadraticCurveTo(x, y, x, y + radius);
    }
    ;
    this.intersecta = function (x, y) {
        this.__proto__.intersecta(x, y);

        //Obtengo los puntos de inicio del rectangulo
        var xIni = this.x - ancho;
        var yIni = this.y - alto;
        var anchoT = this.ancho * 2;
        var altoT = this.alto * 2;

        if ((x > (xIni + this.radio) && x < (xIni + anchoT - this.radio)) &&
                (y > yIni && y < yIni + altoT)) {
            return true;
        }
        if ((x >= xIni && x <= (xIni + anchoT)) && (y >= (yIni + this.radio)
                && y <= (yIni + altoT - this.radio))) {
            return true;
        }
        if (intersectaCircunferencias(x, y, xIni, yIni, anchoT, altoT, this.radio)) {
            return true;
        }
        return false;
    };
    function intersectaCircunferencias(x, y, px, py, ancho, alto, radio) {
        var bandera = false;
        var rx = px + radio;
        var ry = py + radio;

        if ((Math.sqrt(Math.pow((rx - x), 2) + Math.pow((ry - y), 2))) <= radio) {
            bandera = true;
        }

        ry = py + alto - radio;

        if ((Math.sqrt(Math.pow((rx - x), 2) + Math.pow((ry - y), 2))) <= radio) {
            bandera = true;
        }

        rx = px + ancho - radio;
        ry = py + radio;

        if ((Math.sqrt(Math.pow((rx - x), 2) + Math.pow((ry - y), 2))) <= radio) {
            bandera = true;
        }

        ry = py + alto - radio;

        if ((Math.sqrt(Math.pow((rx - x), 2) + Math.pow((ry - y), 2))) <= radio) {
            bandera = true;
        }
        return bandera;
    }
    ;
}

