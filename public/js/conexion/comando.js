class Comando {
  constructor(nombre, datos, handshake) {
    this.nombre = nombre;
    this.datos = datos || {};
    this.handshake = handshake || null;
  }
  /**
    Se ejecuta cuando llega el comando desde el servidor.
  */
  ejecutar(datos) {
    console.log("Comando " + this.nombre + " en ejecución");
  }
}