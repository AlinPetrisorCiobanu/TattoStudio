import express from "express";
import CONFIDENCE from "./src/config/config";
import notFound from "./src/middleware/middleware";
import routerUser from "./src/entities/users/router";
import routerAppoints from "./src/entities/appointments/router";
import conexionBBD from "./src/database";

//initalization
const app = express();
//setings
app.listen(CONFIDENCE.PORTDB);
//middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use('/users',routerUser)
app.use('/appointsment',routerAppoints)

//instancio la base de datos
conexionBBD;

//errores://
// app.use(errorHandler)
app.use(notFound)

export default app