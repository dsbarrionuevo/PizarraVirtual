function ListenerPapel(id) {
    this.id = id;
    this.equals = function (listener) {
        return (listener instanceof ListenerPapel && listener.id === this.id);
    };
    this.objetoAgregado = function (objeto, ordenCapa) {
    };
    this.objetoEliminado = function (objeto, ordenCapa) {
    };
    this.capaAgregada = function () {
    };
    this.capaEliminada = function () {
    };
    this.papelDibujado = function () {
    };
    this.herramientaCambiada = function () {
    };
}