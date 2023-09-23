import { NextFunction, Request, Response } from "express";
import { getUserByID } from '../service/validation.service'
import { verifyJwt } from '../utils/jwt'

interface TokenBody{
    username: string;
    _id: string;
    iat: number;
    exp: number;
}

export const userDeserialize = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        //getting token
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token){
            return res.status(403).send("Token is Missing");
        }

        //validating access token
        const decode = verifyJwt<TokenBody> (token);

        if(!decode){
            return res.status(401).send("Invalid Token");
        }

        const user = await getUserByID(decode._id);
        
        if(!user){
            return res.status(401).send("Invalid User");
        }

        //sending userid into request
        req.userId = user._id;
        next();
    } catch(err: any){
        next(err);
    }
}