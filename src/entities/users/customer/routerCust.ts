import express from "express";
import {signUp,signIn,modifyCustom,deleteCustom,activateCustom,getAll} from "./controlerCust";

const routerCustomers = express.Router()

routerCustomers.post('/signup', signUp)
routerCustomers.post('/signin', signIn)
routerCustomers.put('/modify', modifyCustom)
routerCustomers.delete('/delete', deleteCustom)
routerCustomers.patch('/activate', activateCustom)
routerCustomers.get('/', getAll)

export {routerCustomers};