import {model,Schema,Document} from "../../database";
export interface AppointsModel extends Document {
    customer: string;
    artist: string;
    date: string;
    startTime: string;
    endTime: string;
    studio: string;
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
    studio : {
        type : String,
        require : true,
        },
    logicDelete : {
        type : Boolean,
        default:false,
        }
},{versionkey:true,timestamps:true});


const Appoints = model<AppointsModel>('Appointsment',appointsSchema);

export default Appoints;