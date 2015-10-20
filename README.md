#Documentacion ApiV1##

##Requerimientos
- Node.js
- NPM (Node Package Manger)
- MongoDB

##Obtener el codigo
~~~html
 git clone https://github.com/spidvmp/Nodepop
~~~

##Items
###Añadir usuario:
- Ruta: apiV1/adduser
- Parametros: login, password, name
- Metodo: Post

Desde la parte cliente se toman los datos de nombre, email y password para dar de alta a un nuevo usuario.
El email se usará como login, no pudiendo haber 2 emails iguales, pero si pueden haber nombres repetidos.
Esta basado en el email como clave principal y desde el cliente se habrá comprobado que es un email. El dato ya viene supuestamente correcto.

~~~html
 apiV1/adduser  {login:'a@a.com', password:'a', name:'Urculo'} 
~~~
####Respuesta  
Se devolvera un json con los sigientes datos:
ok: true o false si ha se ha dado de alta al usuario o no
message: texto del error, en el caso de que ok sea false
token: se envia el token, en el caso de que ok sea true
code: se puede enviar o no un codigo de error de HTTP


###Autentificar al usuario
- Ruta: apiV1/adduser/authenticate
- Metodo: Post

Desde la parte del cliente se envian el login y el password (el login es el email)
Se busca una entrada que coincida el login y el password. Si existe una sola entrada que coincida, se genera el token y se envia
Se devolvera un json con los siguientes datos:
ok: true o false si se ha podido comprobar el login y password
token: token generado, en el caso de que ok sea true
message: texto del error en el case de que ok sea false
code: se puede enviar o no un codigo de error de HTTP

###Añadir token push
- Ruta: apiV1/addUser/adduuid
- Parametros: token, login, password, tokenpush, so (opcional)
- Metodo: Put

Desde la parte del cliente se envia el token push recibido en la app y se envia a esta ruta para añadirlo a su configuracion de usuario
Se busca el cliente y so en la coleccion de tokens, si existe se actualiza, si no existe se crea
Si recibe el parametro de so, se pondra tal como viene, si no viene se intentara extraer de la cabecera.
Solo se aceptan ios y android, en caso de cualquier error se pondra android
ok: true o false si se puede dar la lista o no
message: texto del error en el case de que ok sea false
code: se puede enviar o no un codigo de error de HTTP

###Listado de articulos
- Ruta: apiV1/lista
- Parametros: token, tag, sale, art, price, start, limit, sort
- Metodo: Get

Se comprueba que este autentificado usando el token y se muestra un listado de los articulos que tenemos
Se devolvera un json con la lista de los articulos.
Los parametros se pasan por la query
ok: true o false si se puede dar la lista o no
data: listado de los articulos en caso de que ok sea true
message: texto del error en el case de que ok sea false
code: se puede enviar o no un codigo de error de HTTP

###Listado de Tags
- Ruta: apiV1/tags
- Parametros: no tiene
- Metodo: Get

listado de los Tags que estan definidos en la aplicacion
ok: true o false si se puede dar la lista o no
data: listado de los tags
