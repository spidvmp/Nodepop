'use strict';

var mongoose = require('mongoose');

//definomos Schema de usuario
var userSchema = mongoose.Schema({
    login: String,
    password: String,
    token: String
});


//definimos el metodo estatico add User
userSchema.statics.add=function(criterios, callBack){
    //esto inserta una agente. En el criterio se incluyen el login y password
    var agt= new Agente(criterios);

};

/*
//definimos metodo de instancia, le ponemos get, porqur hemos querido, es el nombre del metodo
agenteSchema.methods.get = function(idAgente, callBack){
    console.log(this);
    //se supone que tenemos un agente cargado, ya que es metodo de instancia. En this tengo todo
    return callBack(null,this);
}

agenteSchema.methods.sumaEdad = function(cuanto){
    this.age = this.age + 1;
    return this;
}
*/


//lo exportamos
var Agente = mongoose.model('Agente', agenteSchema);

module.exports = Agente;