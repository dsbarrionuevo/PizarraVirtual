class Mensaje {
  constructor(contenido, remitente, destinatario) {
    this.contenido = contenido;
    this.timestamp = null;
    this.remitente = remitente;
    this.destinatario = destinatario;
  }
  toString() {
    //super.toString();
    return "Mensaje: {contenido: " + this.contenido + ", remitente: " + this.remitente.toString() + ": " + this.destinatario.toString() + "}";
  }
}