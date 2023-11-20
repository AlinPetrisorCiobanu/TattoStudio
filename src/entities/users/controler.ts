import User ,{ UserModel }from "./model";
import jwt from 'jsonwebtoken'
import CONFIDENCE from "../../config/config";
import bcrypt from 'bcrypt'
import { JwtPayload } from "../../types/types";
import {validateEmail, validatePassword } from "../../utils/validator";


//creacion del token
function createToken(user: UserModel) {
    return jwt.sign({ id: user.id, email: user.email, rol: user.rol }, CONFIDENCE.SECRETDB);
    { expiresIn: '24h' }
}

//metodo para introducir nuevo usuario
export const signUp = async (user: UserModel) => {
    if (!user.name || !user.lastName || !user.idUser || !user.tlf || !user.birthday || !user.email || !user.password) return "debe introducir todos los campos"
    
    const idUser = await User.findOne({ idUser: user.idUser })
    if (idUser) {
        throw new Error("lo siento este dni ya existe")
    }
    const phoneExist = await User.findOne({ tlf: user.tlf })
    if (phoneExist) return "lo siento este numero de telefono ya existe"
    
    if ((user.tlf.toString().length!=9)) return "el numero de telefono tiene 9 numeros"
    if ((new Date().getFullYear() - user.birthday) < 18) return "lo siento tienes que ser mayor de edad!"

    if (user.birthday.toString()) return "la fecha de nacimiento esta mal!"
    if (!validateEmail(user.email)) return "el email esta mal"
    if (!validatePassword(user.password)) return "la contraseña esta mal!"
    
    const newUser = new User(user);
    
    const userExist = await User.findOne({ email: user.email })
    if (userExist) return "lo siento el usuario ya existe"
    
    
    try {
        user.password = await bcrypt.hash(user.password, CONFIDENCE.LOOPDB)
        await newUser.save()
    }
    catch (err) {
         console.log(err + ' error') 
        };
    return newUser
}

//metodo para iniciar sesion
export const signIn = async (user: UserModel) => {
    
    const userExist = await User.findOne({ email: user.email });
    if (!userExist) return "lo siento el email no existe"
    if (userExist.borradoLogico === true) return "lo siento su cuenta ha sido dada de baja"

    const isMatch = await userExist!.comparedPass(user.password)
    if (!isMatch) return "lo siento la contraseña no es valida"

    try {
        return ({ token: createToken(userExist!) })
    }
    catch{
        return "error algo ha ido muy mal en inicio de sesion"
    }
    
}

//metodo para modificar al cliente seleccionado
export const modifyCustom = async (user: JwtPayload, id: string, datosUsuario: UserModel) => {
    if (user.rol === "admin") {
        const userId = await User.findById(id)
        if (!userId) return console.log('usuario no encontrado')
        try {
            const pass = await bcrypt.hash(datosUsuario.password, CONFIDENCE.LOOPDB)
            const updatedUser = await User.findByIdAndUpdate(id,
                {
                    name: datosUsuario.name,
                    lastName: datosUsuario.lastName,
                    idUser: datosUsuario.idUser,
                    tlf: datosUsuario.tlf,
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
//si no es admin -->
    else {
        const userId = await User.findById(user.id)
        if (!userId) return console.log('datos no encontrado')
        if (!validatePassword(datosUsuario.password)) return "la contraseña esta mal!"
        try {
            const pass = await bcrypt.hash(datosUsuario.password, CONFIDENCE.LOOPDB)
            const updatedUser = await User.findByIdAndUpdate(user.id, {
                name: datosUsuario.name,
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
export const deleteCustom = async (user: JwtPayload) => {
    try {
        const deleteUser = await User.findByIdAndUpdate(user.id, { borradoLogico: true }, { new: true });
        return deleteUser
    } catch (error) {
        return error
    }
}

//metodo para reactivar cliente
export const activateCustom = async (user: JwtPayload, userId: String) => {
    if (user.rol === "admin" || user.rol === "artist") {
        try {
            const activateUser = await User.findByIdAndUpdate(userId, { borradoLogico: false }, { new: true });
            return activateUser
        } catch (error) {
            return console.log(`ha habido un error ${error}`)
        }
    }
    else {
        return console.log("lo siento no tienes permiso para acceder")
    }
}

//metodo para imprimir todos los customers
export const getAll = async (user: JwtPayload) => {
    if (user.rol === "admin") {
        return await User.find({});
    }
    else {
        return await User.findById(user.id)
    }
}
export const getAllArtist = async (user: JwtPayload) => {
    if (user.rol === "admin") {
        return await User.find({ rol: "artist" });
    }
    else {
        return await User.findById(user.id)
    }
}