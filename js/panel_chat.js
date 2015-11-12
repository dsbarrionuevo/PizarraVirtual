(function () {
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
    });
})();