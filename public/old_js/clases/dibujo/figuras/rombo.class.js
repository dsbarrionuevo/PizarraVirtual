Rombo.prototype = new Forma;
function Rombo(x, y, ancho, alto, estilo) {
    Forma.call(this, x, y, ancho, alto, estilo);
    this.obtenerNombre = function () {
        this.__proto__.obtenerNombre();
        return "Rombo";
    };
    this.dibujar = function (contexto) {
        this.__proto__.dibujar(contexto);
        this.estilo.preparar(contexto);
        contexto.beginPath();
        //Obtengo los puntos de inicio del rectangulo
        var xIni = this.x - ancho;
        var yIni = this.y - alto;
        var anchoT= this.ancho*2;
        var altoT= this.alto*2;
        
        rombo(contexto, xIni, yIni, anchoT, altoT);
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
        
        //Obtengo los puntos de inicio del rectangulo
        var xIni = this.x - ancho;
        var yIni = this.y - alto;
        var anchoT= this.ancho*2;
        var altoT= this.alto*2;
        
        var x1 = xIni + (anchoT/2);
        var y1 = yIni;
        var x2 = xIni;
        var y2 = yIni + (altoT/2);
        
        var d1 = (y2-y1)*x + (x1-x2)*y + (x2*y1-y2*x1);
        
        x1 = xIni;
        y1 = yIni + (altoT/2);
        x2 = xIni + (anchoT/2);
        y2 = yIni+altoT;
        
        var d2 = (y2-y1)*x + (x1-x2)*y + (x2*y1-y2*x1);
        
        x1 = xIni + (anchoT/2);
        y1 = yIni+altoT;
        x2 = xIni + anchoT;
        y2 = yIni + (altoT/2);
        
        var d3 = (y2-y1)*x + (x1-x2)*y + (x2*y1-y2*x1);
        
        x1 = xIni + anchoT;
        y1 = yIni + (altoT/2);
        x2 = xIni + (anchoT/2);
        y2 = yIni;
        
        var d4 = (y2-y1)*x + (x1-x2)*y + (x2*y1-y2*x1);
        
        return (d1>=0 && d2>=0 && d3>=0 && d4>=0);
    };
}





