import express from "express";
import {signUp,signIn,customers} from "./controlerCust";

const routerCustomers = express.Router()

routerCustomers.use('/signup', signUp)
routerCustomers.use('/customers', customers)
routerCustomers.use('/signin', signIn)


export {routerCustomers};