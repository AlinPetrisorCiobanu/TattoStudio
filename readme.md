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

