import { Request, Response } from 'express';
import { User } from '../models/User';
import * as jwt from 'jsonwebtoken';
import { jwtKey } from '../../config.js';
import { NextFunction } from 'connect';
import { ExtendedRequest } from '../interfaces/ExtendedRequest';

export class UsersController {
    public async index(req: Request, res: Response): Promise<Response> {
        const users = await User.query();

        return res.json(users);
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { firstName, lastName, username, email, password } = req.body;
        const userExist = await User.getUser(email, username);

        if (userExist) {
            return res.status(422).send({ message: 'Email or Username is already taken' });
        }

        const newUser = await User.query().insert({ firstName, lastName, username, email, password });
        return res.status(201).send(newUser);
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { username, password } = req.body;
        const user = await User.getUser('', username);

        if (user) {
            const isPasswordCorrect = await user.verifyPassword(password);

            if (isPasswordCorrect) {
                const token = jwt.sign({ email: user.email, id: user.id }, jwtKey);
                return res.send({ token, user });
            }
        }
        return res.sendStatus(401);
    }
}
