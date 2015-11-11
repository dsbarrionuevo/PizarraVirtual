function Servidor(ip, puerto, socket) {
    this.ip = ip;
    this.puerto = puerto;
    this.socket = socket;
    this.clientes = [];//Clientes
    //
    this.socket.sockets.on('connection', function (cliente) {
        //ingresa nuevo cliente
        //this.socket.emit('emitirNicks', nicks);

        //registramos eventos a cliente
        
        cliente.on('ComandoMensajeUsuario', function (data) {
            new ComandoMensajeUsuario(ComandoMensajeUsuario);
        });
        cliente.on('mensajeUser', function (data) {
            //console.log(data.mensaje);
            
        });

        cliente.on('addNickServer', function (usuario) {
            var usuarioEncontrado = true;
            for (var i = 0; i < nicks.length; i++)
            {
                if (nicks[i].nick === usuario.nick)
                    usuarioEncontrado = false;
            }
            if (usuarioEncontrado)
            {
                var nuevo = new Usuario(usuario.nick);
                nicks.push(nuevo);
                this.socket.emit('emitirNicks', nicks);
                cliente.emit('nickAceptado', nuevo.nick);
            }
        });

//        cliente.on('escribiendo', function (socket) {
//            cliente.broadcast.emit('imprimirEscribiendo');
//            setTimeout(function () {
//                this.socket.emit('borrarEscribiendo');
//            }, 2000);
//        });

        cliente.on('desconectar', function (nick) {
            for (var i = 0; i < nicks.length; i++) {
                if (nick === nicks[i].nick) {
                    nicks.splice(i, 1);
                    this.socket.emit('emitirNicks', nicks);
                    break;
                }
            }
        });

        var nuevoCliente = new Cliente(cliente.handshake.address.address, cliente.handshake.address.port, cliente);
        this.clientes.push(nuevoCliente);
    });

}