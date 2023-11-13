import express from "express";
import CONFIDENCE from "./src/config/config";
import { notFound } from "./src/middleware/middleware";
import { router } from "./src/entities/users/router";



const session = require('express-session');

//initalization
const app = express();
//setings
app.set('port', CONFIDENCE.PORTDB);
//middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json());


//opciones de passport
app.use(session({
    secret: CONFIDENCE.SECRETDB,
    resave: false,
    saveUninitialized: false
}));
app.use('/users',router)




//routes
// app.get('/',(_req,res)=>{
//     res.send('todo guay')
// })



//errores://
app.use(notFound)
export default app
