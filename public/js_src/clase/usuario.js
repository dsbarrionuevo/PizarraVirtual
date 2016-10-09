class Usuario{
  constructor(id, nombre){
    this.id = id;
    this.nombre = nombre;
  }
  toString(){
    return "Usuario: {id: " + this.id +", nombre: " + this.nombre +" }";
  }
}
