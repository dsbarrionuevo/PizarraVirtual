(function () {
    var socket;
    var usuario;
    $(document).ready(function () {
        $("#btnChatMostrarConectados").data("accion", "mostrar");
        $("#btnChatMostrarConectados").click(function () {
            var $this = $(this);
            if ($this.data("accion") === "mostrar") {
                mostrarOcultarListaConectados(true);
            } else {
                mostrarOcultarListaConectados(false);
            }
        });
        $("#enviarMensaje textarea").focus(function () {
            mostrarOcultarListaConectados(false);
        });

        //primero solicito nombre de usuario
        $("#blackout").css("display", "block");

        //chat
        //abro el socket
        socket = io.connect('http://localhost');
        //lista de eventos que escucho
        //actualizo mi lista de usuarios conectados (solo mantengo en el html, no js)
        socket.on("listaUsuarios", function (usuarios) {
            $("#listaConectados ul").empty();
            for (var i = 0; i < usuarios.length; i++) {
                var claseEstado = "estadoConectado";///pongo los desconectados?
                $("#listaConectados ul").append("<li data-id=" + usuarios[i].id + "><div class='estado " + claseEstado + "'></div>" + usuarios[i].nombre + "</li>");//es seguro poner el id aqui?
            }
        });
        //escribo el mensaje que otro usuario envio
        socket.on("mensajeNuevo", function (datos) {
            agregarNuevoMensaje(datos.remitente.nombre, datos.mensaje, false);
        });

        //enviar nombre de usuario
        $("#btnInicioSesion").click(function (evt) {
            //if (usuario === undefined) {
            var datos = {
                nombre: $("#modalInicioSesion input[name='txtNombreUsuario']").val().trim()
            };
            //envio nombre al servidor
            socket.emit("nombreUsuarioNuevo", datos, function (datos) {
                //verifico si tuvo exito o no el nombre de usuario ingresado
                if (datos.exito === true) {
                    //creo mi usuario local
                    usuario = new Usuario(datos.nuevoUsuario.id, datos.nuevoUsuario.nombre);
                    $("#blackout").css("display", "none");
                    $("#modalInicioSesion").css("display", "none");
                } else {
                    $("#modalInicioSesion .mensaje").text("Nombre no disponible");
                }
            });
            //}
            evt.preventDefault();
        });

        $("#btnEnviarMensaje").click(function () {
            if ($("#enviarMensaje textarea").val().trim().length > 0) {
                var datos = {
                    remitente: usuario,
                    mensaje: $("#enviarMensaje textarea").val().trim()
                };
                //envio mensaje al servidor
                socket.emit("mensajeNuevo", datos, function () {
                    agregarNuevoMensaje(usuario.nombre, datos.mensaje, true);
                    $("#enviarMensaje textarea").val("");
                });
            }
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

        function mostrarOcultarListaConectados(mostrar) {
            if (mostrar === true) {
                $("#listaConectados").css("right", "0px");
                $("#btnChatMostrarConectados").text("Ocultar conectados");
                $("#btnChatMostrarConectados").data("accion", "ocultar");
            } else {
                $("#listaConectados").css("right", "-110%");
                $("#btnChatMostrarConectados").text("Mostrar conectados");
                $("#btnChatMostrarConectados").data("accion", "mostrar");
            }
        }

        var e = new Escucha();
        papel.agregarListener(e);

        socket.on('objetoAgregado', function (objeto) {
            papel.eliminarListener(e);
            papel.agregarObjeto(objeto);
            console.log("Así llegó: ", objeto);
            //papel.dibujar();
        });

    });

    //clases
    Escucha.prototype = new ListenerPapel;
    function Escucha() {
        this.objetoAgregado = function (objeto, ordenCapa) {
            console.log("Así se fue: ", objeto);
            socket.emit("objetoAgregado", objeto);
        };
    }

    function Usuario(id, nombre) {
        this.id = id;
        this.nombre = nombre;
        this.equals = function (usuario) {
            return (this.id === usuario.id && this.nombre === usuario.nombre);
        };
    }
})();