import express from "express";
import {getAll,create,modifyAppoints,deleteAppoints} from "./controler";
import { authMiddleware } from "../../middleware/authorization";

const router = express.Router()
router.post('/', async (req,res,next)=>{
    try{
        res.json(await create(req.body))
    }
    catch(e){
        next(e)
    }
    return create
})
router.put('/', authMiddleware ,async (req,res,next)=>{
    try{
        res.json(await modifyAppoints(req.body))
    }
    catch(e){
        next(e)
    }
    return modifyAppoints
})
router.delete('/', authMiddleware , async (req,res,next)=>{
    try{
        res.json(await deleteAppoints(req.body))
    }
    catch(e){
        next(e)
    }
    return deleteAppoints
})
router.get('/', authMiddleware , async (_req,res,next)=>{
    try{
        res.json(await getAll())
    }
    catch(e){
        next(e)
    }
    return getAll
})
export {router};