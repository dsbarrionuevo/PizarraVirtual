var express = require('express');
var app = express();
var servidorHttp = require('http').createServer(app);
var socketServidor = require('socket.io')(servidorHttp);

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var clientes = [];
socketServidor.on('connect', function (socketCliente) {
    //socketCliente.on() //escucha eventos del cliente
    //socketCliente.emit() //el servidor le envia a ese cliente
    //socketServidor.emit(); para todos los clientes
    //socketCliente.broadcast.emit() //envia a todos los clientes menos al este cliente
    var nuevoUsuario = new Usuario(socketCliente.id, "Usuario" + clientes.length);
    clientes.push(nuevoUsuario);
    //envio datos de usuario al recien conectado
    socketCliente.emit("nuevoUsuario", nuevoUsuario);
    //envio lista de los nombres de usuarios a todos los conectados
    socketServidor.emit("listaUsuarios", clientes);
    socketCliente.on("mensajeNuevo", function (datos, handshake) {
        //quien envio el mensaje?
        socketCliente.broadcast.emit("mensajeNuevo", datos);
        handshake();
    });
});

function buscarCliente(id) {
    for (var i = 0; i < clientes.length; i++) {
        if (clientes[i].id === id) {
            return clientes[i];
        }
    }
}

function Usuario(id, nombre) {
    this.id = id;
    this.nombre = nombre;
    this.equals = function (usuario) {
        return (this.id === usuario.id && this.nombre === usuario.nombre);
    };
}

servidorHttp.listen(80);