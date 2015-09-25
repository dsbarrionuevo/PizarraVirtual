Forma.prototype = new Visualizable;
function Forma(x, y, ancho, alto, estilo) {
    Visualizable.call(this, x, y, ancho, alto, estilo);
    //por ahora tiene lo mismo que el padre por lo que esta vacio...
}