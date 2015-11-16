function Papel(canvas) {
    var instancia = this;
    this.canvas = canvas;
    this.contexto = canvas.getContext("2d");
    this.ordenCapaActual;
    this.capas = [];
    this.panel = new PanelHerramientas(this);
    this.listeners = [];//ListenerPapel
    this.agregarCapa = function () {
        //el orden de la capa esta definico por el length del array de capas
        var capa = new Capa(this.capas.length);
        this.capas.push(capa);
    };
    this.dibujar = function () {
        //... puede no ser un fondo blanco...
        this.contexto.fillStyle = "#fff";
        this.contexto.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < this.capas.length; i++) {
            //el orden de visualizacion se da por como estan dispuestas en el array, que es el relacionado con el orden de las capas
            this.capas[i].dibujar(this.contexto);
        }
    };
    this.agregarObjeto = function (objeto, ordenCapa) {
        if (ordenCapa === undefined) {
            ordenCapa = this.ordenCapaActual;
        }
        if (ordenCapa >= 0 && ordenCapa <= this.capas.length - 1) {
            this.capas[ordenCapa].agregarObjeto(objeto);
            //aviso a los escuchas
            for (var i = 0; i < this.listeners.length; i++) {
                this.listeners[i].objetoAgregado(objeto, ordenCapa);
            }
        }
    };
    this.obtenerObjetosEnPunto = function (x, y) {
        var objetos = [];
        for (var i = 0; i < this.capas[this.ordenCapaActual].objetos.length; i++) {
            if (this.capas[this.ordenCapaActual].objetos[i].intersecta(x, y) === true) {
                objetos.push(this.capas[this.ordenCapaActual].objetos[i]);
            }
        }
        return objetos;
    };
    this.cambiarHerramienta = function (nombreHerramienta) {
        instancia.panel.cambiarHerramienta(nombreHerramienta);
    };
    this.agregarListener = function (listener) {
        listener.id = this.listeners.length;//un poco trucho hacerlo asi
        this.listeners.push(listener);
    };
    this.eliminarListener = function (listener) {
        for (var i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i].equals(listener)) {
                this.listeners.splice(i, 1);
                break;
            }
        }
    };
    //eventos en canvas
    this.canvas.addEventListener("click", function (evt) {
        //no olvidarse que evt.offsetX/Y no son compatibles con todos los navegadores
        instancia.panel.herramientaActual.onclick(evt);
    });
    this.canvas.addEventListener("mousedown", function (evt) {
        instancia.panel.herramientaActual.onmousedown(evt);
    });
    this.canvas.addEventListener("mousemove", function (evt) {
        instancia.panel.herramientaActual.onmousemove(evt);
    });
    this.canvas.addEventListener("mouseup", function (evt) {
        instancia.panel.herramientaActual.onmouseup(evt);
    });
    // Este evento permite detectar el click derecho del mouse.
    // preventDefault() evita que se despliegue un menu contextual
    this.canvas.addEventListener("contextmenu", function (evt) {
        evt.preventDefault();
        instancia.panel.herramientaActual.onclick(evt);
    });

    //por defecto creo una capa vacia, con orden 0, es decir el fondo del papel
    this.agregarCapa();
    //seteo como capa actual a la de fondo, recien insertada
    this.ordenCapaActual = 0;
}