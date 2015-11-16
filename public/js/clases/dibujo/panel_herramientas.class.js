function PanelHerramientas(papel) {
    this.papel = papel;
    this.herramientas = [];
    this.herramientaActual;
    this.tiempoUsoHerramientaActual = {
        inicio: Date.now(),
        fin: undefined
    };
    this.cambiarHerramienta = function (nombreHerramienta) {
        this.tiempoUsoHerramientaActual.fin = Date.now();
        for (var i = 0; i < this.herramientas.length; i++) {
            if (this.herramientas[i].nombre === nombreHerramienta) {
                //disparo el evento de cambio de herramienta
                this.herramientaActual.ontoolchanged({
                    oldTool: this.herramientaActual,
                    newTool: this.herramientas[i],
                    useDuration: this.tiempoUsoHerramientaActual.fin - this.tiempoUsoHerramientaActual.inicio
                });
                this.tiempoUsoHerramientaActual.inicio = Date.now();
                this.tiempoUsoHerramientaActual.fin = undefined;
                this.herramientaActual = this.herramientas[i];
                break;
            }
        }
        //console.log("Herramienta con nombre " + nombreHerramienta + " no encontrada");
    };
    //set por defecto de herramientas
    this.herramientas.push(new HerramientaSeleccion(this.papel));
    this.herramientas.push(new HerramientaMover(this.papel));
    this.herramientas.push(new HerramientaRellenar(this.papel));
    this.herramientas.push(new HerramientaRectangulo(this.papel));
    this.herramientas.push(new HerramientaRombo(this.papel));
    this.herramientas.push(new HerramientaLinea(this.papel));
    this.herramientas.push(new HerramientaCirculo(this.papel));
    this.herramientas.push(new HerramientaFlecha(this.papel));
    this.herramientas.push(new HerramientaTriangulo(this.papel));
    this.herramientas.push(new HerramientaTrianguloRectangulo(this.papel));
    this.herramientas.push(new HerramientaRectanguloRedondeado(this.papel));
    this.herramientaActual = this.herramientas[0];
}