HerramientaMover.prototype = new Herramienta;
/**
 * Permite cambiar la posicion de un objeto en el canvas
 * @param {Papel} papel Papal de dibujo
 * @returns {HerramientaMover}
 */
function HerramientaMover(papel) {
    Herramienta.call(this, "Mover", papel);
    this.objetivo = null;
    this.posicionInicial = {x: 0, y: 0};
    this.onmousedown = function (evento) {
        this.__proto__.onmousedown(evento);
        var x = evento.offsetX;
        var y = evento.offsetY;
        var objetos = this.papel.obtenerObjetosEnPunto(x, y);
        this.posicionInicial = {x: y, y: y};
        if (objetos.length > 0) {
            var ultimoVisible = objetos[objetos.length - 1];
            this.objetivo = ultimoVisible;
        }
    };
    this.onmouseup = function (evento) {
        this.__proto__.onmouseup(evento);
        var x = evento.offsetX;
        var y = evento.offsetY;
        var vectorDiferencia = {x: x - this.posicionInicial.x, y: y - this.posicionInicial.y};
        if (this.objetivo !== null) {
            this.objetivo.mover(vectorDiferencia.x, vectorDiferencia.y);
            this.papel.dibujar();
        }
    };
}