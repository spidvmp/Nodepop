'use strict';
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../../Model/User');
var config = require('../../config');
var inter = require ('../../lib/Internacional');
var sha256 = require ('sha256');

/*
//middleware que comprueba cada peticion y verifica que el token que nos dan es valido, todo lo que llega pasa por aqui
router.use( function (req, res, next){

    //saco el token que viene en el body
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    //console.log("validate / con token ", token);

    //comprobamos si lo tenemos
    if ( token ){

        jwt.verify(token,config.secretToken, function(err, decoded){

            if (err) {

                return res.status(401).json(inter('NO_ACCESS'));

            }
            //guardo la respuesta para el uso en otros routes
            req.decoded = decoded;
            //esta autenticado, seguir
            next();

        });

    } else {

        return res.status(401).json(inter('NO_ACCESS'));

    }
});
*/

router.post('/authenticate', function(req,res){
    /* una vez que tenemos login y pass, se llama a /authenticate y por post se le envia el login y passwd.
     Se verica con la BD y si es correcto se genera el token, que se le devuelve a la app y que se usara a partir de ahora siempre
     cada peticion se comprueba el token con la funcion de arriba
     */

    //buscamos el login y passwd, no diferencio si encuentra el login y el pass es erroneo, si no coincide doy un solo
    // mensaje de error, asi no doy tantas pistas
    console.log('login=',req.body.login, ' password=', req.body.password);
    //sobre el modelo User hago una busqueda unica del login
    User.findOne({login: req.body.login}, function(err, user) {


        //User.userExist({login: req.body.login, password:req.body.password}, function(err, rows){

        if (err) {

            return res.json(inter('ERR_UNKNOW_USER'));

        }

        //compruebo si tengo el usuario
        if (!user) {
            return res.json(inter('ERR_UNKNOW_USER'));
        } else {

            //compruebo la contraseña. he de codificarla primero
            var clave = sha256(req.body.password);
            if (user.password != clave) {
                return res.json(inter('ERR_UNKNOW_USER'));
            } else {
                //encontramo el usuario con la misma passwd, generamos un token y lo devilvemos

                var token = jwt.sign({user: user}, config.secretToken, {expiresInMinutes: config.expiresInMinutes});

                //se lo pasamos el usuario
                return res.json({ok: true, token: token});

            }
        }
    });
        /*
         //he de comprbar si rows tiene elementos, si los tiene no se puede crear este usuario, estaria repetido
         if ( rows.length === 1) {

         //hemos encontrado el registro, generamos el token

         var token = jwt.sign(rows, config.secretToken, {expiresInMinutes:config.expiresInMinutes});

         //se lo pasamos el usuario
         res.json({ok:true, token:token});


         } else {

         if ( rows.length === 0 ) {

         //no encontro el login y pass
         return res.json(inter('ERR_UNKNOW_USER'));

         }

         //han habido mas de una respuesta, esto no deberia pasar, devuelvo error y ademas lo pongo en la consola
         console.log("Encontradas mas de una entrada en usuarios. User=",req.body.login," passwd=",req.body.password);
         return res.json(inter('ERR_UNKNOW_USER'));

         }

         });

         */

});

module.exports = router;