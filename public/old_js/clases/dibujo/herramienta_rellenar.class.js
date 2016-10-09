HerramientaRellenar.prototype = new Herramienta;
/**
 * Permite pintar un area
 * @param {Papel} papel Papel de dibujo
 * @returns {HerramientaRellenar}
 */
function HerramientaRellenar(papel) {
    Herramienta.call(this, "Rellenar", papel);
    //Obtengo la imagen del canvas
    this.datosImagen;
    //Obtengo la matriz de los colores en cada pixel del canvas
    this.datos;
    this.ancho;
    this.rojo;
    this.verde;
    this.azul;
    this.alpha;
    var that = this;

    this.onclick = function (evento) {
        this.__proto__.onclick(evento);
        //Obtengo los puntos donde se hizo click
        var x = evento.offsetX;
        var y = evento.offsetY;
        //Obtengo la imagen del canvas
        this.datosImagen = this.papel.contexto.getImageData(0, 0, this.papel.canvas.width, this.papel.canvas.height);
        //Obtengo la matriz de datos de colores
        this.datos = this.datosImagen.data;
        //Obtengo el ancho de la imagen
        this.ancho = this.datosImagen.width;
        //Obtengo los colores del punto dado del canvas
        this.rojo = this.datos[ (y * this.ancho + x) * 4 + 0];
        this.verde = this.datos[ (y * this.ancho + x) * 4 + 1];
        this.azul = this.datos[ (y * this.ancho + x) * 4 + 2];
        this.alpha = this.datos[ (y * this.ancho + x) * 4 + 3];

        //Pinto el area correspondiente
        distribuirInfeccion(x, y);

        //Asigno la nuevo imagen al contexto
        that.papel.contexto.putImageData(that.datosImagen, 0, 0);
    };


//Funcion que pinta una zona desde un punto x e y por parametro
    function distribuirInfeccion(x, y) {

        var auxPintar;
        var estado = 0;
        var i = x;
        var j = y;
        var bandera = true;
        var bordesLat = [];
        var bordesSupInf = [];
        //Recorro la imagen hasta que termine de pintar
        while (bandera) {
            //Verifico si se debe pintar el pixel
            var pintar = verificarColor(i, j);
            if (pintar) {
                //Pinto cada componente del pixel RGBA
                that.datos[ (j * that.ancho + i) * 4 + 0] = 0;
                that.datos[ (j * that.ancho + i) * 4 + 1] = 0;
                that.datos[ (j * that.ancho + i) * 4 + 2] = 0;
                that.datos[ (j * that.ancho + i) * 4 + 3] = 255;
            }
            else {
                //Agrego la poscion al arrar de bordes
                bordesLat.push({x: i, y: j});

                //Si entro aca es porque llegue a un borde
                //Pregunta que estado o zona debe pintar
                switch (estado) {
                    case 0:
                        {
                            //Verifico si se va a poder seguir pintando mas abajo
                            auxPintar = verificarColor(x, j + 1);
                            if (!auxPintar) {
                                //Agrego los bordes de la ultima linea
                                for (var k = x; k < i; k++) {
                                    bordesSupInf.push({x: k, y: j});
                                }
                                //Si no cambio el estado para pintar en otra zona y reinicio j
                                j = y;
                                estado = 1;
                            }
                            else {
                                //Si se debe seeuir aumento la variable j para pintar mas abajo
                                j += 1;
                            }
                            //Reinicio la variable i para pintar mas abajo
                            i = x - 1;
                        }
                        break;
                    case 1:
                        {
                            auxPintar = verificarColor(x, j - 1);
                            if (!auxPintar) {
                                for (var k = x; k < i; k++) {
                                    bordesSupInf.push({x: k, y: j});
                                }
                                j = y;
                                x -= 1;
                                estado = 2;
                            }
                            else {
                                j -= 1;
                            }
                            //Reinicio la variable i
                            i = x - 1;
                        }
                        break;
                    case 2:
                        {
                            auxPintar = verificarColor(x, j + 1);
                            if (!auxPintar) {
                                for (var k = i; k < x; k++) {
                                    bordesSupInf.push({x: k, y: j});
                                }
                                j = y;
                                estado = 3;
                            }
                            else {
                                j += 1;
                            }
                            //Reinicio la variable i
                            i = x + 1;
                        }
                        break;
                    case 3:
                        {
                            auxPintar = verificarColor(x, j - 1);
                            if (!auxPintar) {
                                for (var k = i; k < x; k++) {
                                    bordesSupInf.push({x: k, y: j});
                                }
                                bandera = false;
                            }
                            else {
                                j -= 1;
                            }
                            //Reinicio la variable i
                            i = x + 1;
                        }
                        break;
                }

            }
            switch (estado) {
                case 0:
                    {
                        i += 1;
                    }
                    break;
                case 1:
                    {
                        i += 1;
                    }
                    break;
                case 2:
                    {
                        i -= 1;
                    }
                    break;
                case 3:
                    {
                        i -= 1;
                    }
                    break;
            }

        }
        for (var i = 0; i < bordesSupInf.length; i++) {
            expandirInfeccion(bordesSupInf[i].x, bordesSupInf[i].y);
        }
        for (var i = 0; i < bordesLat.length; i++) {
            expandirInfeccion(bordesLat[i].x, bordesLat[i].y);
        }
    }
    ;

    function verificarColor(x, y) {
        var rojoC, verdeC, azulC, alphaC;

        //Obtengo los colores del punto dado del canvas
        rojoC = that.datos[ (y * that.ancho + x) * 4 + 0];
        verdeC = that.datos[ (y * that.ancho + x) * 4 + 1];
        azulC = that.datos[ (y * that.ancho + x) * 4 + 2];
        alphaC = that.datos[ (y * that.ancho + x) * 4 + 3];

        return (rojoC === that.rojo && verdeC === that.verde && azulC === that.azul && alphaC === that.alpha);
    }
    ;

    function expandirInfeccion(x, y) {
        var auxX = x;
        var auxY = y + 1;
        infectar(auxX, auxY);

        auxX = x - 1;
        auxY = y + 1;
        infectar(auxX, auxY);

        auxX = x - 1;
        auxY = y - 1;
        infectar(auxX, auxY);

        auxX = x;
        auxY = y - 1;
        infectar(auxX, auxY);

        auxX = x + 1;
        auxY = y - 1;
        infectar(auxX, auxY);

        auxX = x + 1;
        auxY = y + 1;
        infectar(auxX, auxY);
    }
    ;

    function infectar(x, y) {
        var expandir = verificarColor(x, y);

        if (expandir) {
            distribuirInfeccion(x, y);
        }
    }
    ;
}