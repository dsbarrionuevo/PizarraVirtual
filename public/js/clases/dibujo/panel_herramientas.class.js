function PanelHerramientas(papel) {
    this.papel = papel;
    this.herramientas = [];
    this.herramientaActual;
    this.cambiarHerramienta = function (nombreHerramienta) {
        for (var i = 0; i < this.herramientas.length; i++) {
            if (this.herramientas[i].nombre === nombreHerramienta) {
                this.herramientaActual = this.herramientas[i];
                return;
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