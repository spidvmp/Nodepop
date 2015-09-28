'use strict';
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

console.log('cargamos validate');
//comprobamos cada peticion que se hace, tiene que venir con el token
router.get('/', function (req, res, next){
    console.log("validate /");

    return res.status(401).json({ok:false, error:'Contraseña incorrecta'});
    next();
});

module.exports = router;