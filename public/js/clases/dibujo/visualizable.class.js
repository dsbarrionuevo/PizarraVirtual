/**
 * _abstract
 * Cualquier objeto visualizable
 * @param {float} x Posicion x de la esquina superior izquierda
 * @param {float} y Posicion y de la esquina superior izquierda
 * @param {float} ancho Ancho del objeto
 * @param {float} alto Alto del objeto
 * @param {Estilo} estilo 
 * @returns {Visualizable}
 */
function Visualizable(x, y, ancho, alto, estilo) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.estilo = estilo;
    if (this.estilo === undefined) {
        this.estilo = new Estilo();
    }
    //metodo abstracto
    this.obtenerNombre = function () {
    };
    //metodo abstracto
    this.dibujar = function (contexto) {
    };

    /**
     * _abstract
     * Resalta con un contorno particular el objeto visible
     * @returns {undefined}
     */
    this.marcar = function (contexto) {
    };

    /**
     * _abstract
     * Verifica si un punto está dentro del objeto visualizable
     * @param {float} x Posicion x del punto a verificar
     * @param {float} y Posicion y del punto a verificar
     * @returns {boolean} Devuelve verdadero si el punto pasado como parametro
     * esta dentro del objeto visualizable, falso en cso contrario
     */
    this.intersecta = function (x, y) {
    };

    /**
     * _abstract
     * Cambia la posicion del objeto
     * @param {float} x Componente x del vector movimiento
     * @param {float} y Componente y del vector movimiento
     * @returns {undefined}
     */
    this.mover = function (x, y) {
    };

    /**
     * _abstract
     * Cambia el tamanio del objeto
     * @param {float} x Componente x del vector escalamiento
     * @param {float} y Componente y del vector escalamiento
     * @returns {undefined}
     */
    this.escalar = function (x, y) {
    };

    /**
     * _abstract
     * Cambia la rotacion del objeto
     * @param {float} angulo Angulo en grados indicando el desplazamiento al 
     * rededor del eje central del objeto
     * @returns {undefined}
     */
    this.rotar = function (angulo) {
    };
}