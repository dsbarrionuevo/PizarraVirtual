Linea.prototype = new Forma;
/**
 * Forma linea
 * @param {float} xi Posicion x del punto inicial de la linea.
 * @param {float} yi Posicion y del punto inicial de la linea.
 * @param {float} xf Posicion x del punto final de la linea.
 * @param {float} yf Posicion y del punto final de la linea.
 * @param {Estilo} estilo
 * @returns {Linea}
 */
function Linea(xi, yi, xf, yf, estilo) {
    Forma.call(this, xi, yi, xi + xf, yi + yf, estilo);
    this.xf = xf;
    this.yf = yf;
    this.dibujar = function (contexto) {
        this.__proto__.dibujar(contexto);
        this.estilo.preparar(contexto);
        contexto.beginPath();
        contexto.moveTo(this.x, this.y);
        contexto.lineTo(this.xf, this.yf);
        contexto.stroke();
        this.estilo.terminar(contexto);
    };
    this.intersecta = function (x,y, anchoLinea){
        this.__proto__.intersecta(x,y);
        
        var mitadLinea = anchoLinea/2;
        
        var x1 = this.x;
        var y1 = this.y - mitadLinea;
        var x2 = this.xf;
        var y2 = this.yf - mitadLinea;
        
        var d1 = (y2-y1)*x + (x1-x2)*y + (x2*y1-y2*x1);
        
        x1 = this.x;
        y1 = this.y + mitadLinea;
        x2 = this.xf ;
        y2 = this.yf + mitadLinea;
        
        var d2 = (y2-y1)*x + (x1-x2)*y + (x2*y1-y2*x1);
        
        if(x>=this.x && x<=this.xf && y>=this.y && y<=this.xf){
            return ((d1<=0) && (d2>=0));
        }
        else{
            return false;
        }
    };
    this.escalar = function (x, y) {
        this.xf = this.xf + x;
        this.yf = this.yf + y;
    };
}