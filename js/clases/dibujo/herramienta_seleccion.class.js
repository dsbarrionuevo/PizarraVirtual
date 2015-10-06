HerramientaSeleccion.prototype = new Herramienta;
/**
 * Permite seleccionar solo un objeto a la vez
 * @param {string} nombre Nombre de la herramienta
 * @param {Papel} papel Papal de dibujo
 * @returns {HerramientaSeleccion}
 */
function HerramientaSeleccion(nombre, papel) {
    Herramienta.call(this, nombre, papel);
    this.ultimoSeleccionado = null;
    this.onclick = function (evento) {
        this.__proto__.onclick(evento);
        var x = evento.offsetX;
        var y = evento.offsetY;
        var objetos = this.papel.obtenerObjetosEnPunto(x, y);
        if (objetos.length > 0) {
            var ultimoVisible = objetos[objetos.length - 1];
            if (this.ultimoSeleccionado !== null) {
                //this.ultimoSeleccionado.desmarcar();
            }
            ultimoVisible.marcar(this.papel.contexto);
            this.ultimoSeleccionado = ultimoVisible;
        } else {
            //no hay nada donde hice click...
            if (this.ultimoSeleccionado !== null) {
                //this.ultimoSeleccionado.desmarcar();
            }
            this.ultimoSeleccionado = null;
        }
    };
}