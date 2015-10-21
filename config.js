'use strict';

//defino distintas variables de configuracion que voy a usar a lo largo de la app
module.exports = {
    //palabra secreta usada para generar el token
    'secretToken': 'jfwneh72n8ohf8327nh',
    //conexion con MongoDB
    'mongoConex': 'mongodb://localhost:27017/nodepop',
    //tiempo de expiracion del token en minutos
    'expiresInMinutes': 120,
    //numero de articulos por pagina
    'elementsInPage': 6
};
