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
function createToken(custom: CustomerModel): string {
    return jwt.sign({ id: custom.id, email: custom.email }, `${CONFIDENCE.SECRETDB}`);
    expiresIn : '24h'
};

//metodo para modificar al cliente seleccionado
export const modifyCustom = async (req:Request,res:Response) =>{
    if(!req.body.id)return res.status(400).json({msg:'por favor introduce un id de usuario'})
    const customerId = await Customer.findById(req.body.id)
    if(!customerId)return res.status(404).json({msg:'Usuario no encontrado'})
        if(req.body.name === ""||req.body.lastname === ""||req.body.idCustomer === ""||req.body.birthday === "")return res.status(411).json({msg:'!!!campos!!! sin rellenar'})
    const birthday = req.body.birthday  
    if(req.body.birthday && typeof( birthday)  != "number")return res.status(411).json({msg:'!!!La fecha de nacimiento es un numero!!! '})
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.body.id, { name: req.body.name,lastName: req.body.lastName,idCustomer: req.body.idCustomer,birthday: req.body.birthday }, { new: true });
        return res.status(200).json(updatedCustomer);
    } catch (error) {
        return res.status(500).json({ msg: 'Error al modificar el usuario' });
    }
}

//metodo para borrar al cliente seleccionado
export const deleteCustom = async (req:Request,res:Response) =>{
    const customerId = await Customer.findById(req.body.id)
    if(!customerId) return res.status(404).json({msg: 'usuario no encontrado'})
   try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.body.id, { borradoLogico: true}, { new: true });
        return res.status(200).json(updatedCustomer);
   } catch (error) {
        return res.status(500).json({msg:'internal server error '+error})
   }
}

//metodo para reactivar cliente
export const activateCustom = async (req:Request,res:Response) =>{
    const customerId = await Customer.findById(req.body.id)
    if(!customerId) return res.status(404).json({msg: 'usuario no encontrado'})
   try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.body.id, { borradoLogico: false}, { new: true });
        return res.status(200).json(updatedCustomer);
   } catch (error) {
        return res.status(500).json({msg:'internal server error '+error})
   }
}


//metodo para imprimir todos los customers
export const getAll = async (_req:Request,res:Response) =>{

    const allCustomers = await Customer.find({});
    return res.status(200).json(allCustomers);
}