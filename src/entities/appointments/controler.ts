import { JwtPayload } from "../../types/types"
import Appoints,{ AppointsModel } from "./model"




//metodo para crear citas
export const create = async (appoints:AppointsModel , user : JwtPayload , artist :String) =>{
    const dateNow = new Date()
    appoints.customer = String(user.id) 
    appoints.artist = String(artist)
    
    const dateAppoints = new Date(`${appoints.date}T${appoints.startTime}:00`)
    const weekday = dateAppoints.getDay()
    const hourApp = dateAppoints.getHours()
    const endDate = hourApp+1
    console.log(endDate)
    //const appExist = await Appoints.find({hour : hourApp})
    
    console.log(hourApp)
    
    if(dateAppoints<=dateNow) return "no se puede escoger cita para el pasado"
    if(appoints.date > String(dateNow.getFullYear()+1)) return "citas hasta dentro de un maximo 1 año"
    if((appoints.startTime<'10:00' || appoints.startTime>'13:00') && (appoints.startTime<'15:00'|| appoints.startTime>'17:00')) return "la cita no puede empezar antes del horario 10am-14am-desc-15pm17pm"
    // if((appoints.endTime<'9:00' || appoints.endTime>'14:00') && (appoints.endTime<'16:00'|| appoints.endTime>'18:00')) return "una cita no puede acabar mas tarde del horario 10am-14am-desc-15pm18pm"
    if(weekday===0||weekday===6) return "los fines de semana no se trabaja"
    
    //console.log(appoints.startTime)
    //const appointsExist = Appoints.find({hour : appoints.hour})
    const newAppoints = new Appoints(appoints)
    try {
      // await newAppoints.save()
    } catch (err) {
        {console.log(err + ' error')}
    }
    return newAppoints
}
//metodo para modificar citas
export const modifyAppoints = async (_appoints:AppointsModel , _user : JwtPayload) =>{
   
}

//metodo para borrar citas
export const deleteAppoints = async (_appoints:AppointsModel , _user : JwtPayload) =>{
  
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