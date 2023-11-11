import mongoose,{ConnectOptions} from "mongoose";
import CONFIDENCE from "./config/config";


mongoose.connect(`${CONFIDENCE.URLDB}`,{
    useNewUrlParser: false,
    useUnifiedTopology: false,
    } as ConnectOptions)
.then(()=>console.log('servidor arriba'))
.catch((e)=>console.log('algo ha fallado!' + e))

export = mongoose; 