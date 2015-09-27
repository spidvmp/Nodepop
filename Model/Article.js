'use strict'

var mongoose = require('mongoose');

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
    tags: Object
});



//definimos el motodo estatico lista, muestra los articulos que hay para vender o comprar
articleSchema.statics.lista=function(criterios, callBack){
    //hay que enviarlo paginado, asi que en los criterios hay que mostrar la pagina a mostrar
    var query=Article.find(criterios);
    //lo ordeno primero por articulos que se venden y luego por nombre
    query.sort({sale:1, name:-1});

    //ejecuto y pongo el callback
    query.exec(function(err, rows){
        if ( err ) {
            return callBack(err);
        }
console.log("Resultado:", rows);
        return callBack(null,rows);
    });


};





var Article = mongoose.model('Article', articleSchema);

module.exports = Article;