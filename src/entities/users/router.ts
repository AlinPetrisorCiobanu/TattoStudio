import express from "express";
import {signUp,signIn,modifyCustom,deleteCustom,activateCustom,getAll, getAllArtist} from "./controler";
import { validateToken } from "../../middleware/authorization";


const router = express.Router()

router.post('/',async (req,res,next)=>{
    try{
        res.status(201).json(await signUp(req.body))
    }
    catch(e){
        next(e)
    }
})

router.post('/login', async (req,res,next)=>{
    try{
        res.status(200).json(await signIn(req.body))
    }
    catch(e){
        next(e)
    }
})

router.put('/:id?', validateToken ,async (req,res,next)=>{
    try{
        res.status(200).json(await modifyCustom(req.user! , req.params.id , req.body))
    }
    catch(e){
        next(e)
    }
})

router.delete('/:id?', validateToken , async (req,res,next)=>{
    try{
        res.status(200).json(await deleteCustom(req.user!, req.params.id))
    }
    catch(e){
        next(e)
    }
})
router.patch('/:id', validateToken , async (req,res,next)=>{
    try{
        res.status(200).json(await activateCustom(req.user!, req.params.id , req.body))
    }
    catch(e){
        next(e)
    }
})


router.get('/', validateToken , async (req,res,next)=>{
    try{
        res.status(200).json(await getAll(req.user!))
    }
    catch(e){
        next(e)
    }
})
router.get('/artist', validateToken , async (req,res,next)=>{
    try{
        res.status(200).json(await getAllArtist(req.user!))
    }
    catch(e){
        next(e)
    }
})

export default router