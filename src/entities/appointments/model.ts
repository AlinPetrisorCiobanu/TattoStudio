import {model,Schema,Document} from "../../database";
export interface AppointsModel extends Document {
    name : string , 
    
}
export const appointsSchema = new Schema({
    name : {
        type : String,
        require : true,
        minlength: 2,
        maxlength: 15
        },
    nameCustomer : {
        type : String,
        require : true,
        minlength: 2,
        maxlength: 15
        },  
    nameArtist : {
        type : String,
        require : true,
        minlength: 2,
        maxlength: 15
        },
    date : {
        type : String,
        require : true,
        minlength: 2,
        maxlength: 15
        },
    studio : {
        type : String,
        require : true,
        minlength: 2,
        maxlength: 15
        },
    borradoLogico : {
        type : Boolean,
        default:false,
        }
},{versionkey:true,timestamps:true});


const Appointsment = model<AppointsModel>('Appointsment',appointsSchema);

export default Appointsment;