import User ,{ UserModel }from "./model";
import jwt from 'jsonwebtoken'
import CONFIDENCE from "../../config/config";
import bcrypt from 'bcrypt'
import { JwtPayload } from "../../types/types";
import {validateEmail, validatePassword } from "../../utils/validator";


//creacion del token
function createToken(user: UserModel) {
    return jwt.sign({ id: user.id , email: user.email, rol: user.rol , name:user.name }, CONFIDENCE.SECRETDB);
    { expiresIn: '24h' }
}

//metodo para introducir nuevo usuario
export const signUp = async (user: UserModel) => {
    if (!user.name || !user.lastName || !user.idUser || !user.tlf || !user.birthday || !user.email || !user.password) throw new Error ('MISSING_DATA')
    
    const idUser = await User.findOne({ idUser: user.idUser })
    if (idUser) throw new Error ("INVALID_CREDENTIALS")
    
    const phoneExist = await User.findOne({ tlf: user.tlf })
    if (phoneExist) throw new Error ("INVALID_CREDENTIALS")
    if (!validateEmail(user.email)) throw new Error ("INVALID_CREDENTIALS")
    // if (!validatePassword(user.password)) throw new Error ("INVALID_CREDENTIALS")

    const newUser = new User(user);

    const userExist = await User.findOne({ email: user.email })
    if (userExist) throw new Error ("INVALID_CREDENTIALS")
    
    
    try {
        user.password = await bcrypt.hash(user.password, CONFIDENCE.LOOPDB)
        await newUser.save()
        return (`Gracias por Registrarte ${newUser.name} ${newUser.lastName} y bienvenido`)
    }
    catch {
        throw new Error ("BAD_REQUEST")
        };
    return newUser
}

//metodo para iniciar sesion
export const signIn = async (user: UserModel) => {
    
    const userExist = await User.findOne({ email: user.email });
    if (!userExist) throw new Error ("EMAIL_PASSWORD")
    if (userExist.borradoLogico === true) throw new Error ("DELETED")

    const isMatch = await userExist!.comparedPass(user.password)
    if (!isMatch) throw new Error ("EMAIL_PASSWORD")

    try {
        return ({ token: createToken(userExist!) })
    }
    catch{
        throw new Error ("BAD_REQUEST")
    }
    
}

//metodo para modificar al cliente seleccionado
export const modifyCustom = async (user: JwtPayload, id: string, datosUsuario: UserModel) => {
    if (user.rol === "admin") {
        const userId = await User.findById(id)
        if (!userId) throw new Error ("INVALID_CREDENTIALS")
        try {
            const pass = await bcrypt.hash(datosUsuario.password, CONFIDENCE.LOOPDB)
            if(datosUsuario.rol==="customer"){
                datosUsuario.rol="customer"
            }else{
                datosUsuario.rol="artist"
            }
            await User.findByIdAndUpdate(id,
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
            return (`datos de usuario actualizados`)
        } catch {
            throw new Error ("BAD_REQUEST")
        }
    }
//si no es admin -->
    else {
        const userId = await User.findById(user.id)
        if (!userId) throw new Error ("INVALID_CREDENTIALS")
        if (!validatePassword(datosUsuario.password)) throw new Error ("INVALID_CREDENTIALS")
        try {
            const pass = await bcrypt.hash(datosUsuario.password, CONFIDENCE.LOOPDB)
            await User.findByIdAndUpdate(user.id, {
                name: datosUsuario.name,
                lastName: datosUsuario.lastName,
                password: pass
            }, { new: true });
            return (`datos de usuario actualizados`)
        } catch{
            throw new Error ("BAD_REQUEST")
        }
    }
}



//metodo para borrar al cliente seleccionado
export const deleteCustom = async (user: JwtPayload , id:String) => {
    try {
        
        if(user.rol==="admin"){
            await User.findByIdAndUpdate(id, { borradoLogico: true }, { new: true }); 
            return (`Usuario borrado`)
        }else{
            await User.findByIdAndUpdate(user.id, { borradoLogico: true }, { new: true });
            return (`Usuario borrado , para reactivar la cuenta llama al numero +34 000 000 000`)
        }
        
    } catch{
        throw new Error ("BAD_REQUEST")
    }
}

//metodo para reactivar cliente
export const activateCustom = async (user: JwtPayload, userId: String , _dato:String) => {
    if (user.rol === "admin") {
        try {
            await User.findByIdAndUpdate(userId, { borradoLogico: false }, { new: true });
            return ("Usuario Reactivado")
        } catch {
            throw new Error ("BAD_REQUEST")
        }
    }
    else {
        throw new Error ("BAD_REQUEST")
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