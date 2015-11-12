HerramientaCirculo.prototype = new Herramienta;
/**
 * Permite seleccionar solo un objeto a la vez
 * @param {string} nombre Nombre de la herramienta
 * @param {Papel} papel Papal de dibujo
 * @returns {HerramientaSeleccion}
 */
function HerramientaCirculo(papel) {
    Herramienta.call(this, "Circulo", papel);
    this.x;
    this.y;
    var bandera = true;

    this.onclick = function (evento) {
        this.__proto__.onclick(evento);
        
        if (bandera) {
            this.x = evento.offsetX;
            this.y = evento.offsetY;
            bandera = false;
        }
        else {
            var ancho = (evento.offsetX - this.x)/2;
            var alto =  (evento.offsetY - this.y)/2;
            var radio = Math.sqrt((ancho*ancho)+(alto*alto));
            var xc = this.x +  ((evento.offsetX - this.x)/2);
            var yc = this.y + ((evento.offsetY - this.y)/2);
           
            var f = new Circulo(xc,yc,radio, new Estilo(function (contexto) {
                contexto.save();
                contexto.lineWidth = 1;
                contexto.fillStyle = "#fff";
            }));
            papel.agregarObjeto(f);
            papel.dibujar();
            
            bandera = true;
        }
    };

}
;
