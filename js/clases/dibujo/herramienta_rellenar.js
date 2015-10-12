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
            console.log("hola");
            this.__proto__.onclick(evento);
            var x = evento.offsetX;
            var y = evento.offsetY;
            
            //Obtengo la imagen del canvas
            var datosImagen = this.papel.contexto.getImageData(0, 0, 800, 600);
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
        var ancho = datos.width;

        //Verifico si se debe pintar el pixel
        var infectar = verificarColor(x, y, rojo, verde, azul, alpha, datos);
        if (infectar) {
            //Pinto cada componente del pixel RGBA
            datos[ (y * ancho + x) * 4 + 0] = 255;
            datos[ (y * ancho + x) * 4 + 1] = 255;
            datos[ (y * ancho + x) * 4 + 2] = 255;
            datos[ (y * ancho + x) * 4 + 3] = 255;
            //Distribuyo la infeccion a otro pixel
            y++;
            distribuirInfeccion(x, y, rojo, verde, azul, alpha, datos);
            x++;
            distribuirInfeccion(x, y, rojo, verde, azul, alpha, datos);
            y++;
            x++;
            distribuirInfeccion(x, y, rojo, verde, azul, alpha, datos);
            y--;
            x--;
            distribuirInfeccion(x, y, rojo, verde, azul, alpha, datos);
            y++;
            x--;
            distribuirInfeccion(x, y, rojo, verde, azul, alpha, datos);
            y--;
            x++;
            distribuirInfeccion(x, y, rojo, verde, azul, alpha, datos);
        }

        return datosImagen;
    };

    function verificarColor(x, y, rojo, verde, azul, alpha, datos) {
        var rojoC, verdeC, azulC, alphaC;
        var ancho = datos.width;

        //Obtengo los colores del punto dado del canvas
        rojoC = datos[ (y * ancho + x) * 4 + 0];
        verdeC = datos[ (y * ancho + x) * 4 + 1];
        azulC = datos[ (y * ancho + x) * 4 + 2];
        alphaC = datos[ (y * ancho + x) * 4 + 3];

        return (rojoC === rojo && verdeC === verde && azulC === azul && alphaC === alpha);
    };

