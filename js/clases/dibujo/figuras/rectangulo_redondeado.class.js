RectanguloRedondeado.prototype = new Forma;

function RectanguloRedondeado(x, y, alto, ancho, radio, estilo) {
    Forma.call(this, x, y, ancho, alto, estilo);
    this.radio = radio;
    if (this.radio === undefined) {
        this.radio = 5;//valor por defecto
    }
    this.dibujar = function (contexto) {
        this.__proto__.dibujar(contexto);
        this.estilo.preparar(contexto);
        contexto.beginPath();
        rectanguloRedondeado(contexto, this.x, this.y, this.ancho, this.alto, this.radio);
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
    };
    this.intersecta = function (x, y) {
        this.__proto__.intersecta(x, y);
        
        if ((x > (this.x + this.radio) && x < (this.x + this.ancho - this.radio)) && (y > this.y && y < this.y + this.alto)) {
            return true;
        }
        if ((x >= this.x  && x <= (this.x + this.ancho)) && (y >= (this.y + this.radio) 
                && y <= (this.y + this.alto - this.radio))) {
            return true;
        }
        if(intersectaCircunferencias(x,y,this.x,this.y,this.ancho,this.alto,this.radio)){
            return true;
        }
        return false;
    };
    function intersectaCircunferencias(x,y,px,py,ancho,alto,radio){
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
    };
}

