import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'secret-key';
export const decodeToken = (token: string) => {

    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);

        return decodedToken;
    } catch (error) {

        console.error('Invalid token:', error);
        return null;
    }
};






