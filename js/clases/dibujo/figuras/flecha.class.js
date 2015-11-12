Flecha.prototype = new Forma;
/**
 * Forma flecha
 * @param {float} xi Posicion x del punto inicial de la flecha.
 * @param {float} yi Posicion y del punto inicial de la flecha.
 * @param {float} xf Posicion x del punto final de la flecha.
 * @param {float} yf Posicion y del punto final de la flecha.
 * @param {type} estilo
 * @returns {Flecha}
 */
function Flecha(x, y, xf, yf, largoPunta, estilo) {
    Forma.call(this, x, y, xf -x,yf-y, estilo);
    this.xf = xf;
    this.yf = yf;
    this.anchoLinea;
    this.largoPunta = largoPunta;
    if (this.largoPunta === undefined) {
        //valor por defecto,
        //tambien podria ser un 5% del largo total de la flecha
        this.largoPunta = 10;
    }
    this.dibujar = function (contexto) {
        this.__proto__.dibujar(contexto);
        this.estilo.preparar(contexto);
        anchoLinea = contexto.lineWidth;
        contexto.beginPath();
        //Obtengo los puntos de inicio del rectangulo
        var xIni = this.x - (this.xf-this.x);
        var yIni = this.y - (this.yf-this.y);
        
        contexto.moveTo(xIni, yIni);
        contexto.lineTo(this.xf, this.yf);
        var angulo = Math.atan2(this.yf - yIni, this.xf - xIni);
        angulo = angulo * 180 / Math.PI;//en grados
        var punto1 = {
            x: (Math.cos((angulo - 135) * Math.PI / 180) * this.largoPunta),
            y: (Math.sin((angulo - 135) * Math.PI / 180) * this.largoPunta)
        };
        var punto2 = {
            x: (Math.cos((angulo + 135) * Math.PI / 180) * this.largoPunta),
            y: (Math.sin((angulo + 135) * Math.PI / 180) * this.largoPunta)
        };
        contexto.lineTo(this.xf + punto1.x, this.yf + punto1.y);
        contexto.lineTo(this.xf, this.yf);
        contexto.lineTo(this.xf + punto2.x, this.yf + punto2.y);
        contexto.lineTo(this.xf, this.yf);
        contexto.stroke();
        this.estilo.terminar(contexto);
    };
    
    this.intersecta = function (x,y){
        this.__proto__.intersecta(x,y);
        
        //Obtengo los puntos de inicio del rectangulo
        var xIni = this.x - this.xf;
        var yIni = this.y - this.yf;
        
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
        
        if(x>=xIni && x<=this.xf && y>=yIni && y<=this.xf){
            return ((d1<=0) && (d2>=0));
        }
        else{
            return false;
        }
    };
    
    this.mover = function (x, y) {
        this.x = this.x + x;
        this.y = this.y + y;
    };
    
}