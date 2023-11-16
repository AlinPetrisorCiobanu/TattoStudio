import express from "express";
import {signUp,signIn,modifyCustom,deleteCustom,activateCustom,getAll} from "./controler";
import { validateToken } from "../../middleware/authorization";


const router = express.Router()

router.post('/',async (req,res,next)=>{
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

router.put('/:id?', validateToken ,async (req,res,next)=>{
    try{
        res.json(await modifyCustom(req.user! , req.params.id , req.body))
    }
    catch(e){
        next(e)
    }
    return modifyCustom
})

router.delete('/', validateToken , async (req,res,next)=>{
    try{
        res.json(await deleteCustom(req.user!))
    }
    catch(e){
        next(e)
    }
    return deleteCustom
})

router.patch('/:id', validateToken , async (req,res,next)=>{
    try{
        res.json(await activateCustom(req.user! , req.params.id))
    }
    catch(e){
        next(e)
    }
    return activateCustom
})

router.get('/', validateToken , async (req,res,next)=>{
    try{
        res.json(await getAll(req.user!))
    }
    catch(e){
        next(e)
    }
    return getAll
})

export {router};