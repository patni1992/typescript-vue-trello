import * as jwt from 'jsonwebtoken';
import * as util from 'util';
import { jwtKey } from '../../config.js';
import { UserToken } from '../interfaces/UserToken';
import { Request, Response } from 'express';
import { ExtendedRequest } from '../interfaces/ExtendedRequest';
import { NextFunction } from 'connect';

const jwtVertify = util.promisify(jwt.verify);

export const auth = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    let token = req.headers['authorization'] || '';
    token = token.replace('Bearer ', '');
    let decodedJWT: unknown | string = '';

    try {
        decodedJWT = await jwtVertify(token, jwtKey);
    } catch (e) {
        return res.sendStatus(401);
    }

    req.user = decodedJWT as UserToken;
    next();
};
