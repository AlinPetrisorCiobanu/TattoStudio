import { Response , Request , NextFunction} from "express";

export const errorHandler = (err:any ,_req: Request ,res:Response , _next: NextFunction) =>{
    if(err.message === "BAD_REQUEST") {return res.status(400).json({message : `¡Algo salió mal! Por favor, inténtalo de nuevo más tarde`})}
    if(err.message === "BAD_DATE_REQUEST") {return res.status(400).json({message : `¡Formato Fecha Incorecta!`})}
    if(err.message === "INVALID_CREDENTIALS") {return res.status(401).json({message : `Datos invalidos`})}
    if(err.message === "NOT_FOUND") {return res.status(404).json({message : `Lo siento no hemos encontrado`})}
    if(err.message === "NOT_ALLOWED") {return res.status(405).json({message : `Lo siento no tienes permiso`})}
    if(err.message === "ALLREADY_EXIST") {return res.status(409).json({message : `Lo siento ya existe`})}
    if(err.message === "ALLREADY_NOT_EXIST") {return res.status(409).json({message : `Lo siento no existe`})}
    if(err.message === "EMAIL_PASSWORD") {return res.status(419).json({message : `Email o Contraseña invalidos`})}
    if(err.message === "MISSING_DATA") {return res.status(422).json({message : `Faltan datos`})}
    if(err.message === "DELETED") {return res.status(423).json({message : `Este Usuario Esta Bloqueado`})}
    return res.status(500).json({error: 'SERVER_ERROR'})
}

