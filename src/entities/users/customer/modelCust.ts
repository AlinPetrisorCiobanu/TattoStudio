import CONFIDENCE from "../../../config/config";
import {model,Schema,Document} from "../../../database";
import bcrypt from 'bcrypt'
export interface CustomerModel extends Document {
    name : string , 
    lastName : string ,
    idPers : string,
    email : string,
    password : string ,
    comparedPass:(candidatePassword: string)=>Promise<Boolean> 
}
export const customerSchema = new Schema({
    name : {
        type : String,
        require : true,
        minlength: 2,
        maxlength: 15
        },
    lastName: {
        type : String,
        require : true,
        minlength: 2,
        maxlength: 30
        },
    idCustomer: {
        type : String,
        require : true,
        unique : true
        },
    birthday: {
        type : String,
        require : true
        },
    email: {
        type : String,
        require : true,
        minlength: 6,
        maxlength: 100
        },
    password:{
        type:String,
        require:true,
        minlength: 2,
        maxlength: 30
    },
    borradoLogico:{
        type:Boolean,
        default : false
    }
},{versionkey:true,timestamps:true});

customerSchema.pre<CustomerModel>('save',async function (next) {
    const custom = this;
        if(!custom.isModified('password'))return next();
       const hash = await bcrypt.hash(custom.password, CONFIDENCE.LOOPDB);
       custom.password = hash;
       next();
});
customerSchema.methods.comparedPass = async function (password:string):Promise<Boolean> {
  return await bcrypt.compare(password, this.password)
}

const Customer = model<CustomerModel>('Customer',customerSchema);

export default Customer;