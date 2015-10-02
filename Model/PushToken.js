'use strict'

var mongoose = require('mongoose');
var config = require('../config');

var pushTokenSchema = mongoose.Schema({

    /*plataforma
    token
    usuario
     */
    so: {type:String, enum:['ios','android']},
    token: String,
    user: String
});

var PushToken = mongoose.model('PushToken', pushTokenSchema);
module.exports = PushToken;