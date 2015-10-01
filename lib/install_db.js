'use strict';

var db = require('./models/db');
var mongoose = require('mongoose');
var readLine = require('readline');
var async = require('async');

db.once('open', function() {

    var rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Are you sure you want to empty DB? (no) ', function(answer) {
        rl.close();
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
        initAnuncios,
        initUsuarios
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
    var Anuncio = mongoose.model('Article');

    // elimino todos
    Anuncio.remove({}, function (err, borrado) {

        if ( err ){
            console.log('Error al borrar los anuncios');
            return process.exit(1);
        }
        var a=new Article;
        a.nombre='bici';
        a.sale=true;
        a.price=300;
        a.pic='bici.jpg';
        a.tag={t1:'lifeStyle'};

        a.save(function(err, creado){
            if ( err ){
                console.log("Articulo no creado");
                return;
            }
        });

    });

}

function initUsuarios(cb) {
    var User = mongoose.model('User');

    //llamo al modelo de usuario
    var User = require('../Model/User');
    // elimino todos
    User.remove({}, function(err, borrado) {
        if ( err ){
            console.error('Error al borrar los usuarios');
            return process.exit(1);
        }

        //genero un usuario nuevo
        var agt = new User();
        agt.nombre='Manolo';
        agt.login='m@a.com';
        agt.password='lolo';
        agt.save( function(err, creado) {
            if (err) {
                return res.json({ok: false});
            }
            //se lo pasamos el usuario
            res.json({ok:true});

        });

    });
}

