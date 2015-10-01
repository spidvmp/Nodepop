'use strict';

var db = require('./mongoDB');
var mongoose = require('mongoose');
var readLine = require('readline');
var async = require('async');

//db.once('open', function() {
function initDB () {

    var rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Are you sure you want to empty DB? (no) ', function (answer) {
        rl.close();
        if (answer.toLowerCase() === 'yes') {
            runInstallScript();
        } else {
            console.log('DB install aborted!');
            return process.exit(0);
        }

    });
}

initDB();
//});

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

        a.name='boli';
        a.sale=true;
        a.price=3;
        a.pic='boli.jpg';
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

