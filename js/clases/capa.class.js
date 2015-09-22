function Capa(orden) {
	this.orden = orden;//algo asi como el z-index, o nivel de profundidad en el papel, 0 es la más baja
	this.objetos = [];//lista de objetos visualizables
	this.dibujar = function(contexto){
		for(var i=0; i<this.objetos.length; i++){
			this.objetos[i].dibujar(contexto);
		}
	};
	this.agregarObjeto = function(objeto){
		//objeto es instancia de Visualizable
		this.objetos.push(objeto);//por ahora no me procupo por el orden de visualizacion dentro de la capa
	};
}