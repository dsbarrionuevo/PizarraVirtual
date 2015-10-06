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
    this.herramientas.push(new HerramientaSeleccion("Seleccionar", this.papel));
    this.herramientaActual = this.herramientas[0];
}