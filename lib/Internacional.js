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
    'saludo': {'es':'hola', 'en':'hello', 'code':401}, 'pepe':'manolo','si': 'no'
};
function devuelve(palabra, idioma) {
    //me pasan una tipo de error y el idioma. Si viene vacio por defecto se devuelve español
    var lang = idioma || 'es';

    //console.log('resp=',respuesta);

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

    return err;
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