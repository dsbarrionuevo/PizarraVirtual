HerramientaLinea.prototype = new Herramienta;
/**
 * Permite crear una linea
 * @param {Papel} papel Papal de dibujo
 * @returns {HerramientaLinea}
 */
function HerramientaLinea(papel) {
    Herramienta.call(this, "Linea", papel);
    this.x;
    this.y;
    var bandera = true;
    this.onclick = function (evento) {
        this.__proto__.onclick(evento);
        if (bandera) {
            this.x = evento.offsetX;
            this.y = evento.offsetY;
            bandera = false;
        } else {
            var xc = this.x + ((evento.offsetX - this.x) / 2);
            var yc = this.y + ((evento.offsetY - this.y) / 2);
            var f = new Linea(xc, yc, evento.offsetX, evento.offsetY, new Estilo(function (contexto) {
                contexto.save();
                contexto.lineWidth = 1;
                contexto.fillStyle = "#fff";
            }));
            papel.agregarObjeto(f);
            papel.dibujar();
            bandera = true;
        }
    };
    this.ontoolchanged = function (evento) {
        this.__proto__.ontoolchanged(evento);
        bandera = true;
    };
}