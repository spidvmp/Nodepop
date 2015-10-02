"use strict";

var fs = require('fs');
var path = require('path');



//var leeCodigos=require('./lib/leecodigosError');
/*
var respuesta;
leeCodigosError(function(err,data){
    if ( err ){
        respuesta={};
    }
    respuesta=data;
});
*/
function leeCodigosError(callBack) {

    var f=path.join(__dirname,'../ErrorCodes.txt');
    fs.exists(f,function(ex){

            console.log('existe ',ex);

    });
console.log('-->Comienzo a leer ', __dirname);
    fs.readFile(f, function (err, data) {

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
            return callBack(e); //cb(e);

        }

        // devolver las dependencias
        console.log('salgo por el final ',packageJson);
        //return cb(null, Object.getOwnPropertyNames(packageJson.dependencies));
        return  callBack(null, packageJson);

    });

}

module.exports = leeCodigosError;