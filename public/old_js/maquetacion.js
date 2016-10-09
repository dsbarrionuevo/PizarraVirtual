(function () {
    $(document).ready(function () {
        var altoTitularChat = getHeight($("#titularChat"));
        var altoEnviarMensaje = getHeight($("#enviarMensaje"));
        var altoPanelChat = getHeight($("#panelChat"));
        $("#conversacion").css("height", altoPanelChat - (altoTitularChat + altoEnviarMensaje));
    });
    function getHeight(object) {
        return parseFloat(object.css("height")) +
                parseFloat(object.css("margin-top")) +
                parseFloat(object.css("margin-bottom"));
    }
})();