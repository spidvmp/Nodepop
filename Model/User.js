'use strict';

var mongoose = require('mongoose');

//definomos Schema de usuario
var userSchema = mongoose.Schema({
    /*
    name: nombre del usuario
    login: login del usuario, sera un email
    password: password del usuario
    uuid: objeto que contiene los diferentes uuids de los dispositivos desde los que se conecta y el so al que pertenece
     */
    name: String,
    login: String,
    password: String,
    so: String,
    tokenpush: String
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

//defino metodo de instancia para actualizar un registro
userSchema.methods.updateToken = function(callBack){
    //console.log("UPDATE id=",this._id);
    User.update({_id: this._id},{$set:{so: this.so, tokenpush: this.tokenpush}}, function(err, numUpdated){
        if ( err ){
            console.log("err updated");
            return callBack();
        } else if (numUpdated) {
            console.log("Actualizados ", numUpdated);
        } else {
            console.log("No se actualizo ninguno");
        }
    });
}



//lo exportamos
var User = mongoose.model('User', userSchema);

module.exports = User;