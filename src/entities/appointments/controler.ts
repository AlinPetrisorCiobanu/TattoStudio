import Appointsment from "./model";
import { AppointsModel } from "./model";

//metodo para introducir nuevo usuario
export const create = async (appoints:AppointsModel) =>{
    const newAppoints = new Appointsment(appoints)
    try {
        await newAppoints.save()
    } catch (err) {
        {console.log(err + ' error')}
    }
    return newAppoints
}
//metodo para modificar al cliente seleccionado
export const modifyAppoints = async (_appoints:AppointsModel) =>{
   
}

//metodo para borrar al cliente seleccionado
export const deleteAppoints = async (_appoints:AppointsModel) =>{
  
}

//metodo para imprimir todos los customers
export const getAll = async () =>{
    const allAppoints = await Appointsment.find({});
    return allAppoints
}