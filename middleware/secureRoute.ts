//? Runs before any routes that requires a token for. 
//? Must be logged in to make request to particular routes.

import { NextFunction, Request, Response } from "express";
import { SECRET } from '../config/environment';
import jwt, { JwtPayload } from 'jsonwebtoken'
import Users from "../models/users";

export default function secureRoute(req: Request, res: Response, next: NextFunction) {

  const rawToken = req.headers.authorization

  if (!rawToken) {
    return res.status(401).json({ message: 'Unauthorized'})
  }

  const token = rawToken.replace('Bearer ', '')
  jwt.verify(token, SECRET, async (err, payload) => {

    if (err || !payload) {
      return res.status(401).json({ message: 'Unauthorized'})
    }
    
    interface JWTPayload {
      userId: string
    }

    const jwtPayload = payload as JWTPayload
    const userId = jwtPayload.userId
    
    console.log(userId)

    const user = await Users.findById(userId)

    if (!user) return res.status(401).json({ message: 'Unauthorized'})

    // ! Attach the currentUser to the response, before we call next()
    res.locals.currentUser = user

    next()
  })
}
