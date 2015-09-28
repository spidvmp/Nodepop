'use strict';

var mongoose = require('mongoose');
var db = mongoose.connection;
var config = require('../config');

//handler de error de conexion
db.on('error',function(err){
    console.log(err);
    //paramos todo
    process.exit(1);

});
//handles de conexion
db.once('open',function(){
    console.log("Conectados a MongoDB");
});


//nos conectamos
console.log("Comprobar la IP del portatil y cambiarlo aqui y al arrancar mongo")
mongoose.connect(config.mongoConex);