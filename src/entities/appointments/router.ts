import express from "express";
import {getAll,create,modifyAppoints,deleteAppoints} from "./controler";
// import { validateToken } from "../../middleware/authorization";

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
router.put('/', async (req,res,next)=>{
    try{
        res.json(await modifyAppoints(req.body))
    }
    catch(e){
        next(e)
    }
    return modifyAppoints
})
router.delete('/',  async (req,res,next)=>{
    try{
        res.json(await deleteAppoints(req.body))
    }
    catch(e){
        next(e)
    }
    return deleteAppoints
})
router.get('/',  async (_req,res,next)=>{
    try{
        res.json(await getAll())
    }
    catch(e){
        next(e)
    }
    return getAll
})
export {router};