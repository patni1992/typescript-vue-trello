import { Request, Response } from 'express';
import { User } from '../models/User';

import { NextFunction } from 'connect';

export class UsersController {
    public async index(req: Request, res: Response): Promise<Response> {
        const users = await User.query();

        return res.json(users);
    }
    public async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { firstName, lastName, userName, email, password } = req.body;
            const userExist = await User.exist(email, userName);

            if (userExist) {
                return res.status(422).send({ message: 'Email or Username is already taken' });
            }

            const newUser = await User.query().insert({ firstName, lastName, userName, email, password });
            return res.status(201).send(newUser);
        } catch (error) {
            return next(error);
        }
    }
}
