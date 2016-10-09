//depende de io (librería de socketio para cliente)
class Cliente {
  constructor(params) {
    var paramsDefecto = {
      protocolo: "http", //Cliente.protocolos.HTTP
      ip: "localhost",
      puerto: "8080"
    };
    var params = params || paramsDefecto;
    this.protocolo = params.protocolo;
    this.ip = params.ip;
    this.puerto = params.puerto;
    this.socket = null;
    this.usuario = params.usuario || null;
    this.controladorComandos = params.controladorComandos || new ControladorComandos(this.socket);
  }
  conectar() {
    //debe usar io como dependecia
    this.socket = io.connect(this._armarRutaConexcion());
    //¿debería setear el socket a controladorComandos aquí, o ya lo tiene por referencia en el constructor?
    this.controladorComandos.socket = this.socket;
    var cliente = this;
    this.socket.on("connect", function () {
      cliente.controladorComandos.iniciar();
    });
  }
  _armarRutaConexcion() {
    return this.protocolo + "://" + this.ip + ":" + this.puerto;
  }
}
Cliente.protocolos = {
  HTTP: "http",
  HTTPS: "https"
};