'use strict';

var mongoose = require('mongoose');
var config = require('../config');
var db = mongoose.connection;

//handler de error de conexion
db.on('error',function(err){
    console.error('mongodb connection error:',err);
    //paramos todo
    process.exit(1);

});
//handles de conexion
db.once('open',function(){
    console.log("Conectados a MongoDB");
});


//nos conectamos
console.log("Comprobar la IP del portatil y cambiarlo aqui y al arrancar mongo");

mongoose.connect(config.mongoConex);

//cargo los modelos
require('../Model/Article');
require('../Model/PushToken');
require('../Model/User');
module.exports = db;