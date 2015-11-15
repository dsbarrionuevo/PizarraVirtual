var ws = io.connect('http://localhost:8000'),
        lastPress = null,
        nick = '';
var i = 0;

$(document).on('ready', function escuchar() {
    ws.on('mensajeServer', function recibir(datosServer) {
        $('#conversacion').append($(' <p>').text(datosServer.nick + ": " + datosServer.mensaje));
        $('#conversacion').animate({scrollTop: $('#conversacion').height() + i}, 400);
        i = i + 20;
    });
    $('#enviar').on('click', enviarMensaje);
    $('#mensaje').on('focus', function () {
        $('#mensaje').on('keypress', function (evt) {
            if (evt.which === 13)
            {
                enviarMensaje();
                evt.preventDefault();
                evt.which = null;
            }
        });
    });

    function enviarMensaje() {
        ws.emit('mensajeUser', {mensaje: $('#mensaje').val(), de: nick});
        $('#mensaje').val('');
        $('#escribiendo').val('');
    }

    ws.on('emitirNicks', function imprimir(nicks) {
        var cadena = '';
        for (var i = 0; i < nicks.length; i++) {
            cadena += "| " + nicks[i].nick + ' |';
            console.log(cadena);
        }
        $('#nicks').text(cadena);
    });

    $('#enviarNick').on('click', function () {
        if ($('#nick').val() != '')
            ws.emit('addNickServer', {nick: $('#nick').val()});
    });

    ws.on('nickAceptado', function (user) {
        nick = user; //Corregir cuando se mande el evento solo al cliente que corresponde
        $("#enviarNick").prop('disabled', true);
        $("#nick").prop('disabled', true);
    });

    $('#mensaje').on('keydown', function () {
        ws.emit('escribiendo');
    });

    ws.on('imprimirEscribiendo', function () {
        $('#escribiendo').val('escribiendo...');


        ws.on('borrarEscribiendo',
                function () {
                    $('#escribiendo').val('');
                });
    });

    $('#desconectar').on('click', function () {
        ws.emit('desconectar', nick);
        $('#nick').val('');
        $("#nick").prop('disabled', false);
        $("#enviarNick").prop('disabled', false);
        //$('#')		
    });

});