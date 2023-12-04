import {model,Schema,Document} from "mongoose";
export interface AppointsModel extends Document {
    customer: string;
    artist: string;
    date: string;
    startTime: string;
    endTime: string;
    intervention: string;
    logicDelete: boolean;
    
}
export const appointsSchema = new Schema({
    customer : {
        type : String,
        ref:"Users"
        },  
    artist:{
        type : String,
        ref : "Users"
        },
    date : {
        type : String,
        require : true,
        },
    startTime : {
        type : String,
        require : true,
        },
    endTime : {
        type : String,
        require : true,
        },
    intervention : {
        type : String,
        require : true,
        default: "tattoo"
        },
    logicDelete : {
        type : Boolean,
        default:false,
        }
},{versionkey:true,timestamps:true});


const Appoints = model<AppointsModel>('Appointsment',appointsSchema);

export default Appoints;