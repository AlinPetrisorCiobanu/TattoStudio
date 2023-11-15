import Customer, { UserModel } from "./model";
import jwt from 'jsonwebtoken'
import CONFIDENCE from "../../config/config";
import User from "./model";
import bcrypt from "bcrypt"
import { JwtPayload } from "../../types/types";

//creacion del token
function createToken(user: UserModel){
    return jwt.sign({id: user.id, email: user.email, rol: user.rol },CONFIDENCE.SECRETDB);
    {expiresIn : '24h'}
}

//metodo para introducir nuevo usuario
export const signUp = async (user:UserModel) =>{
    const newUser = new User(user);
    user.password = await bcrypt.hash(user.password,CONFIDENCE.LOOPDB)
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
            return ({token : createToken(userExist!)})
        }
        return console.log('la contraseña o el email estan mal')
}

//metodo para modificar al cliente seleccionado
export const modifyCustom = async (user:JwtPayload , id:string , datosUsuario : UserModel) =>{
    if(user.rol==="admin"){
        const userId = await Customer.findById(id)
        if(!userId)return console.log('usuario no encontrado')
        try {
            const pass = await bcrypt.hash(datosUsuario.password,CONFIDENCE.LOOPDB)
            const updatedUser = await Customer.findByIdAndUpdate(id, {  name:datosUsuario.name,
                                                                        lastName: datosUsuario.lastName,
                                                                        idUser: datosUsuario.idUser,
                                                                        birthday: datosUsuario.birthday,
                                                                        email: datosUsuario.email,
                                                                        password: pass,
                                                                        rol: datosUsuario.rol
                                                                    }, { new: true });
            return updatedUser
        } catch (error) {
            return error
        }
    }
    else{
        const userId = await Customer.findById(user.id)
        if(!userId)return console.log('datos no encontrado')
        try {
            const pass = await bcrypt.hash(datosUsuario.password,CONFIDENCE.LOOPDB)
            const updatedUser = await Customer.findByIdAndUpdate(user.id, { name: datosUsuario.name,
                                                                            lastName: datosUsuario.lastName,
                                                                            password: pass
                                                                          }, { new: true });
            return updatedUser
        } catch (error) {
            return error
        }
    }
}

//metodo para borrar al cliente seleccionado
export const deleteCustom = async (user:JwtPayload) =>{
   try {
        const deleteUser = await Customer.findByIdAndUpdate(user.id, { borradoLogico: true}, { new: true });
        return deleteUser
   } catch (error) {
        return error
   }
}

//metodo para reactivar cliente
export const activateCustom = async (user:JwtPayload,userId : String) =>{
    if(user.rol==="admin"||user.rol==="artist"){
         try {
        const activateUser = await Customer.findByIdAndUpdate(userId, { borradoLogico: false}, { new: true });
        return activateUser
        } catch (error) {
        return console.log(`ha habido un error ${error}`)
        }    
  }
  else{
    return console.log("lo siento no tienes permiso para acceder")
    }
}

//metodo para imprimir todos los customers
export const getAll = async (user:JwtPayload) =>{
        if(user.rol==="admin"){
           return await Customer.find({});
        }
        else{
            return await Customer.findById(user.id)
        }
}