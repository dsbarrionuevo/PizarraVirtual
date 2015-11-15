HerramientaFlecha.prototype = new Herramienta;
/**
 * Permite seleccionar solo un objeto a la vez
 * @param {string} nombre Nombre de la herramienta
 * @param {Papel} papel Papal de dibujo
 * @returns {HerramientaSeleccion}
 */
function HerramientaFlecha(papel) {
    Herramienta.call(this, "Flecha", papel);
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
            var xc = this.x +  ((evento.offsetX - this.x)/2);
            var yc = this.y + ((evento.offsetY - this.y)/2);

            var f = new Flecha(xc,yc,evento.offsetX,evento.offsetY,10,new Estilo(function (contexto) {
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
