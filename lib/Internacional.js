'use strict';
var codigos=require('./ErrorCodes');

function devuelve(palabra, idioma){
    //me pasan una tipo de error y el idioma. Si viene vacio por defecto se devuelve español
    var lang = idioma || 'es';


    //console.log("pala=", palabra, ' idioma=',idioma, ' lang=', lang);

    //saco los valores del singleton
    var respuesta=codigos.codes();
//console.log("singleton=", respuesta);
//    console.log('ponen ',palabra, ' ', respuesta[palabra][lang]);
    var err={};
    err.message= respuesta[palabra][lang];
    if ( respuesta[palabra]['code'] ) {
        err.code = respuesta[palabra]['code'];
    }

    return err;
}

module.exports = devuelve;
