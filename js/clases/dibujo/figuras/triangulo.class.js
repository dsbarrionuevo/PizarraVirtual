Triangulo.prototype = new Forma;
function Triangulo(x, y, ancho, alto, estilo) {
    Forma.call(this, x, y, ancho, alto, estilo);
    this.dibujar = function (contexto) {
        this.__proto__.dibujar(contexto);
        this.estilo.preparar(contexto);
        triangulo(contexto, this.x, this.y, this.ancho, this.alto);
        this.estilo.terminar(contexto);
    };

    //dibuja un triangulo donde el x, y es el punto de la punta del triangulo,
    //por lo tanto el triangulo se dibuja "hacia abajo"
    function triangulo(ctx, x, y, ancho, alto) {
        ctx.beginPath();
        ctx.moveTo(x + (ancho / 2), y);
        ctx.lineTo(x, (y + alto));
        ctx.lineTo((x + ancho), (y + alto));
        ctx.lineTo(x + (ancho / 2), y);
    };
    
    this.intersecta = function(x,y){
        
    };
}

