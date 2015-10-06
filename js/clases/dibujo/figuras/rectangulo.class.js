Rectangulo.prototype = new Forma;
function Rectangulo(x, y, ancho, alto, estilo) {
    Forma.call(this, x, y, ancho, alto, estilo);
    this.dibujar = function (contexto) {
        //llamo al metodo del padre, si bien forma no posee este metodo, pero llama al metodo de visualizable
        this.__proto__.dibujar(contexto);
        this.estilo.preparar(contexto);
        contexto.rect(this.x, this.y, this.ancho, this.alto);
        this.estilo.terminar(contexto);
    };
    this.intersecta = function (x, y) {
        this.__proto__.intersecta(x, y);
        return ((x > this.x && x < this.x + this.ancho) && (y > this.y && y < this.y + this.alto));
    };
}