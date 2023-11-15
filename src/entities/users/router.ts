import express from "express";
import {signUp,signIn,modifyCustom,deleteCustom,activateCustom,getAll} from "./controler";
import { authMiddleware } from "../../middleware/authorization";

const router = express.Router()

router.post('/', async (req,res,next)=>{
    try{
        res.json(await signUp(req.body))
    }
    catch(e){
        next(e)
    }
    return signUp
})
router.post('/login', async (req,res,next)=>{
    try{
        res.json(await signIn(req.body))
    }
    catch(e){
        next(e)
    }
    return signIn
})
router.put('/', authMiddleware ,async (req,res,next)=>{
    try{
        res.json(await modifyCustom(req.body))
    }
    catch(e){
        next(e)
    }
    return modifyCustom
})
router.delete('/', authMiddleware , async (req,res,next)=>{
    try{
        res.json(await deleteCustom(req.body))
    }
    catch(e){
        next(e)
    }
    return deleteCustom
})
router.patch('/', authMiddleware , async (req,res,next)=>{
    try{
        res.json(await activateCustom(req.body))
    }
    catch(e){
        next(e)
    }
    return activateCustom
})
router.get('/', authMiddleware , async (_req,res,next)=>{
    try{
        res.json(await getAll())
    }
    catch(e){
        next(e)
    }
    return activateCustom
})
export {router};