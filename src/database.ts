import mongoose,{ConnectOptions} from "mongoose";
import CONFIDENCE from "./config/config";


mongoose.connect(`${CONFIDENCE.URLDB}`,{
    // useNewUrlParser: false,
    // useUnifiedTopology: false,
    } as ConnectOptions)
.then(()=>console.log('base de datos'))
.catch((e)=>console.log('algo ha fallado!' + e))

export = mongoose; 