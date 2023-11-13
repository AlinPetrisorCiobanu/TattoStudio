import express from "express";
import {signUp,signIn,modifyCustom,deleteCustom,activateCustom,getAll} from "./controler";

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
router.post('/signin', async (req,res,next)=>{
    try{
        res.json(await signIn(req.body))
    }
    catch(e){
        next(e)
    }
    return signIn
})
router.put('/', async (req,res,next)=>{
    try{
        res.json(await modifyCustom(req.body))
    }
    catch(e){
        next(e)
    }
    return modifyCustom
})
router.delete('/', async (req,res,next)=>{
    try{
        res.json(await deleteCustom(req.body))
    }
    catch(e){
        next(e)
    }
    return deleteCustom
})
router.patch('/', async (req,res,next)=>{
    try{
        res.json(await activateCustom(req.body))
    }
    catch(e){
        next(e)
    }
    return activateCustom
})
router.get('/', async (_req,res,next)=>{
    try{
        res.json(await getAll())
    }
    catch(e){
        next(e)
    }
    return activateCustom
})


export {router};































/*
router.post('/',async (req,res,next)=>{
    try{
        res.json(await createUser(req.body))
    }catch(e){
        next(e)
    }
})
*/