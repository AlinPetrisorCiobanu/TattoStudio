import express from "express";
import {signUp,signIn,modifyCustom,deleteCustom,activateCustom,getAll} from "./controlerCust";
import passport from "passport";

const routerCustomers = express.Router()

routerCustomers.post('/signup', signUp)
routerCustomers.post('/signin', signIn)
routerCustomers.put('/modify',passport.authenticate('jwt'), modifyCustom)
routerCustomers.delete('/delete',passport.authenticate('jwt'), deleteCustom)
routerCustomers.patch('/activate',passport.authenticate('jwt'), activateCustom)
routerCustomers.get('/',passport.authenticate('jwt'), getAll)

export {routerCustomers};

