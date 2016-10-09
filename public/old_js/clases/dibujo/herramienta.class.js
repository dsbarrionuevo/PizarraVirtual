function Herramienta(nombre, papel) {
    this.nombre = nombre;
    this.papel = papel;//referencia al papel
    this.onclick = function (evento) {
    };
    this.onmousedown = function (evento) {
    };
    this.onmousemove = function (evento) {
    };
    this.onmouseup = function (evento) {
    };
    /**
     * Evento personalizado que es invocado cuando se cambia la herramienta
     * @param {Object} Objecto evento con las siguientes propiedades:
     *  oldTool: la herramienta previa (la que es cambiada),
     *  newTool: la nueva herramienta actual (por la cual la cambian),
     *  useDuration: duración en milisegundos de la herramienta previa
     * @returns {undefined}
     */
    this.ontoolchanged = function (evento) {
    };
}