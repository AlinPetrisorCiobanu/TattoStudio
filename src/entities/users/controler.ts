import User, { UserModel } from "./model";
import jwt from 'jsonwebtoken'
import CONFIDENCE from "../../config/config";
import bcrypt from "bcrypt"
import { JwtPayload } from "../../types/types";

//creacion del token
function createToken(user: UserModel){
    return jwt.sign({id: user.id, email: user.email, rol: user.rol},CONFIDENCE.SECRETDB);
    {expiresIn : '24h'}
}

//metodo para introducir nuevo usuario
export const signUp = async (user:UserModel) =>{
        const newUser = new User(user);
        const usuarioExistente = await User.find({email:user.email , idUser: user.idUser})
        if(usuarioExistente) return "lo siento el usuario ya existe"
        user.password = await bcrypt.hash(user.password,CONFIDENCE.LOOPDB)
        try{
            if(user.rol==="admin") return "lo siento no puedes elegir admin!"
            if(user.rol==="artist") return "lo siento no puedes elegir artist!"
            await newUser.save()
        }
        catch(err) {console.log(err + ' error')};
        return newUser     
}

//metodo para iniciar sesion
        export const signIn = async (user:UserModel)=>{
        const userExist = await User.findOne({email:user.email});
        if(!userExist) return "lo siento el email no existe"
        if(userExist.borradoLogico===true) return "lo siento su cuenta ha sido dada de baja"
        const isMatch = await userExist!.comparedPass(user.password)
        if(!isMatch) return "lo siento la contraseña no es valida"
        if(isMatch){
            return ({token : createToken(userExist!)})
        }
        return "error algo ha ido muy mal en inicio de sesion"
}

//metodo para modificar al cliente seleccionado
export const modifyCustom = async (user:JwtPayload , id:string , datosUsuario : UserModel) =>{
    if(user.rol==="admin"){
        const userId = await User.findById(id)
        if(!userId)return console.log('usuario no encontrado')
        try {
            const pass = await bcrypt.hash(datosUsuario.password,CONFIDENCE.LOOPDB)
            const updatedUser = await User.findByIdAndUpdate(id, {  name:datosUsuario.name,
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
        const userId = await User.findById(user.id)
        if(!userId)return console.log('datos no encontrado')
        try {
            const pass = await bcrypt.hash(datosUsuario.password,CONFIDENCE.LOOPDB)
            const updatedUser = await User.findByIdAndUpdate(user.id, { name: datosUsuario.name,
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
        const deleteUser = await User.findByIdAndUpdate(user.id, { borradoLogico: true}, { new: true });
        return deleteUser
   } catch (error) {
        return error
   }
}

//metodo para reactivar cliente
export const activateCustom = async (user:JwtPayload,userId : String) =>{
    if(user.rol==="admin"||user.rol==="artist"){
         try {
        const activateUser = await User.findByIdAndUpdate(userId, { borradoLogico: false}, { new: true });
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
           return await User.find({});
        }
        else{
            return await User.findById(user.id)
        }
}