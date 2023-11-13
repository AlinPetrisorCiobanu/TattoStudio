import Customer, { UserModel } from "./model";
import jwt from 'jsonwebtoken'
import CONFIDENCE from "../../config/config";
import User from "./model";
import bcrypt from "bcrypt"

//creacion del token
function createToken(user: UserModel): string {
    return jwt.sign({ id: user.id, email: user.email,rol:user.rol }, `${CONFIDENCE.SECRETDB}`);
    expiresIn : '24h'
}

//metodo para introducir nuevo usuario
export const signUp = async (user:UserModel) =>{
    const newUser = new User(user);
    user.password = await bcrypt.hash(user.password,4)
    try{
        await newUser.save()
    }
    catch(err) {console.log(err + ' error')};
    return newUser
}

//metodo para iniciar sesion
        export const signIn = async (user:UserModel)=>{
        const userExist = await Customer.findOne({email:user.email});
        const isMatch = await userExist!.comparedPass(user.password)
        if(isMatch){
            return ({token : createToken(user)})
        }
        return console.log('ha ido mal')
}

//metodo para modificar al cliente seleccionado
export const modifyCustom = async (user:UserModel) =>{
    const userId = await Customer.findById(user.id)
    if(!userId)return console.log('usuario no encontrado')
    try {
        const updatedUser = await Customer.findByIdAndUpdate(user.id, { name: user.name,lastName: user.lastName,idUser: user.idUser,birthday: user.birthday}, { new: true });
        return updatedUser
    } catch (error) {
        return error
    }
}

//metodo para borrar al cliente seleccionado
export const deleteCustom = async (user:UserModel) =>{
   try {
        const deleteUser = await Customer.findByIdAndUpdate(user.id, { borradoLogico: true}, { new: true });
        return deleteUser
   } catch (error) {
        return error
   }
}

//metodo para reactivar cliente
export const activateCustom = async (user:UserModel) =>{
   try {
        const activateUser = await Customer.findByIdAndUpdate(user.id, { borradoLogico: false}, { new: true });
        return activateUser
   } catch (error) {
        return error
   }
}

//metodo para imprimir todos los customers
export const getAll = async () =>{

    const allCustomers = await Customer.find({});
    return allCustomers
}