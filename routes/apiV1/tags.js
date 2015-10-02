'use strict';
var express = require('express');
var router = express.Router();

//lista de tags en un array
var tags=['Work','Lifestyle','Mobile','Motor'];

router.get('/',function(req,res){

    var a=tags.toString();
    return res.json({ok :true, data:a});
});



module.exports = router;