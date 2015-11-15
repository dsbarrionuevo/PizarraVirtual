var puerto = 8000;
var io = require('socket.io').listen(puerto);
//var nicks = [];
var servidor = new Servidor("localhost", puerto, io);
