import { JwtPayload } from "../../types/types"
import Appoints, { AppointsModel } from "./model"




//metodo para crear citas
export const create = async (appoints: AppointsModel, user: JwtPayload, artist: String) => {
    if (user.rol === "artist") throw new Error("NOT_ALLOWED")
    if (appoints.intervention.toLowerCase() === "tatuaje") { appoints.intervention === "tattoo"}
    else if(appoints.intervention.toLowerCase() === "piercing") { appoints.intervention === "piercing" }
    else { throw new Error("INVALID_CREDENTIALS") }

    const dateNow = new Date()
    const dateStartAppoints = new Date(`${appoints.date} ${appoints.startTime}`)

    //saco diferentes tipos de datos
    const weekday = dateStartAppoints.getDay()
    const hourApp = dateStartAppoints.getHours()
    const endDate = Number(hourApp) + 1

    //reescribo los datos modificados
    appoints.customer = String(user.id)
    appoints.artist = String(artist)
    appoints.startTime = String(`${hourApp}:00`)
    appoints.endTime = String(`${endDate}:00`)

    //comprobacion de si hay una cita ya creada o si esta borrada!!!
    const appExist = await Appoints.findOne(
        {
            date: appoints.date,
            startTime: appoints.startTime,
            artist: appoints.artist,
            logicDelete: false,
        }
    )
    if (appExist != null) throw new Error("ALLREADY_EXIST")
    if (dateStartAppoints <= dateNow) throw new Error("BAD_DATE_REQUEST")

    if (appoints.date > `${new Date().getFullYear() + 1}${new Date().getMonth()}`) throw new Error("BAD_DATE_REQUEST")
    if ((appoints.startTime < '10:00' || appoints.startTime > '13:00') && (appoints.startTime < '15:00' || appoints.startTime > '17:00')) throw new Error("BAD_DATE_REQUEST")
    if (weekday === 0 || weekday === 6) throw new Error("BAD_DATE_REQUEST")

    const newAppoints = new Appoints(appoints)

    try {
        await newAppoints.save()
        return ("Cita Creada Con Exito")
    } catch {
        throw new Error("BAD_REQUEST")
    }
}

//metodo para modificar citas
export const modifyAppoints = async (appoints: AppointsModel, user: JwtPayload, id: String) => {
    if (!id) throw new Error("INVALID_CREDENTIALS")
    const myAppoint = await Appoints.findById(id)
    if (!myAppoint) throw new Error("ALLREADY_NOT_EXIST")
    if (appoints.intervention.toLowerCase() === "tatuaje") { appoints.intervention === "tattoo"}
    else if(appoints.intervention.toLowerCase() === "piercing") { appoints.intervention === "piercing" }
    else { throw new Error("INVALID_CREDENTIALS") }

    const dateNow = new Date()
    const dateStartAppoints = new Date(`${appoints.date} ${appoints.startTime}`)

    //saco diferentes tipos de datos
    const weekday = dateStartAppoints.getDay()
    const hourApp = dateStartAppoints.getHours()
    const endDate = Number(hourApp) + 1

    //reescribo los datos modificados
    appoints.startTime = String(`${hourApp}:00`)
    appoints.endTime = String(`${endDate}:00`)

    //comprobacion de si hay una cita existente o si esta borrada!!!
    const appExist = await Appoints.findOne({ date: appoints.date, startTime: appoints.startTime, logicDelete: false })

    if (appExist) throw new Error("ALLREADY_EXIST")
    if (dateStartAppoints <= dateNow) throw new Error("BAD_DATE_REQUEST")
    if (appoints.date > `${new Date().getFullYear() + 1}${new Date().getMonth()}`) throw new Error("BAD_DATE_REQUEST")
    if ((appoints.startTime < '10:00' || appoints.startTime > '13:00') && (appoints.startTime < '15:00' || appoints.startTime > '17:00')) throw new Error("BAD_DATE_REQUEST")
    if (weekday === 0 || weekday === 6) throw new Error("BAD_DATE_REQUEST")
    if (user.rol === "customer" || user.rol === "artist") {
        try {
            await Appoints.findByIdAndUpdate(id,
                {
                    date: appoints.date,
                    startTime: appoints.startTime,
                    endTime: appoints.endTime
                }, { new: true })
             return ("cita actualizada")
        } catch {
            throw new Error("BAD_REQUEST")
        }
    }
    else if (user.rol === "admin") {
        try {
            await Appoints.findByIdAndUpdate(id,
                {
                    customer: appoints.customer,
                    artist: appoints.artist,
                    date: appoints.date,
                    startTime: appoints.startTime,
                    endTime: appoints.endTime
                }, { new: true })
             return ("cita actualizada")
        } catch {
            throw new Error("BAD_REQUEST")
        }

    }
    return ("")
}

//metodo para borrar citas
export const deleteAppoints = async (user: JwtPayload, idApp: String) => {

    if (user.rol === "artist" || user.rol === "customer") {
        const userAppoints = await Appoints.findOne({ _id: idApp, customer: user.id, logicDelete: false })
        if (!userAppoints) throw new Error("ALLREADY_NOT_EXIST")
        try {
            const deleteApp = await Appoints.findByIdAndUpdate(idApp, { logicDelete: true }, { new: true });
            return deleteApp
        } catch (error) {
            return error
        }
    }
    else {
        const userAppoints = await Appoints.findOne({ _id: idApp, logicDelete: false })
        if (!userAppoints) throw new Error("ALLREADY_NOT_EXIST")
        try {
            const deleteApp = await Appoints.findByIdAndUpdate(idApp, { logicDelete: true }, { new: true });
            return deleteApp
        } catch (error) {
            return error
        }
    }
}

//metodo para imprimir citas
export const getAllAppoints = async (user: JwtPayload) => {
    if (user.rol === "customer") {
        const allAppointsCustomer = await Appoints.find({ customer: user.id }).populate('customer', 'name lastName tlf email').populate('artist', 'name lastName tlf email');
        return allAppointsCustomer
    }
    else if (user.rol === "artist") {
        const allAppointsArtist = await Appoints.find({ artist: user.id }).populate('customer', 'name lastName tlf email').populate('artist', 'name lastName tlf email');
        return allAppointsArtist
    }
    else {
        const allAppointsAdmin = await Appoints.find({}).populate('customer').populate('artist');
        return allAppointsAdmin
    }

}