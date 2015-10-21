#Documentacion ApiV1##

Actualmente instalada en ulpita.cloudapp.net ( 104.43.173.164 )  
Fichero estatico servido por nginx  
<http://ulpita.cloudapp.net/coche.jpg>

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
 apiV1/adduser  
 body:
 	{login:a@a.com, password:a, name:Urculo} 
~~~
####Respuesta  
Se devolvera un json con los sigientes datos:
- ok: true o false si ha se ha dado de alta al usuario o no
- message: texto del error, en el caso de que ok sea false
- token: se envia el token, en el caso de que ok sea true
- code: se puede enviar o no un codigo de error de HTTP

~~~html
{
  "ok": true,
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6IidhQGEuY29tJyIsInBhc3N3b3JkIjoiJ2EnIiwibmFtZSI6IidVcmN1bG8nIiwiaWF0IjoxNDQ1MzUzNTk3LCJleHAiOjE0NDUzNjA3OTd9.3LGhIW5mOLCfqXDKpl5aKP_Fo_eAddE8F6XFYahETZ0"
}
~~~

###Autentificar al usuario
- Ruta: apiV1/adduser/authenticate
- Parametros: login, password
- Metodo: Post

Desde la parte del cliente se envian el login y el password (el login es el email). Se busca una entrada que coincida el login y el password. Si existe una sola entrada que coincida, se genera el token y se envia

####Respuesta
Se devolvera un json similar al adduser con los siguientes datos:

- ok: true o false si se ha podido comprobar el login y password
- token: token generado, en el caso de que ok sea true 
- message: texto del error en el case de que ok sea false
- code: se puede enviar o no un codigo de error de HTTP

~~~html
{
  "ok": false,
  "error": {
    "message": "Usuario desconocido"
  }
}
~~~

###Añadir token push
- Ruta: apiV1/adduser/adduuid
- Parametros: token, login, password, tokenpush, SO (opcional)
- Metodo: Put

Desde la parte del cliente se envia el token push recibido en la app y se envia a esta ruta para añadirlo a su configuracion de usuario
Se busca el cliente y so en la coleccion de tokens, si existe se actualiza, si no existe se crea
Si recibe el parametro de so, se pondra tal como viene, si no viene se intentara extraer de la cabecera.

####Respuesta
Solo se aceptan ios y android, en caso de cualquier error se pondra android
- ok: true o false si se puede dar la lista o no
- message: texto del error en el case de que ok sea false
- code: se puede enviar o no un codigo de error de HTTP

###Listado de articulos
- Ruta: apiV1/lista
- Parametros: token, tag, sale, art, price, start, limit, sort
- Metodo: Get

Se comprueba que este autentificado usando el token y se muestra un listado de los articulos que tenemos
Se devolvera un json con la lista de los articulos.
Los parametros se pasan por la query

####Respuesta
- ok: true o false si se puede dar la lista o no
- data: listado de los articulos en caso de que ok sea true
- message: texto del error en el case de que ok sea false
- code: se puede enviar o no un codigo de error de HTTP

~~~html
{
  "ok": true,
  "data": [
    {
      "_id": "5623cca1a16135900783ab01",
      "pic": "coche.jpg",
      "price": 500,
      "sale": true,
      "name": "coche",
      "__v": 0,
      "tags": [
        "lifeStyle",
        "work"
      ]
    }
  ]
}
~~~

###Listado de Tags
- Ruta: apiV1/tags
- Parametros: no tiene
- Metodo: Get


Listado de los Tags que estan definidos en la aplicacion

####Respuesta
- ok: true o false si se puede dar la lista o no
- data: listado de los tags

~~~~html
{"ok":true,"data":["Work","Lifestyle","Mobile","Motor"]}