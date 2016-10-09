class ComandoListener {
  constructor() {
    this.id = null;
    this.antesEmitir = undefined;
    this.despuesEmitir = undefined;
    this.antesEjecutar = undefined;
    this.despuesEjecutar = undefined;
  }
  equals(otro) {
    if (this.id === null || otro.id === null) {
      //capaz que convendría saltar una excepción
      return false;
    }
    return this.id.toString().trim() === otro.id.toString().trim();
  }
}