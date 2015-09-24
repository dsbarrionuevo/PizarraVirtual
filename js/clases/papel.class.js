function Papel(canvas) {
    this.canvas = canvas;
    this.contexto = canvas.getContext("2d");
    this.ordenCapaActual;
    this.capas = [];
    this.agregarCapa = function () {
        //el orden de la capa esta definico por el length del array de capas
        var capa = new Capa(this.capas.length);
        this.capas.push(capa);
    };
    this.dibujar = function () {
        for (var i = 0; i < this.capas.length; i++) {
            //el orden de visualizacion se da por como estan dispuestas en el array, que es el relacionado con el orden de las capas
            this.capas[i].dibujar(this.contexto);
        }
    };
    this.agregarObjeto = function (objeto, ordenCapa) {
        if (ordenCapa >= 0 && ordenCapa <= this.capas.length - 1) {
            this.capas[ordenCapa].agregarObjeto(objeto);
        }
    };
    this.agregarObjeto = function (objeto) {
        var ordenCapa = this.ordenCapaActual;
        if (ordenCapa >= 0 && ordenCapa <= this.capas.length - 1) {
            this.capas[ordenCapa].agregarObjeto(objeto);
        }
    };
    //por defecto creo una capa vacia, con orden 0, es decir el fondo del papel
    this.agregarCapa();
    //seteo como capa actual a la de fondo, recien insertada
    this.ordenCapaActual = 0;
}