'use strict';

var db = require('./mongoDB');
var mongoose = require('mongoose');

db.once('open', function() {

    console.log("Inicializando las collecciones");
    var n=db.getName();
    console.log(n);
    db.getCollectionNames(function(err, names){
        if ( err ){
            console.log("error");
            return;
        }

        console.log(names);
    });

    console.log("Colecciones  creadas");
});


function initArticle(){
    console.log("Articilo");



}