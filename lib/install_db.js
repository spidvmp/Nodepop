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
    ], (err, results) => {
        if (err) {
        console.error('Hubo un error: ', err);
        return process.exit(1);
    }
    return process.exit(0);
}
);

}

function initAnuncios(cb) {
    var Anuncio = mongoose.model('Anuncio');

    // elimino todos
    Anuncio.remove({}, ()=> {

        // aqui cargaríamos el json de anuncios (readFile, JSON.parse, iterar con Anuncio.save...)

    });

}

function initUsuarios(cb) {
    var Usuario = mongoose.model('Usuario');

    // elimino todos
    Usuario.remove({}, ()=> {

        // aqui cargaríamos al menos un usuario (Usuario.save)

    });
}

