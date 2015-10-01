RectanguloRedondeado.prototype = new Forma;

function RectanguloRedondeado(x, y, alto, ancho, estilo) {
    Forma.call(this, x, y, ancho, alto, estilo);

    this.dibujar = function (contexto) {
        this.__proto__.dibujar(contexto);
        this.estilo.preparar(contexto);
        rectanguloRedondeado(contexto,this.x, this.y, this.ancho, this.alto, 45);
        this.estilo.terminar(contexto);
    };
    
    function rectanguloRedondeado(ctx,x,y,width,height,radius){
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
}

