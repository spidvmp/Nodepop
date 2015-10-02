'use strict';


var ErrorCodes = (function(){
    var instance;
    function createInstance() {
        //var codes = {'saludo': {'es':'hola', 'en':'hello', 'code':401}, 'pepe':'manolo','si': 'no'};
        var codes;
        leeFicheroCodigos()
            .then(function(data){
            codes=data;
            console.log('se supone que ha leido ',codes);
        }).catch(function(err){
            console.log("Error lectura fichero de codigos de error.");
            codes={};
        })




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


function leeFicheroCodigos(){

    var fs= require('fs');
    return new Promise( function(resolve, reject){
        console.log('voy a leer');
        fs.readFile('./ErrorCodes.txt', function(err, data){
            console.log('leido err=',err,' data=',data);
            if ( err ){
                return reject(err);
            }

            //le ha leido
            try{
                //var pack= JSON.parse(data);
                console.log(' resolvwleido=',data, ' json=',pack);
                //tengo los datos
                //return resolve(Object.getOwnPropertyNames(pack));
                return resolve(pack);
            } catch (e) {
                return reject(e);
            }


        });

        console.log('termino de leer');
    });


};

module.exports=ErrorCodes;