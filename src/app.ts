import express from "express";
import CONFIDENCE from "./config/config";

//initalization
const app = express();
//setings
app.set('port', CONFIDENCE.PORTDB);
//middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json());
//routes
app.get('/',(_req,res)=>{
    res.send('todo guay')
})

export default app
