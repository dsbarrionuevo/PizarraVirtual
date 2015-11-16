/**
 * Estilo de preparacion y terminacion del dibujo de un objeto visualizable
 * @param {function} preparar Funcion que se llama antes de crear la forma del 
 * objeto visualizble. Es importante llamar context.save() al inicio, para no 
 * interferir con el dibujo de los demas objetos.
 * @param {function} terminar Funtion que se llama despues de crear la forma del
 * objeto visualizable. Es importante llamar contexto.restore() al final para no
 * interferir con el dibujo de los demas objetos.
 * @returns {Estilo}
 */
function Estilo(preparar, terminar) {
    this.preparar = preparar;
    if (this.preparar === undefined) {
        //funcion preparar por defecto
        this.preparar = function (contexto) {
            contexto.save();
            contexto.fillStyle = "#eee";
            contexto.strokeStyle = "#000";
            contexto.lineWidth = 1;
        };
    }
    this.terminar = terminar;
    if (this.terminar === undefined) {
        //funcion terminar por defecto
        this.terminar = function (contexto) {
            contexto.fill();
            contexto.stroke();
            contexto.restore();
        };
    }
}