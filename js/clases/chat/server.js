var io = require('socket.io').listen(8000),
	nicks = [];

io.sockets.on('connection', function escucharCliente(user){

	io.emit('emitirNicks', nicks);
	user.on('mensajeUser', function emit(data){
		io.sockets.emit('mensajeServer',{mensaje:data.mensaje, nick:data.de});
		io.sockets.emit('borrarEscribiendo');
	});

	user.on('addNickServer', function (usuario){
		var flag = true;
		for (var i=0; i<nicks.length;i++)
			{if (nicks[i].nick === usuario.nick) flag = false;}

		if (flag)
		{
			var nuevo = new Usuario(usuario.nick);
			console.log(nuevo.nick);
			nicks.push(nuevo);
			io.emit('emitirNicks',nicks);
			user.emit('nickAceptado',nuevo.nick);
		}
	});

	user.on('escribiendo', function (socket){
		user.broadcast.emit('imprimirEscribiendo');
		setTimeout(function(){
		io.emit('borrarEscribiendo');
		},2000);
		});

	user.on('desconectar', function (nick) {
		for(var i = 0; i < nicks.length; i++) {
			if (nick === nicks[i].nick){
				nicks.splice(i,1);
				io.emit('emitirNicks',nicks);
				break;
			}
		}
	});

	function Usuario(nick) {
	this.nick = nick;
}

});
