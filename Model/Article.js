'use strict'

var mongoose = require('mongoose');
var config = require('../config');

//definimos el schemoa del articulo
var articleSchema = mongoose.Schema({
    /*
    name: nombre del articulo que se ofrece
    sale: verdadero si el articulo es para vender y false si el articulo se busca
    price: precio por lo que se quiere vender o por lo que se quiere comprar
    pic: nombre del archivo de la foto
    tags: posibles tag que puede tener que son: work, mobile, lifestyle, moto, puede tener mas de uno
     */
    name: String,
    sale: Boolean,
    price: Number,
    pic:  String,
    tags: [String]
});



//definimos el motodo estatico lista, muestra los articulos que hay para vender o comprar
articleSchema.statics.lista=function(criterios, elem, callBack){

    //hay que enviarlo paginado, asi que en elem indica los registros que hay que mostrar
    var query=Article.find(criterios).skip(elem).limit(config.elementsInPage);
    //console.log('elem=',elem, ' ',query);
    //lo ordeno primero por articulos que se venden y luego por nombre, ordeno por -1 porque el true o false lo toma como literal
    //y deberia ordenar por sale=true, la t en mayor que la f de false
    query.sort({ name:-1});

    //ejecuto y pongo el callback
    query.exec(function(err, rows){
        if ( err ) {
            return callBack(err);
        }

        return callBack(null,rows);
    });


};


var Article = mongoose.model('Article', articleSchema);

module.exports = Article;