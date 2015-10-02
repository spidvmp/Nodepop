'use strict';


var fs = require('fs');
//var codigos=require('./ErrorCodes');
//var respuesta=require('./leeCodigosError');
//var respuesta=require('./leeCodigosError');
/*
var respuesta=leeCodigosError(function(err,data){
    if ( err ){
        respuesta={};
    }

});
*/
var respuesta={
    'NO_ACCESS': {'es':'Acceso prohibido', 'en':'Forbidden access', 'code':401},
    'ERR_LIST':{'es': 'Error al generar lisado', 'en': 'Error creating list'},
    'ERR_UNKNOW_USER': {'es': 'Usuario desconocido', 'en': 'unknow user'},
    'ERR_FIND_USER': {'es': 'Error al buscar usuario', 'en': 'Error finding user'},
    'ERR_SAVE_USER': {'es': 'Error al grabar usuario', 'en': 'Error saving user'},
    'USER_EXIST': {'es': 'El usuario ya existe', 'en': 'User exist'},
    'ERR_NO_TOKEN': {'es': 'Sin token', 'en': 'No token'},
    'ERR_SAVE_TOKEN': {'es': 'Error al grabar el token push', 'en': 'Error saving token push'}
};
function devuelve(palabra, idioma) {
    //me pasan una tipo de error y el idioma. Si viene vacio por defecto se devuelve español
    var lang = idioma || 'es';



    //saco los valores del singleton
    //var respuesta = codigos.codes();


//    console.log('ponen ',palabra, ' ', respuesta[palabra][lang]);
    var err = {};
    //compruebop si tengo alguna respuesta
    if (respuesta[palabra][lang]) {
        err.message = respuesta[palabra][lang];
    } else {
        //me mandan un codigo que desconozco o que hubo error al leer el fichero
        err.message="message";
    }

    //compruebo si tengo algun codigo HTTP que devolver, no siempre lo tengo
    if ( respuesta[palabra]['code'] ) {
        err.code = respuesta[palabra]['code'];
    }

    return {ok:false, error:err};
}

/*

function leeCodigosError(callBack) {


    fs.readFile('../ErrorCodes.txt', function (err, data) {

        if (err) {
            console.log('Error al leer codigos de error ', err);
            return callBack(err); //cb(err);
        }

        try {
            //console.log('leido=',data);
            // parsearlo
            var packageJson = JSON.parse(data);
            console.log('leido ',data,' pack=',packageJson);
        } catch (e) {
            console.log('Error al parsear los codigos de error');
            return callBack(err); //cb(e);

        }

        // devolver las dependencias

        //return cb(null, Object.getOwnPropertyNames(packageJson.dependencies));
        return  callBack(null, packageJson);

    });

}
*/
module.exports = devuelve;