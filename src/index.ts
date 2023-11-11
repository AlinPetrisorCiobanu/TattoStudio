import app from "./app";
import mongoose from "./database";
//instancio el server
app.listen(app.get('port'));
//instancio la base de datos
mongoose;