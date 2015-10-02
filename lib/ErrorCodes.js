'use strict';

var ErrorCodes = (function(){
    var instance;
    function createInstance() {
        var codes = {'saludo': {'es':'hola', 'en':'hello', 'code':401}, 'pepe':'manolo','si': 'no'};
        return codes;

    }

    return {
        codes: function (){
            if ( !instance ){
                instance=createInstance();
            }
            return instance;
        }
    }

})();

module.exports=ErrorCodes;