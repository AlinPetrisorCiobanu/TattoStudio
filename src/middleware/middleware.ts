import {Request,Response} from "express";


export const notFound = (req:Request,res:Response)=>{
    res.status(404);
    res.send(`🔍 - Lo siento no hemos encontrado -> ${req.originalUrl}- 🔎 `);
};