TrianguloRectangulo.prototype = new Forma;
function TrianguloRectangulo(x, y, ancho, alto, estilo) {
    Forma.call(this, x, y, ancho, alto, estilo);
    this.dibujar = function (contexto) {
        
        this.__proto__.dibujar(contexto);
        this.estilo.preparar(contexto);
        trianguloRectangulo(contexto,this.x, this.y, this.ancho, this.alto);
        this.estilo.terminar(contexto);
    };
    
    function trianguloRectangulo(ctx,x,y,ancho,alto){
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x,(y+alto));
        ctx.lineTo((x+ancho),(y+alto));
        ctx.lineTo(x,y);
    };
}



