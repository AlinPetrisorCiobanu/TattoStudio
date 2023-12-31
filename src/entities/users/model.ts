import CONFIDENCE from "../../config/config";
import {model,Schema,Document} from "mongoose";
import bcrypt from 'bcrypt'
export interface UserModel extends Document {
    id : any,
    name : string , 
    lastName : string ,
    idUser : string,
    tlf : number,
    birthday : number,
    email : string,
    password : string ,
    comparedPass:(candidatePassword: string)=>Promise<Boolean>,
    borradoLogico:boolean,
    rol:string
}
export const userSchema = new Schema({
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
    idUser: {
        type : String,
        require : true,
        unique : true
        },
    tlf: {
        type : Number,
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
        },
    password:{
        type:String,
        require:true,
    },
    borradoLogico:{
        type:Boolean,
        default : false
    },
    rol:{
        type:String,
        default : "customer",
        enum : ["customer","artist","admin"]
    }
},{versionkey:true,timestamps:true});

userSchema.pre<UserModel>('save',async function (next) {
    const custom = this;
        if(!custom.isModified('password'))return next();
       const hash = await bcrypt.hash(custom.password, CONFIDENCE.LOOPDB);
       custom.password = hash;
       next();
});
userSchema.methods.comparedPass = async function (password:string):Promise<Boolean> {
  return await bcrypt.compare(password, this.password)
}

const User = model<UserModel>('Users',userSchema);

export default User;