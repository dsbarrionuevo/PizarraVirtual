HerramientaRectangulo.prototype = new Herramienta;
/**
 * Permite crear un rectangulo
 * @returns {HerramientaRectangulo}
 */
function HerramientaRectangulo(papel) {
    Herramienta.call(this, "Rectangulo", papel);
    this.x;
    this.y;
    this.bandera = false;
    this.rectanguloTemporal;
    this.primera = true;
    this.xiAnt = 0;
    this.yAnt = 0;

    this.onmousedown = function (evento) {
        this.__proto__.onmousedown(evento);
        this.x = evento.offsetX;
        this.y = evento.offsetY;
        this.bandera = true;
    };
    this.onmouseup = function (evento) {
        this.__proto__.onmouseup(evento);
        var ancho = (evento.offsetX - this.x) / 2;
        var alto = (evento.offsetY - this.y) / 2;
        var xi = this.x + ancho;
        var yi = this.y + alto;
        var f = new Rectangulo(xi, yi, ancho, alto);
        this.papel.agregarObjeto(f);
        this.papel.dibujar();
        this.bandera = false;
    };
    this.onmousemove = function (evento) {
        this.__proto__.onmousemove(evento);
        if (this.bandera) {

            if (!this.primera) {
                this.papel.contexto.putImageData(this.rectanguloTemporal, this.xiAnt, this.yAnt);
            }
            else {
                this.primera = false;
            }

            var xi;
            var yi;
            var ancho;
            var alto;

            if (evento.offsetX < this.x && evento.offsetY < this.y) {
                xi = evento.offsetX;
                yi = evento.offsetY;
                ancho = xi - this.x;
                alto = yi - this.y;
            }
            else {
                if (evento.offsetX < this.x) {
                    xi = this.x;
                    yi = evento.offsetY;
                    ancho = evento.offsetX - xi;
                    alto = yi - this.y;
                }
                else {
                    if (evento.offsetY < this.y) {
                        xi = evento.offsetX;
                        yi = this.y;
                        ancho = this.x - xi;
                        alto = evento.offsetY - yi;
                        ;
                    }
                    else {
                        xi = this.x;
                        yi = this.y;
                        ancho = evento.offsetX - xi;
                        alto = evento.offsetY - yi;
                    }
                }
            }

            this.xiAnt = xi;
            this.yAnt = yi;
            this.rectanguloTemporal = this.papel.contexto.getImageData(xi, yi, ancho, alto);


            ancho = (evento.offsetX - this.x) / 2;
            alto = (evento.offsetY - this.y) / 2;
            xi = this.x + ancho;
            yi = this.y + alto;
            var f = new Rectangulo(xi, yi, ancho, alto);
            this.papel.agregarObjeto(f);
            this.papel.dibujar();
        }
    };

}