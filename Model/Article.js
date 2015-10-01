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