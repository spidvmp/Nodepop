'use strict';

var mongoose = require('mongoose');

//definomos Schema de usuario
var userSchema = mongoose.Schema({
    login: String,
    password: String,
    token: String
});


//definimos un metodo estatico para que se busque si existe un login que ya estuviera creado
userSchema.statics.userExist=function(criterio, callBack){
    //defino la query a buscar, basicamente sera que el login exista
    var query = User.find(criterio);
    //ejecuto la query
    query.exec(function(err, rows){
        if ( err ){
            //ha habido algun error
            return callBack(err);
        }
        //devuelvo lo que haya encontrado
        return callBack(null, rows);
    });


};

//lo exportamos
var User = mongoose.model('User', userSchema);

module.exports = User;