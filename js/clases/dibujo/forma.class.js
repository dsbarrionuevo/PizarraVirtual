/**
 * _abstract
 * Cualquier forma visualizable
 * @param {float} x Posicion x de la esquina superior izquierda
 * @param {float} y Posicion y de la esquina superior izquierda
 * @param {float} ancho Ancho del objeto
 * @param {float} alto Alto del objeto
 * @param {Estilo} estilo 
 * @returns {Forma}
 */
Forma.prototype = new Visualizable;
function Forma(x, y, ancho, alto, estilo) {
    Visualizable.call(this, x, y, ancho, alto, estilo);
    //por ahora tiene lo mismo que el padre por lo que esta vacio...
    
    this.mover = function (x, y) {
        this.x = this.x + x;
        this.y = this.y + y;
    };
    this.escalar = function (x, y) {
        this.ancho = this.ancho + x;
        this.alto = this.alto + y;
    };
    this.rotar = function (angulo) {
        
    };
}