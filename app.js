var express = require('express');
var app = express();
var servidorHttp = require('http').createServer(app);
var socketServidor = require('socket.io')(servidorHttp);

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var usuarios = [];
socketServidor.on('connect', function (socketCliente) {
    //socketCliente.on() //escucha eventos del cliente
    //socketCliente.emit() //el servidor le envia a ese cliente
    //socketServidor.emit(); para todos los clientes
    //socketCliente.broadcast.emit() //envia a todos los clientes menos a este cliente
    //...
    
    //pruebas con nueva arq:
    socketCliente.on("enviar_mensaje", function (datos, handshake) {
        console.log(datos);
        //socketCliente.broadcast.emit("enviar_mensaje", {datos:"locos!"});
        socketServidor.emit("enviar_mensaje", {datos:"Hola!"});
    });
    //... fin pruebas
    
    socketCliente.on("nombreUsuarioNuevo", function (datos, handshake) {
        //verifico si no existe ya ese nombre de usuario
        var existeUsuario = false;
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i].nombre === datos.nombre) {
                existeUsuario = true;
            }
        }
        if (existeUsuario) {
            handshake({
                exito: false
            });
        } else {
            var nuevoUsuario = new Usuario(socketCliente.id, datos.nombre);
            usuarios.push(nuevoUsuario);
            handshake({
                exito: true,
                nuevoUsuario: nuevoUsuario,
                emisor: (usuarios.length === 1)//solo el profe puede escribir, que es el primer usuario
            });
            //envio lista de los nombres de usuarios a todos los conectados
            socketServidor.emit("listaUsuarios", usuarios);
        }
    });
    socketCliente.on("mensajeNuevo", function (datos, handshake) {
        //el servidor envia a todos los usuarios, menos al que lo envio
        //este ultimo va a escribir el mensaje en el chat cuando el handshake
        //es decir cuando reciba el ACK del servidor
        socketCliente.broadcast.emit("mensajeNuevo", datos);
        handshake();//envio ACK al que envio el mensaje
    });
    socketCliente.on('objetoAgregado', function (datos) {
        socketCliente.broadcast.emit('objetoAgregado', datos);
    });
    socketCliente.on('disconnect', function () {
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id === socketCliente.id) {
                usuarios.splice(i, 1);
                break;
            }
        }
        socketServidor.emit("listaUsuarios", usuarios);
    });
});

function Usuario(id, nombre) {
    this.id = id;
    this.nombre = nombre;
    this.equals = function (usuario) {
        return (this.id === usuario.id && this.nombre === usuario.nombre);
    };
}

servidorHttp.listen(8080);