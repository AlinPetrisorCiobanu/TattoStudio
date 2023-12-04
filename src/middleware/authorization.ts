import jwt from "jsonwebtoken";
import CONFIDENCE from "../config/config";
import {Request, Response, NextFunction } from "express";
import { JwtPayload } from "../types/types";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")
    if (!token) {
      console.log(token)
      return res.status(401).json({ msg: 'UNAUTHORIZED' });
    }
    const t = token.split(" ")[1];
    req.user = jwt.verify(t, CONFIDENCE.SECRETDB) as JwtPayload
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ error: "Invalid token" });
    }
    next(error);
  }
  return
};
export { validateToken };