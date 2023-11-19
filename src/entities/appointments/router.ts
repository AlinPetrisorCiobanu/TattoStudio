import express from "express";
import {getAll,create,modifyAppoints,deleteAppoints} from "./controler";
import { validateToken } from "../../middleware/authorization";

const router = express.Router()
router.post('/:idArt', validateToken, async (req,res,next)=>{
    try{
        res.json(await create(req.body , req.user!,req.params.idArt))
    }
    catch(e){
        next(e)
    }
    return create
})
router.put('/:idAppoint', validateToken, async (req,res,next)=>{
    try{
        res.json(await modifyAppoints(req.body , req.user! , req.params.idAppoint))
    }
    catch(e){
        next(e)
    }
    return modifyAppoints
})
router.delete('/:id?', validateToken,  async (req,res,next)=>{
    try{
        res.json(await deleteAppoints(req.user!,req.params.id))
    }
    catch(e){
        next(e)
    }
    return deleteAppoints
})
router.get('/', validateToken,  async (req,res,next)=>{
    try{
        res.json(await getAll(req.user!))
    }
    catch(e){
        next(e)
    }
    return getAll
})
export {router};