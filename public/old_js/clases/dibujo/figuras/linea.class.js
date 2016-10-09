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
function Linea(x, y, xf, yf, estilo) {
    Forma.call(this, x, y, xf-x, yf-y, estilo);
    this.anchoLinea;
    this.xf=xf;
    this.yf=yf;
    this.obtenerNombre = function () {
        this.__proto__.obtenerNombre();
        return "Linea";
    };
    this.dibujar = function (contexto) {
        this.__proto__.dibujar(contexto);
        this.estilo.preparar(contexto);
        this.anchoLinea= contexto.lineWidth;
        contexto.beginPath();
        //Obtengo los puntos de inicio del rectangulo
        var xIni = this.x - (this.xf-this.x);
        var yIni = this.y - (this.yf-this.y);
        
        contexto.moveTo(xIni, yIni);
        contexto.lineTo(this.xf, this.yf);
  
        this.estilo.terminar(contexto);
    };
    this.intersecta = function (x,y){
        this.__proto__.intersecta(x,y);
        
        //Obtengo los puntos de inicio del rectangulo
        var xIni = this.x - (this.xf-this.x);
        var yIni = this.y - (this.yf-this.y);
        var mitadLinea = this.anchoLinea/2;
        
        var x1 = xIni;
        var y1 = yIni - mitadLinea;
        var x2 = this.xf;
        var y2 = this.yf - mitadLinea;
        
        var d1 = (y2-y1)*x + (x1-x2)*y + (x2*y1-y2*x1);
        
        x1 = xIni;
        y1 = yIni + mitadLinea;
        x2 = this.xf ;
        y2 = this.yf + mitadLinea;
        
        var d2 = (y2-y1)*x + (x1-x2)*y + (x2*y1-y2*x1);
        
        if(this.x>=xIni && this.x<=this.xf && this.y>=yIni && this.y<=this.xf){
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