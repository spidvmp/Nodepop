'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config');

var pushTokenSchema = mongoose.Schema({

    /*plataforma
    token
    usuario
     */
    so: {type:String, enum:['ios','android']},
    token: String,
    user: [{type: Schema.Types.ObjectId, ref:'User'}]
});

//metodo estatico para buscar si existe
pushTokenSchema.statics.buscaUser = function ( criterio, callBack){
    //busco un registro en el que este el id del usuario
    var query = PushToken.find(criterio);
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

var PushToken = mongoose.model('PushToken', pushTokenSchema);
module.exports = PushToken;