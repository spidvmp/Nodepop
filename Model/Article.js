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

//genero el indice para buscar por nombre, precio y sale
articleSchema.index({ name: 1, sale: 1, price:1});


//definimos el motodo estatico lista, muestra los articulos que hay para vender o comprar
articleSchema.statics.lista=function(req, callBack){

    //trato los filtros
    var filters = {};

    if ( typeof req.query.sale !== 'undefined'){
        filters.sale = req.query.sale;
    }
    if ( typeof req.query.tags !== 'undefined'){
        filters.tags = req.query.tags;
    }
    if ( typeof req.query.name !== 'undefined'){
        filters.name = new RegExp('^'+ req.query.name, "i");;
    }
    if ( typeof req.query.price !== 'undefined'){
        //separo el precio a partir del -
        var p = req.query.price.split('-');
        if (p.length === 1){
            //precio exacto
            filters.price = p[0];

        } else if (p[0] && p[1]) {
            //tengo los 2 elementos, eso es que tenemos un mayor y un menor
            console.log("mayor menor");
            filters.price={'$gte': p[0], '$lte': p[1]};
        } else if ( p[0] ){
            //tengo solo el primer elemento, asi que mayor que
            filters.price={'$gte': p[0]};
        } else {
            //tengo segundo elemento, asi que menor que
            filters.price={'$lte': p[1]};
        }

    }

    //configuro los limites
    var start = parseInt(req.query.start) || 0;
    var limit = parseInt(req.query.limit) || config.elementsInPage;

    //hay que enviarlo paginado, asi que en elem indica los registros que hay que mostrar
    var query=Article.find(filters);
    query.skip(start);
    query.limit(limit);
    query.sort({ name:-1});
    //console.log('elem=',elem, ' ',query);


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