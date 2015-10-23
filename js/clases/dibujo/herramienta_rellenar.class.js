HerramientaRellenar.prototype = new Herramienta;
/**
 * Permite pintar un area
 * @param {string} nombre Nombre de la herramienta
 * @param {Papel} papel Papel de dibujo
 * @returns {HerramientaRellenar}
 */
function HerramientaRellenar(papel) {
    Herramienta.call(this, "Rellenar", papel);

    this.onclick = function (evento) {
        this.__proto__.onclick(evento);
        var x = evento.offsetX;
        var y = evento.offsetY;

        //Obtengo la imagen del canvas
        var datosImagen = this.papel.contexto.getImageData(0, 0, this.papel.canvas.width, this.papel.canvas.height);
        //Obtengo la matriz de los colores en cada pixel del canvas
        var datos = datosImagen.data;

        var ancho = datosImagen.width;
        var rojo, verde, azul, alpha;

        //Obtengo los colores del punto dado del canvas
        rojo = datos[ (y * ancho + x) * 4 + 0];
        verde = datos[ (y * ancho + x) * 4 + 1];
        azul = datos[ (y * ancho + x) * 4 + 2];
        alpha = datos[ (y * ancho + x) * 4 + 3];

        //Obtengo la imagen con la seccion pintada
        datosImagen = distribuirInfeccion(x, y, rojo, verde, azul, alpha, datosImagen);

        //Asigno la nuevo imagen al contexto
        this.papel.contexto.putImageData(datosImagen, 0, 0);
    };
}

//Funcion que pinta una zona desde un punto x e y por parametro
function distribuirInfeccion(x, y, rojo, verde, azul, alpha, datosImagen) {
    var datos = datosImagen.data;
    var ancho = datosImagen.width;

    var auxPintar;
    var estado = 0;
    var i = x;
    var j = y;
    var bandera = true;

    while (bandera) {
        //Verifico si se debe pintar el pixel
        var pintar = verificarColor(i, j, rojo, verde, azul, alpha, datosImagen);
        if (pintar) {
            //Pinto cada componente del pixel RGBA
            datos[ (j * ancho + i) * 4 + 0] = 25;
            datos[ (j * ancho + i) * 4 + 1] = 25;
            datos[ (j * ancho + i) * 4 + 2] = 25;
            datos[ (j * ancho + i) * 4 + 3] = 25;
        }
        else {
            switch (estado) {
                case 0:
                    {
                        //Reinicio la variable i
                        i = x - 1;

                        auxPintar = verificarColor(x, j + 1, rojo, verde, azul, alpha, datosImagen);
                        if (!auxPintar) {
                            j = y;
                            estado = 1;
                        }
                        else {
                            j += 1;
                        }
                    }
                    break;
                case 1:
                    {
                        //Reinicio la variable i
                        i = x - 1;

                        auxPintar = verificarColor(x, j - 1, rojo, verde, azul, alpha, datosImagen);
                        if (!auxPintar) {
                            j = y;
                            x -= 1;
                            estado = 2;
                        }
                        else {
                            j -= 1;
                        }
                    }
                    break;
                case 2:
                    {
                        //Reinicio la variable i
                        i = x + 1;
                        auxPintar = verificarColor(x, j + 1, rojo, verde, azul, alpha, datosImagen);
                        if (!auxPintar) {
                            j = y;
                            estado = 3;
                        }
                        else {
                            j += 1;
                        }
                    }
                    break;
                case 3:
                    {
                        //Reinicio la variable i
                        i = x + 1;

                        auxPintar = verificarColor(x, j - 1, rojo, verde, azul, alpha, datosImagen);
                        if (!auxPintar) {
                            bandera = false;
                        }
                        else {
                            j -= 1;
                        }
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
    return datosImagen;
}
;

function verificarColor(x, y, rojo, verde, azul, alpha, datosImagen) {
    var rojoC, verdeC, azulC, alphaC;
    var datos = datosImagen.data;
    var ancho = datosImagen.width;

    //Obtengo los colores del punto dado del canvas
    rojoC = datos[ (y * ancho + x) * 4 + 0];
    verdeC = datos[ (y * ancho + x) * 4 + 1];
    azulC = datos[ (y * ancho + x) * 4 + 2];
    alphaC = datos[ (y * ancho + x) * 4 + 3];

    return (rojoC === rojo && verdeC === verde && azulC === azul && alphaC === alpha);
}
;

function expandirInfeccion(x, y, rojo, verde, azul, alpha, datosImagen) {
    var auxX = x;
    var auxY = y+1;
    infectar(auxX, auxY, rojo, verde, azul, alpha, datosImagen);
    
    auxX = x;
    auxY = y - 1;
    infectar(auxX, auxY, rojo, verde, azul, alpha, datosImagen);
        
}
;

function infectar(x, y, rojo, verde, azul, alpha, datosImagen){
    var expandir = verificarColor(x, y, rojo, verde, azul, alpha, datosImagen);

    if (expandir) {
        distribuirInfeccion((x, y, rojo, verde, azul, alpha, datosImagen));
    }
}
;