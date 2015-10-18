'use strict';

var db = require('./mongoDB');
var mongoose = require('mongoose');
var readLine = require('readline');
var async = require('async');

db.once('open', function() {

console.log("ARRANCAMOS");
    var rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });


    var col=db.collection('pr');
    col.find().toArray(function(err,it){
        console.log(it);
    });




    initAnuncios();


    rl.question('Are you sure you want to empty DB? (no) ', function (answer) {
        rl.close();
        console.log('ans=',answer);
        if (answer.toLowerCase() === 'yes') {
            runInstallScript();
        } else {
            console.log('DB install aborted!');
            return process.exit(0);
        }
    });
});

function runInstallScript() {

    async.series([
        initUsuarios,
        initAnuncios
    ], function (err, results)  {
        if (err) {
        console.error('Hubo un error: ', err);
        return process.exit(1);
    }
    return process.exit(0);
}
);

}

function initAnuncios(cb) {
    console.log("Comienzo Anuncios");
    var Article = require('../Model/Article');
    var Anuncio = mongoose.model('Article');

    // elimino todos
    Anuncio.remove({}, function (err, borrado) {

        if ( err ){
            console.log('Error al borrar los anuncios');
            return process.exit(1);
        }
        var a=new Article;
        a.name='bici';
        a.sale=true;
        a.price=300;
        a.pic='bici.jpg';
        a.tags=['lifeStyle'];

        a.save(function(err, creado){
            if ( err ){
                console.log("Articulo no creado");
                return;
            }
        });

        a.name='coche';
        a.sale=true;
        a.price=500;
        a.pic='coche.jpg';
        a.tags=['lifeStyle', 'work'];
            a.save(function(err, creado){
                if ( err ){
                    console.log("Articulo no creado");
                    return;
                }
            });
    });
    console.log("Termino el anuncio");
}

function initUsuarios(cb) {
    console.log("Comienzo el user");

    var User = require('../Model/User');
    var Usuario = mongoose.model('User');

    //llamo al modelo de usuario

    // elimino todos
    Usuario.remove({}, function(err, borrado) {
        if ( err ){
            console.error('Error al borrar los usuarios');
            return process.exit(1);
        }

        //genero un usuario nuevo
        var agt = new User();
        agt.name='Manolo';
        agt.login='m@a.com';
        agt.password='lolo';
        agt.save( function(err, creado) {
            if (err) {
                return res.json({ok: false});
            }


        });

    });
    console.log("termino user");
}

