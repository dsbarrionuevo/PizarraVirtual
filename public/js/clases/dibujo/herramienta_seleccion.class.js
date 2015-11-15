HerramientaSeleccion.prototype = new Herramienta;
/**
 * Permite seleccionar solo un objeto a la vez
 * @param {string} nombre Nombre de la herramienta
 * @param {Papel} papel Papal de dibujo
 * @returns {HerramientaSeleccion}
 */
function HerramientaSeleccion(papel) {
    Herramienta.call(this, "Seleccionar", papel);
    this.ultimoSeleccionado = null;
    this.onclick = function (evento) {
        this.__proto__.onclick(evento);
        var x = evento.offsetX;
        var y = evento.offsetY;
        var objetos = this.papel.obtenerObjetosEnPunto(x, y);
        if (objetos.length > 0) {
            var ultimoVisible = objetos[objetos.length - 1];
            
            // Se controla que ultimoVisible no sea null y que el boton del mouse presionado sea el derecho
            if (ultimoVisible !== null && evento.button === 2) {
                ultimoVisible.desmarcar(this.papel.contexto);
                // Tendria que verse una forma de cambiar ultimoSeleccionado al anterior.
                // Es decir, si habia tres seleccionado y deseleccionamos uno, el ultimoSeleccionado pasa a ser el elemento 2
                this.ultimoSeleccionado = null;
            }
            
            // Lo mismo pero con el click izquierdo. Esto marca la figura. La ultima comprobacion se realiza para
            // evitar que se seleccione un elemento que ya ha sido seleccionado
            else if(ultimoVisible !== null && evento.button === 0 && this.ultimoSeleccionado !== ultimoVisible){
                ultimoVisible.marcar(this.papel.contexto);
                this.ultimoSeleccionado = ultimoVisible;
            }
            
        } else {
            //no hay nada donde hice click...
            if (this.ultimoSeleccionado !== null) {
                //this.ultimoSeleccionado.desmarcar();
            }
            this.ultimoSeleccionado = null;
        }
    };
}