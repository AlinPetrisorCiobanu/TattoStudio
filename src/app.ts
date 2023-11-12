import express from "express";
import CONFIDENCE from "./config/config";
import { notFound } from "./middleware/middleware";
import { routerCustomers } from "./entities/users/customer/routerCust";
import passport from "passport";
import jwtStrategy from './middleware/passport';
import specialRoutes from './routes/special.routes'
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
app.use('/customers',routerCustomers)
app.use(passport.initialize())
passport.use(jwtStrategy);


//routes
app.get('/',(_req,res)=>{
    res.send('todo guay')
})

app.use(specialRoutes)

//errores://
app.use(notFound)
export default app
