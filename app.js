var express = require('express');
var app = express();
var servidorHttp = require('http').createServer(app);
var socketServidor = require('socket.io')(servidorHttp);

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var usuarios = [];
var cantidadUsuarios = 0;
socketServidor.on('connect', function (socketCliente) {
    //socketCliente.on() //escucha eventos del cliente
    //socketCliente.emit() //el servidor le envia a ese cliente
    //socketServidor.emit(); para todos los clientes
    //socketCliente.broadcast.emit() //envia a todos los clientes menos a este cliente
    var nuevoUsuario = new Usuario(socketCliente.id, "Usuario" + cantidadUsuarios);
    cantidadUsuarios++;
    usuarios.push(nuevoUsuario);
    //envio datos de usuario al recien conectado
    socketCliente.emit("nuevoUsuario", nuevoUsuario);
    //envio lista de los nombres de usuarios a todos los conectados
    socketServidor.emit("listaUsuarios", usuarios);
    socketCliente.on("mensajeNuevo", function (datos, handshake) {
        //el servidor envia a todos los usuarios, menos al que lo envio
        //este ultimo va a escribir el mensaje en el chat cuando el handshake
        //es decir cuando reciba el ACK dle servidor
        socketCliente.broadcast.emit("mensajeNuevo", datos);
        handshake();//envio ACK al que envio el mensaje
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

servidorHttp.listen(80);