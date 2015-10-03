'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config');

var pushTokenSchema = mongoose.Schema({

    /*plataforma
    token
    usuario
     */
    so: {type:String, enum:['ios','android']},
    token: String,
    user: [{type: Schema.Types.ObjectId, ref:'User'}]
});

var PushToken = mongoose.model('PushToken', pushTokenSchema);
module.exports = PushToken;