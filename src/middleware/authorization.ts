import jwt from "jsonwebtoken";
import CONFIDENCE from "../config/config";
import {Request, Response, NextFunction } from "express";
const authMiddleware = (req:Request,res : Response , next : NextFunction) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      throw res.status(404).json({msg:'UNHAUTORIZED'})
    }
    const t = token.split(" ")[1];
    const decoded = jwt.verify(t, CONFIDENCE.SECRETDB);
    req.user = decoded;
    next();
  } catch (error) {
    if (error === "JsonWebTokenError") {
      const error = new Error("JsonWebTokenError");
      (error as any).status = 401;
      throw error;
    }
    next(error);
  }
};
export { authMiddleware };