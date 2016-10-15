class ComandoEnviarMensaje extends Comando {
  constructor(mensaje) {
    super("enviar_mensaje");
    this.mensaje = mensaje;
    this.datos = { mensaje: mensaje.contenido };
  }
  ejecutar(datos) {
    super.ejecutar(datos);
    //mensaje recibido
    console.log("Mensaje recibido: ");
    console.log(datos);
  }
}