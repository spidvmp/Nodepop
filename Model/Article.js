'use strict'

var mongoose = require('mongoose');

//definimos el schemoa del articulo
var articleSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: Number,
    pic: {data: Buffer, contentType: String}
    tags: String
});


/*cuando vaya a guardar la foto
var avatar = {
    data: req.body.data.image, // see below
    contentType:'image/png'
}
    */

//definimos el motodo estatico lista
articleSchema.statics.lista=function(creiterios, callBack){
    //hay que enviarlo paginado, asi que en los criterios hay que mostrar la pagina a mostrar
    var query=Article.find(criterios);

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