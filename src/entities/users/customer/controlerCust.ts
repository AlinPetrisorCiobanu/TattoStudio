import express,{Request,Response} from "express";
import Customer, { CustomerModel } from "./modelCust";
import jwt from 'jsonwebtoken'
import CONFIDENCE from "../../../config/config";
export const router = express();



//metodo para introducir nuevo cliente
export const signUp = async (req:Request,res:Response) =>{
    if (!req.body.name || !req.body.lastName) return res.status(400).json({ msg: 'Por favor introduce tu nombre y apellidos' });
    if (!req.body.idCustomer || !req.body.birthday) return res.status(400).json({ msg: 'Por favor introduce tu DNI y tu fecha de nacimiento' });
    if (!req.body.email || !req.body.password) return res.status(400).json({ msg: 'Por favor introduce tu email y contraseña' });
    const customerExist = await Customer.findOne({email:req.body.email});
    if (customerExist) return res.status(400).json({ msg: 'El Usuario ya existe' });
    const newCustomer = new Customer(req.body);
    try{
        await newCustomer.save()
        return res.status(201).json(newCustomer)
    }
    catch(err) {return res.status(500).json({ msg: err +' Error al registrar el usuario' })};
}

//metodo para iniciar sesion
export const signIn = async (req:Request,res:Response)=>{
    if(!req.body.email || !req.body.password)return res.status(400).json({msg:'Por favor introduce tu email y tu contraseña'})
    const customerExist = await Customer.findOne({email:req.body.email});
    if(!customerExist)return res.status(400).json({msg:'El Usuario no existe'})
    const isMatch = await customerExist.comparedPass(req.body.password)
    if(isMatch){
        return res.status(200).json({token : createToken(customerExist)})
    }
    return res.status(400).json({msg: 'El email o la contraseña son incorectas'})
};

//creacion del token
function createToken(user: CustomerModel): string {
    return jwt.sign({ id: user.id, email: user.email }, `${CONFIDENCE.SECRETDB}`);
    expiresIn : '24h'
};

//metodo para imprimir todos los clientes
export const customers = async (req:Request,res:Response) =>{
    const customerId = await Customer.findById(req.body.id)
    return res.status(201).json(customerId);
    // const allCustomers = await customer.find({});
    // return res.status(200).json(allCustomers);
}