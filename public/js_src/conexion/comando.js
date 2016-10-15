class Comando{
  /**
    Construye el comando con los datos necesarios.
    @param {String} nombre Nombre unívoco del comando.
    @param {JSON} datos Objeto de datos que envía y recibe.
    @param {Function} handshake Función de callback a ejecutarse como
    comprobación del envío exitoso del comando al servidor.
  */
  constructor(nombre, datos, handshake){
    this.nombre = nombre;
    this.datos = (datos || {});
    this.handshake = (handshake || null);
  }
  /**
    Se ejecuta cuando llega el comando desde el servidor.
  */
  ejecutar(datos){
    console.log("Comando "+ this.nombre +" en ejecución");
  }
}
