class ControladorComandos {
  constructor(socket) {
    this.socket = socket;
    //representa la lista de comandos que puedo recibir como cliente, pero no los que puedo enviar... revisar
    this.comandos = {};
    this.listeners = {};
  }
  agregarListener(nombreComando, listener) {
    if (this.listeners[nombreComando] !== undefined) {
      this.listeners[nombreComando] = [listener];
    } else {
      this.listeners[nombreComando].push(listener);
    }
  }
  eliminarListener(nombreComando, listener) {
    if (listener !== undefined) {
      var listeners = this._obtenerListeners(nombreComando);
      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i].equals(listener)) {
          this.listeners[nombreComando].splice(i, 1);
        }
      }
    } else {
      this.listeners[nombreComando] = [];
    }
  }
  agregarComando(comando) {
    this.comandos[comando.nombre] = comando;
  }
  iniciar() {
    for (var nombre in this.comandos) {
      var comando = this.comandos[nombre];
      var controladorComandos = this;
      this.socket.on(nombre, function (datos) {
        var listeners = controladorComandos._obtenerListeners(nombre);
        for (var i = 0; i < listeners.length; i++) {
          var listener = listeners[i];
          if (listener.antesEjecutar !== undefined) {
            listener.antesEjecutar(nombre, datos);
          }
        }
        comando.ejecutar(datos);
        for (var i = 0; i < listeners.length; i++) {
          var listener = listeners[i];
          if (listener.despuesEjecutar !== undefined) {
            listener.despuesEjecutar(nombre, datos);
          }
        }
      });
    }
  }
  emitir(comando) {
    var nombre = comando.nombre;
    var datos = comando.datos;
    var handshake = comando.handshake;
    var listeners = this._obtenerListeners(nombre);
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      if (listener.antesEmitir !== undefined) {
        listener.antesEmitir(nombre, datos);
      }
    }
    //var comando = this.comandos[nombre];
    console.log(comando);
    if (handshake === undefined || handshake === null) {
      console.log(this.socket);
      this.socket.emit(nombre, datos, handshake);
    } else {
      console.log(this.socket);
      console.log("Envio comando " + nombre);
      this.socket.emit(nombre, datos);
    }
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      if (listener.despuesEmitir !== undefined) {
        listener.despuesEmitir(nombre, datos);
      }
    }
  }
  _obtenerListeners(nombreComando) {
    return this.listeners[nombreComando] !== undefined ? this.listeners[nombreComando] : [];
  }
}