(function(){
  var cliente;
  $(document).ready(function(){
    cliente = new Cliente(
      {
        protocolo:  "http", //Cliente.protocolos.HTTP
        ip: "localhost",
        puerto: "8080"
      }
    );
    var comandoEnviarMensaje = new ComandoEnviarMensaje(new Mensaje("contenido del mensaje", "", ""));
    cliente.controladorComandos.agregarComando(comandoEnviarMensaje);
    cliente.conectar();
    setTimeout(function(){
      console.log("Trato de enviar");
      cliente.controladorComandos.emitir(comandoEnviarMensaje);
    },400)
  });
})();
