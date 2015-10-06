Rombo.prototype = new Forma;
function Rombo(x, y, ancho, alto, estilo) {
    Forma.call(this, x, y, ancho, alto, estilo);
    this.dibujar = function (contexto) {
        this.__proto__.dibujar(contexto);
        this.estilo.preparar(contexto);
        rombo(contexto, this.x, this.y, this.ancho, this.alto);
        this.estilo.terminar(contexto);
    };

    function rombo(ctx, x, y, ancho, alto) {
        ctx.beginPath();
        ctx.moveTo(x + (ancho / 2), y);
        ctx.lineTo(x, y + (alto / 2));
        ctx.lineTo(x + (ancho / 2), (y + alto));
        ctx.lineTo((x + ancho), y + (alto / 2));
        ctx.lineTo(x + (ancho / 2), y);
    }
    
    this.intersecta = function(x,y){
        this.__proto__.intersecta(x,y);
        
        var x1 = this.x + (this.ancho/2);
        var y1 = this.y;
        var x2 = this.x;
        var y2 = this.y + (this.alto/2);
        
        var d1 = (y2-y1)*x + (x1-x2)*y + (x2*y1-y2*x1);
        
        x1 = this.x;
        y1 = this.y + (this.alto/2);
        x2 = this.x + (this.ancho/2);
        y2 = this.y+this.alto;
        
        var d2 = (y2-y1)*x + (x1-x2)*y + (x2*y1-y2*x1);
        
        x1 = this.x + (this.ancho/2);
        y1 = this.y+this.alto;
        x2 = this.x + this.ancho;
        y2 = this.y + (this.alto/2);
        
        var d3 = (y2-y1)*x + (x1-x2)*y + (x2*y1-y2*x1);
        
        x1 = this.x + this.ancho;
        y1 = this.y + (this.alto/2);
        x2 = this.x + (this.ancho/2);
        y2 = this.y;
        
        var d4 = (y2-y1)*x + (x1-x2)*y + (x2*y1-y2*x1);
        
        return (d1>=0 && d2>=0 && d3>=0 && d4>=0);
    };
}





