'use strict';

var jwt = require('jsonwebtoken');
var config = require('../config');
var inter = require ('./Internacional');


module.exports = function () {

    return function (req, res, next){

        //saco el parametro del token por el metodo que pueda
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if ( token ) {
            //verifoco que el token es correcto y valido
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
            //no tengo token
            return res.status(401).json(inter('NO_ACCESS'));
        }

    };
};