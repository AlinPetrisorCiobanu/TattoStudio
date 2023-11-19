import { JwtPayload } from "../../types/types"
import Appoints,{ AppointsModel } from "./model"




//metodo para crear citas
export const create = async (appoints:AppointsModel , user : JwtPayload , artist :String) =>{
    if(user.rol==="artist")return "un tatuador no puede crear citas!" 
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
    appoints.endTime = String( `${endDate}:00`)

        //comprobacion de si hay una cita ya creada o si esta borrada!!!
    const appExist = await Appoints.find({date: appoints.date ,startTime : appoints.startTime , logicDelete : false})

    if(appExist[0])return "lo siento ya hay una cita con este horario!"
    if(dateStartAppoints<=dateNow) return "no se puede escoger cita para el pasado"

    if(appoints.date > `${new Date().getFullYear()+1}${new Date().getMonth()}`) return "citas hasta dentro de un maximo 1 año"
    if((appoints.startTime<'10:00' || appoints.startTime>'13:00') && (appoints.startTime<'15:00'|| appoints.startTime>'17:00')) return "una cita no puede empezar o acabar fuera del horario establecido 10am-14am-desc-15pm18pm"
    if(weekday===0||weekday===6) return "los fines de semana no se trabaja"

    const newAppoints = new Appoints(appoints)

    try {
        await newAppoints.save()
    } catch (err) {
        {console.log(err)}
    }
    return newAppoints
}

//metodo para modificar citas
export const modifyAppoints = async (appoints:AppointsModel , user : JwtPayload , id: String) =>{
    if(!id)return "debe introducir un id de una cita"
    const myAppoint = await Appoints.findById(id)
    if(!myAppoint) return "la cita no existe"
    
    const dateNow = new Date()
    const dateStartAppoints = new Date(`${appoints.date} ${appoints.startTime}`)

        //saco diferentes tipos de datos
    const weekday = dateStartAppoints.getDay()
    const hourApp = dateStartAppoints.getHours()
    const endDate = Number(hourApp) + 1    
    
        //reescribo los datos modificados
    appoints.startTime = String(`${hourApp}:00`) 
    appoints.endTime = String( `${endDate}:00`)
    
        //comprobacion de si hay una cita existente o si esta borrada!!!
    const appExist = await Appoints.find({date: appoints.date ,startTime : appoints.startTime , logicDelete : false})

    if(appExist[0])return "lo siento ya hay una cita con este horario!"
    if(dateStartAppoints<=dateNow) return "no se puede escoger cita para el pasado"
    if(appoints.date > `${new Date().getFullYear()+1}${new Date().getMonth()}`) return "citas hasta dentro de un maximo 1 año"
    if((appoints.startTime<'10:00' || appoints.startTime>'13:00') && (appoints.startTime<'15:00'|| appoints.startTime>'17:00')) return "una cita no puede empezar o acabar fuera del horario establecido 10am-14am-desc-15pm18pm"
    if(weekday===0||weekday===6) return "los fines de semana no se trabaja"

    try {
        if(user.rol==="customer"||user.rol==="artist") {
        const updateAppoint = await Appoints.findByIdAndUpdate(id, {date:appoints.date,
                                                                    startTime:appoints.startTime
                                                                   },{new:true})
        return updateAppoint                                                       
        }
    } catch (error) {
        return error
    }
    try {
        if(user.rol==="admin"){
            const updateAppoint = await Appoints.findByIdAndUpdate(id, {customer:appoints.customer,
                                                                        artist:appoints.artist,
                                                                        date:appoints.date,
                                                                        startTime:appoints.startTime,
                                                                       },{new:true})
            return updateAppoint 
        }
    } catch (error) {
        return error
    }
   return
}

//metodo para borrar citas
export const deleteAppoints = async ( user : JwtPayload , idApp:String) =>{
    
    if( user.rol==="artist" ||user.rol==="customer"){
            const userAppoints = await Appoints.find({_id:idApp ,customer:user.id , logicDelete : false })
            if(!userAppoints[0]) return "el usuario no tiene citas"
        try {
            const deleteApp = await Appoints.findByIdAndUpdate(idApp, { logicDelete: true}, { new: true });
        return deleteApp
    } catch (error) {
        return error
    } 
    }
    else{
        const userAppoints = await Appoints.find({_id:idApp ,logicDelete : false })
            if(!userAppoints[0]) return "no se ha encontrado la citas"
        try {
            const deleteApp = await Appoints.findByIdAndUpdate(idApp, { logicDelete: true}, { new: true });
        return deleteApp
    } catch (error) {
        return error
    } 
    }
}    

//metodo para imprimir citas
export const getAll = async (user:JwtPayload) =>{
    if(user.rol === "customer"||user.rol==="artist"){
        const allAppoints = await Appoints.find({customer:user.id}).populate('customer','name lastName tlf email').populate('artist','name lastName tlf email');
        return allAppoints 
    }
    else{
        const allAppoints = await Appoints.find({}).populate('customer').populate('artist');
        return allAppoints 
    }
    
}