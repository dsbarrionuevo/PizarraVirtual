HerramientaRellenar.prototype = new Herramienta;
function HerramientaSeleccion(papel) {
    Herramienta.call(this, papel);
    this.onclick = function (evento) {
        this.__proto__.onclick(evento);
        var px = evento.offsetX;
        var py = evento.offsetY;
        //Obtengo la imagen del canvas
        var datosImagen = this.papel.context.getImageData(0,0,800,600);
        //Obtengo la matriz de los colores en cada pixel del canvas
        var datos = datosImagen.data;
        
        
        var alto = datosImagen.heigth;
        var ancho = datosImagen.width;
        var rojo, verde, azul, alpha;
        
        //Obtengo los colores del punto dado del canvas
        var componentes = [
            rojo = datos[ ( py * ancho + x ) * 4 + 0],
            verde = datos[ ( py * ancho + x ) * 4 + 1],
            azul = datos[ ( py * ancho + x ) * 4 + 2],
            alpha = datos[ ( py * ancho + x ) * 4 + 3]
        ];
        
        var rojoC, verdeC, azulC, alphaC;
        
        var x;
        for (x = px; x < ancho; x++) {
                rojoC = datos[( py * ancho + x ) * 4 + 0];
                verdeC = datos[( py * ancho + x ) * 4 + 1];
                azulC = datos[( py * ancho + x ) * 4 + 2];
                alphaC = datos[( py * ancho + x ) * 4 + 3];
                
                if(rojoC!==rojo || verdeC!==verde || azulC!==azul ||alphaC!==alpha){
                    x++;
                    break;
                }
        }
        
        while(true){
            this.papel.context.beginPath();
            comprobar(this.papel.context,x,py, rojo,verde,azul,alpha,datos);
        }
    };
    
    function comprobar(contexto,x,y,rojo,verde,azul,alpha,datos){
        var xf=x;
        var yf=y;
        while(comprobarAbajo(xf,yf,rojo,verde,azul,alpha,datos)){
            yf++;
            contexto.lineTo(xf,yf);
        }
        while(comprobarIzquierda(xf,yf,rojo,verde,azul,alpha,datos)){
            yf++;
            contexto.lineTo(xf,yf);
        }
        
    }
    
    function comprobarAbajo(x,y,rojo,verde,azul,alpha,datos){
        var rojoC,verdeC,azulC,alphaC;
        var ancho = datos.width;
        //Obtengo los colores del punto dado del canvas
        y++;
        
        rojoC = datos[ ( y * ancho + x ) * 4 + 0];
        verdeC = datos[ ( y * ancho + x ) * 4 + 1];
        azulC = datos[ ( y * ancho + x ) * 4 + 2];
        alphaC = datos[ ( y * ancho + x ) * 4 + 3];        
        
        return (rojoC===rojo || verdeC===verde || azulC===azul ||alphaC===alpha);
    };
   
}