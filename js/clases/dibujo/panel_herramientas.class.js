function PanelHerramientas(papel){
    this.papel = papel;
    this.herramientas = [];
    this.herramientaActual;
    //set por defecto de herramientas
    this.herramientas.push(new HerramientaSeleccion(this.papel));
    this.herramientaActual = this.herramientas[0];
}