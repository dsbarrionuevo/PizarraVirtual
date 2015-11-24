(function () {
    var socket;
    var usuario;
    var esEmisor = false;
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
        //
        //oculto el panel de herramientas por defecto
        $("#panelHerramientas").css("display", "none");
        $("#modalInicioSesion input[name='txtNombreUsuario']").focus();

        //abro el socket
        socket = io.connect('http://localhost:8080');
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
                    esEmisor = datos.emisor;
                    if (esEmisor) {
                        iniciarConfiguracionEmisor();
                    } else {
                        iniciarConfiguracionEscucha();
                    }
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
        //profesor
        function iniciarConfiguracionEmisor() {
            $("#panelHerramientas").css("display", "block");
            var e = new Escucha();
            papel.agregarListener(e);
        }
        //alumno
        function iniciarConfiguracionEscucha() {
            $("#panelHerramientas").css("display", "none");
            //... deseleccione las herramientas del panel
            $("#panelHerramientas button").removeClass("seleccionada");
            socket.on('objetoAgregado', function (datos) {
                //console.log("Así llegó: ", datos);
                var objeto = undefined;
                if (datos.figura === "Circulo") {
                    objeto = new Circulo(datos.objeto.x + datos.objeto.radio, datos.objeto.y + datos.objeto.radio, datos.objeto.radio);
                } else if (datos.figura === "Flecha") {
                    objeto = new Flecha(datos.objeto.x, datos.objeto.y, datos.objeto.x + datos.objeto.ancho, datos.objeto.y + datos.objeto.alto, datos.objeto.largoPunta);
                } else if (datos.figura === "Linea") {
                    objeto = new Linea(datos.objeto.x, datos.objeto.y, datos.objeto.x + datos.objeto.ancho, datos.objeto.y + datos.objeto.alto);
                } else if (datos.figura === "Rectangulo") {
                    objeto = new Rectangulo(datos.objeto.x, datos.objeto.y, datos.objeto.ancho, datos.objeto.alto);
                } else if (datos.figura === "RectanguloRedondeado") {
                    objeto = new RectanguloRedondeado(datos.objeto.x, datos.objeto.y, datos.objeto.ancho, datos.objeto.alto, datos.objeto.radio);
                } else if (datos.figura === "Rombo") {
                    objeto = new Rombo(datos.objeto.x, datos.objeto.y, datos.objeto.ancho, datos.objeto.alto);
                } else if (datos.figura === "Triangulo") {
                    objeto = new Triangulo(datos.objeto.x, datos.objeto.y, datos.objeto.ancho, datos.objeto.alto);
                } else if (datos.figura === "TrianguloRectangulo") {
                    objeto = new TrianguloRectangulo(datos.objeto.x, datos.objeto.y, datos.objeto.ancho, datos.objeto.alto);
                }
                papel.agregarObjeto(objeto);
                papel.dibujar();
            });
        }

    });

    //clases
    Escucha.prototype = new ListenerPapel;
    function Escucha() {
        this.objetoAgregado = function (objeto, ordenCapa) {
            //console.log("Así se fue: ", objeto);
            socket.emit("objetoAgregado",
                    {
                        figura: objeto.obtenerNombre(),
                        objeto: objeto,
                        estilo: undefined
                    });
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