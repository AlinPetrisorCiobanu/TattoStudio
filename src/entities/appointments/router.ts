import express from "express";
import {create,modifyAppoints,deleteAppoints, getAllAppoints} from "./controler";
import { validateToken } from "../../middleware/authorization";

const router = express.Router()
router.post('/:idArt', validateToken, async (req,res)=>{
    try{
        res.json(await create(req.body , req.user!,req.params.idArt))
    }
    catch(e){
        res.status(400).json({msg:"error "+e})
    }
})
router.put('/:idAppoint', validateToken, async (req,res,next)=>{
    try{
        res.json(await modifyAppoints(req.body , req.user! , req.params.idAppoint))
    }
    catch(e){
        next(e)
    }
})
router.delete('/:id', validateToken,  async (req,res,next)=>{
    try{
        res.json(await deleteAppoints(req.user!,req.params.id))
    }
    catch(e){
        next(e)
    }
})
router.get('/', validateToken,  async (req,res,next)=>{
    try{
        res.json(await getAllAppoints(req.user!))
    }
    catch(e){
        next(e)
    }
})
export default router 