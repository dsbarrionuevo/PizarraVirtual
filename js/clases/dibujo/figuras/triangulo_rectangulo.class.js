TrianguloRectangulo.prototype = new Forma;
function TrianguloRectangulo(x, y, ancho, alto, estilo) {
    Forma.call(this, x, y, ancho, alto, estilo);
    this.dibujar = function (contexto) {
        this.__proto__.dibujar(contexto);
        this.estilo.preparar(contexto);
        trianguloRectangulo(contexto, this.x, this.y, this.ancho, this.alto);
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
    
    this.intersecta = function(x,y){
        this.__proto__.intersecta(x,y);
        
        var x1 = this.x;
        var y1 = this.y + this.alto;
        var x2 = this.x+this.ancho;
        var y2 = this.y + this.alto;
        
        var d1 = (y2-y1)*x + (x1-x2)*y + (x2*y1-y2*x1);
        console.log(d1);
        x1 = this.x;
        y1 = this.y;
        x2 = this.x;
        y2 = this.y+this.alto;
        
        var d2 = (y2-y1)*x + (x1-x2)*y + (x2*y1-y2*x1);
        console.log(d2);
        x2 = this.x + this.ancho;
        
        var d3 = (y2-y1)*x + (x1-x2)*y + (x2*y1-y2*x1);
        console.log(d3);
        return (d1>=0 && d2>=0 && d3<=0);
    };
}



