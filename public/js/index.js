(function () {
  var cliente;
  $(document).ready(function () {
    cliente = new Cliente({
      protocolo: "http", //Cliente.protocolos.HTTP
      ip: "localhost",
      puerto: "8080"
    });
    cliente.controladorComandos.agregarComando(new ComandoEnviarMensaje());
    cliente.conectar();
    setTimeout(function () {
      var comandoEnviarMensaje = new ComandoEnviarMensaje(new Mensaje("alumno", "profesor", "Hola!"));
      cliente.controladorComandos.emitir(comandoEnviarMensaje);
    }, 400);
  });
})();