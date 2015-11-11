ComandoMensajeUsuario.prototype = new Comando;
function ComandoMensajeUsuario() {
    this.nombre = "ComandoMensajeUsuario";
    this.ejecutar = function (datos) {
        this.__proto__.ejecutar(datos);
        (new ComandoMensajeServer()).emitir({mensaje:datos.mensaje,remitente:datos.remitente});
        //datos.socket.sockets.emit('mensajeServer', {mensaje: data.mensaje, nick: data.de});
        //datos.socket.sockets.emit('borrarEscribiendo');
    }
    this.emitir = function(){
        
    }
}