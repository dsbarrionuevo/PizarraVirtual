var canvas, contexto;
var ctrl = new Controlador();

window.addEventListener("load", init);

function init(){
	canvas = document.querySelector("canvas");
	contexto = canvas.getContext("2d");
	contexto.fillStyle = "#fff";
	contexto.fillRect(0,0,canvas.width,canvas.height);
	//guardo el canvas inicila (en blanco)
	ctrl.capturar();
	canvas.addEventListener("mousedown",mousedownHanlder);
	document.getElementById("undo").addEventListener("click",function(){
		ctrl.regresar();
	});
	document.getElementById("redo").addEventListener("click",function(){
		ctrl.siguiente();
	});
}

var ptoInicial = {x: 0, y:0};
var ptoFinal = {x: 0, y:0};

function mousedownHanlder(evt){contexto.strokeStyle = "#000";
	//guardo el contexto anterior
	contexto.beginPath();
	contexto.moveTo(evt.offsetX, evt.offsetY);
	ptoInicial = {x: evt.offsetX, y:evt.offsetY};
	canvas.removeEventListener("mousedown",mousedownHanlder);
	canvas.addEventListener("mousemove",mousemoveHanlder);
}
function mousemoveHanlder(evt){
	//document.querySelector("p").innerHTML = "movement ("+evt.movementX+","+evt.movementY+")";
	contexto.lineTo(evt.offsetX, evt.offsetY);
	contexto.stroke();
	canvas.addEventListener("mouseup",mouseupHanlder);
}
function mouseupHanlder(evt){
	//document.querySelector("p").innerHTML = "client (" + evt.clientX + "," + evt.clientY +"), page ("+evt.pageX+","+evt.pageY+"), screen ("+evt.screenX+","+evt.screenY+"), offset("+evt.offsetX+","+evt.offsetY+")";
	canvas.removeEventListener("mousemove",mousemoveHanlder);
	canvas.removeEventListener("mouseup",mouseupHanlder);
	canvas.addEventListener("mousedown",mousedownHanlder);
	ptoFinal = {x: evt.offsetX, y:evt.offsetY};
	/*
	contexto.fillStyle = "#ff0";
	contexto.fillStyle = colorSiguiente();
	contexto.fillRect(
		ptoInicial.x, 
		ptoInicial.y, 
		(ptoFinal.x - ptoInicial.x), 
		(ptoFinal.y - ptoInicial.y)
		);
	*/
	ctrl.capturar();
}

function Controlador(){
	this.indice = -1;
	this.capturas = [];
	this.capturar = function(){
		var captura = {
			imagen:contexto.getImageData(0,0,canvas.width,canvas.height),
			x:0,
			y:0
		};
		this.capturas.push(captura);
		this.indice++;
		console.log(this.capturas);
	};
	this.regresar = function(){
		this.indice = (this.indice === 0)?this.indice:this.indice-1;
		this.pintar();
		console.log(this.capturas);
	};
	this.siguiente = function(){
		this.indice = (this.indice === this.capturas.length-1)?this.indice:this.indice+1;
		this.pintar();
		console.log(this.capturas);
	};
	this.pintar = function(){
		console.log(this.indice);
		if(this.indice>=0 && this.indice<=this.capturas.length-1){
			var captura = this.capturas[this.indice];
			contexto.putImageData(captura.imagen, captura.x, captura.y);
		}
	};
}

var colores = ["#f0f","#ff0","#f00","#0f0","#00f","#0ff"];
var indColor = 0;
function colorSiguiente(){
	indColor = (indColor === colores.length-1)?0:indColor+1;
	return colores[indColor];
}
