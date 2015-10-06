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
        this.__proto__.intersecta(x,y);
        
        var x1 = this.x;
        var y1 = this.y + this.alto;
        var x2 = this.x+this.ancho;
        var y2 = this.y + this.alto;
        
        var d1 = (y2-y1)*x + (x1-x2)*y + (x2*y1-y2*x1);
        
        x1 = this.x + (this.ancho/2);
        y1 = this.y;
        x2 = this.x;
        y2 = this.y+this.alto;
        
        var d2 = (y2-y1)*x + (x1-x2)*y + (x2*y1-y2*x1);
        
        x2 = this.x + this.ancho;
        
        var d3 = (y2-y1)*x + (x1-x2)*y + (x2*y1-y2*x1);
        
        return (d1>=0 && d2>=0 && d3<=0);
    };
}

