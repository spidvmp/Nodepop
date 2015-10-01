'use strict';

var a={'saludo': {'es':'hola', 'en':'hello'}, 'pepe':'manolo','si': 'no'};

function devuelve(palabra, lang){



    console.log('ponen ',palabra, ' ', a[palabra][lang]);


}

module.exports = devuelve;
