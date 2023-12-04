import express from "express";
import CONFIDENCE from "./src/config/config";
import routerUser from "./src/entities/users/router";
import routerAppoints from "./src/entities/appointments/router";
import conexionBBD from "./src/database";
import cors from "cors";
import { errorHandler } from "./src/middleware/middleware";


//initalization
const app = express();
//setings
app.listen(CONFIDENCE.PORTDB);
//middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors())
app.use('/users',routerUser)
app.use('/appointsment',routerAppoints)

//instancio la base de datos
conexionBBD;

//errores://
app.use(errorHandler)

export default app