import express from "express";
import CONFIDENCE from "./src/config/config";
import { notFound } from "./src/middleware/middleware";
import { router as routerUser}  from "./src/entities/users/router";
import { router as routerAppoints}  from "./src/entities/appointments/router";
import mongoose from "./src/database";

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
mongoose;

//errores://
app.use(notFound)
export default app