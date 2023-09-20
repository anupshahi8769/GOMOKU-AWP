import jwt, { SignOptions } from 'jsonwebtoken';

export const signJWT = (payload: Object, options: SignOptions = {}) => {
    const privateKey = process.env.accessTokenPrivateKey as string;
    return jwt.sign(payload, privateKey, {
        ...(options && options), algorithm: 'RS256', expiresIn: '8h'
    });
};

export const verifyJWT = <T>(token: string): T | null => {
    try{
        const publicKey = process.env.accessTokenPublicKey as string;
        return jwt.verify(token, publicKey) as T;
    } catch (error){
        return null;
    }
}