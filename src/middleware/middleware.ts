import {Request,Response} from "express";


const notFound = (req:Request,res:Response)=>{
    res.status(404);
    res.send(`🔍 - Lo siento no hemos encontrado -> ${req.originalUrl}- 🔎 `);
};
export default notFound