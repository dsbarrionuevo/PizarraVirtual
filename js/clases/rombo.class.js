Rombo.prototype = new Forma;
function Rombo(x, y, ancho, alto, estilo) {
    Forma.call(this, x, y, ancho, alto, estilo);
    this.dibujar = function (contexto) {
        
        this.__proto__.dibujar(contexto);
        this.estilo.preparar(contexto);
        rombo(contexto,this.x, this.y, this.ancho, this.alto);
        this.estilo.terminar(contexto);
    };
    
    function rombo(ctx,x,y,ancho,alto){
        ctx.beginPath();
        ctx.moveTo(x+(ancho/2),y);
        ctx.lineTo(x,y+(alto/2));
        ctx.lineTo(x+(ancho/2),(y+alto));
        ctx.lineTo((x+ancho),y+(alto/2));
        ctx.lineTo(x+(ancho/2),y);
    };
}





