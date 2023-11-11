import express from "express";
import CONFIDENCE from "./config/config";
import { notFound } from "./middleware/middleware";
import { routerCustomers } from "./entities/users/customer/roterCust";

//initalization
const app = express();
//setings
app.set('port', CONFIDENCE.PORTDB);
//middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use('/',routerCustomers)

//routes
app.get('/',(_req,res)=>{
    res.send('todo guay')
})
//errores://
app.use(notFound)
export default app
