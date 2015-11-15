(function () {
    var socket;
    var usuario;
    $(document).ready(function () {
        $("#btnChatMostrarConectados").data("accion", "mostrar");
        $("#btnChatMostrarConectados").click(function () {
            var $this = $(this);
            if ($this.data("accion") === "mostrar") {
                $("#listaConectados").css("right", "0px");
                $this.text("Ocultar conectados");
                $this.data("accion", "ocultar");
            } else {
                $("#listaConectados").css("right", "-110%");
                $this.text("Mostrar conectados");
                $this.data("accion", "mostrar");
            }
        });

        //chat
        socket = io.connect('http://localhost');
        socket.on("nuevoUsuario", function (nuevoUsuario) {
            usuario = new Usuario(nuevoUsuario.id, nuevoUsuario.nombre);
        });
        socket.on("listaUsuarios", function (usuarios) {
            $("#listaConectados ul").empty();
            for (var i = 0; i < usuarios.length; i++) {
                var claseEstado = "estadoConectado";///pongo los desconectados?
                $("#listaConectados ul").append("<li data-id=" + usuarios[i].id + "><div class='estado " + claseEstado + "'></div>" + usuarios[i].nombre + "</li>");//es seguro poner el id aqui?
            }
        });
        socket.on("mensajeNuevo", function (datos) {
            agregarNuevoMensaje(datos.remitente.nombre, datos.mensaje, false);
        });

        $("#btnEnviarMensaje").click(function () {
            var datos = {
                remitente: usuario,
                mensaje: $("#enviarMensaje textarea").val().trim()
            };
            socket.emit("mensajeNuevo", datos, function () {
                agregarNuevoMensaje(usuario.nombre, datos.mensaje, true);
                $("#enviarMensaje textarea").val("");
                console.log("Recibido con exito por el servidor");
            });
        });

        //funciones
        function agregarNuevoMensaje(nombreUsuarioRemitente, mensaje, enviado) {
            //deberia poner el nombreUsuarioRemitente en alguna parte del html
            var claseEnviado = "mensajeRecibido";
            if (enviado === true) {
                claseEnviado = "mensajeEnviado";
            }
            $("#chat").append("<li class='mensaje " + claseEnviado + "'><strong>" + nombreUsuarioRemitente + "</strong><br/>" + mensaje + "</li>");

        }
    });

    //clases
    function Usuario(id, nombre) {
        this.id = id;
        this.nombre = nombre;
        this.equals = function (usuario) {
            return (this.id === usuario.id && this.nombre === usuario.nombre);
        };
    }
})();