Realizacion de un nuevo proyecto donde he creado de una base de datos para un estudio de tatuajes :
    Se pueden registrar nuevos Usuarios
    Se pueden registrar nuevos Tatuadores (solo el admin puede modificar los roles para que puedan ser Tatuadores o Admins)
    Y por ultimo los admins que solo los puede crear el manejador de la base de datos.

En este proyecto se va impementar : 1. Typescript
                                    2. MongoDB
                                    3. NodeJs
                                    4. Json
                                    5. Librerias : a. dotenv (para ocultar variables)
                                                   b. express (para enrutar)
                                                   c. Mongoose (base de datos)
                                                   d. jsonwebtoken (para crear token de acceso)
                                                   e. bcrypt (para encriptar contraseñas)
                                                   f. passport
                                                   g. passport-jwt

toda la parte del backend esta totalmente funcional , faltarian pulir un par de cosillas...

todo el proyecto esta basado en MVC -> Modelo Vista Controlador

Tambien se ha utilizado dotenv para ocultar la url a la BBD , el secreto para el token , los loops del Hash entre otras cosas.

Requisitos : 

● Registro de usuarios.  Validar
● Login de usuarios.    Validar
● Perfil de usuario.    Validar
● Modificación de datos del perfil. Validar

● Creación de citas. Validar
● Editar citas. Validar
● Eliminación de citas Validar

● Ver todas las citas que tengo como cliente (solo las propias). Validar
● Ver todas las citas existentes conmigo (role tatuador). Validar
● Listar tatuadores Validar

● Ver todos los clientes registrados (super admin) (EXTRA) Validar
● Crear tatuadores (superadmin) (EXTRA) Validar
● Eliminar usuario del sistema(super admin ) (EXTRA) (solo esta implementado el borrado logico)
● Ver una cita en detalle (EXTRA). (Pending)
● El super_admin debe otorgar roles a los usuarios del sistema(EXTRA) Validar
● Validar la fecha de la cita(EXTRA) (Pending)
● Añadir tipos de intervención (tattoo / piercing ) a las citas (EXTRA) Validar

Endpoints Usuarios :

crear usuario : post http://localhost:2000/users
iniciar sesion: post http://localhost:2000/users/login
modificar usuario: put http://localhost:2000/customers
borrar usuario: delete http://localhost:2000/users
rectivar usuario : patch http://localhost:2000/users/:id
ver usuario : get http://localhost:2000/users (si es admin puede ver los datos de todos)
ver todos los tatuadores : get http://localhost:2000/users/artist (si es admin puede ver los datos de todos)

Endpoints Citas :

crear citas : http://localhost:2000/appointsment/:idArt (el id del tatuador que quieres..)
modificar citas : http://localhost:2000/appointsment/:idAppoints (el id de la cita a modificar)
borrar cita : http://localhost:2000/appointsment/:id
ver cita/s : http://localhost:2000/appointsment (dependiendo si es admin pueden ver todas las citas, si es tatuador puedo ver todas las citas conmigo.)