HerramientaRombo.prototype = new Herramienta;
/**
 * Permite seleccionar solo un objeto a la vez
 * @param {string} nombre Nombre de la herramienta
 * @param {Papel} papel Papal de dibujo
 * @returns {HerramientaSeleccion}
 */
function HerramientaRombo(papel) {
    Herramienta.call(this, "Rombo", papel);
    this.x;
    this.y;
    var bandera = true;

    this.onclick = function (evento) {
        this.__proto__.onclick(evento);
        this.__proto__.onclick(evento);

        if (bandera) {
            this.x = evento.offsetX;
            this.y = evento.offsetY;
            bandera = false;
        }
        else {
            var ancho = (evento.offsetX - this.x) / 2;
            var alto = (evento.offsetY - this.y) / 2;
            var xi = this.x + ancho;
            var yi = this.y + alto;

            var f = new Rombo(xi, yi, ancho, alto, new Estilo(function (contexto) {
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
