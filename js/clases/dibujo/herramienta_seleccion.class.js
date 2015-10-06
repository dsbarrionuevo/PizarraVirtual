HerramientaSeleccion.prototype = new Herramienta;
function HerramientaSeleccion(papel) {
    Herramienta.call(this, papel);
    this.onclick = function (evento) {
        this.__proto__.onclick(evento);
        var x = evento.offsetX;
        var y = evento.offsetY;
        var objetos = this.papel.obtenerObjetosEnPunto(x, y);
        if (objetos.length > 0) {
            var ultimoVisible = objetos[objetos.length - 1];
            ultimoVisible.marcar(this.papel.contexto);
        }
    };
}