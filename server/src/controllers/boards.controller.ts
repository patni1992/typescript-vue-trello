import { Response } from 'express';
import { User } from '../models/User';
import { Board } from '../models/Board';
import { NextFunction } from 'connect';
import { ExtendedRequest } from '../interfaces/ExtendedRequest';

export class BoardsController {
    public async index(req: ExtendedRequest, res: Response): Promise<Response> {
        const user = await User.query()
            .findById(req.user!.id)
            .eager('boards');

        if (!user) {
            return res.send(404);
        }

        return res.json(user.boards);
    }

    public async create(req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> {
        const { title, color } = req.body;
        const data: { color?: string; title: string; userId?: number } = { title };
        const user = await User.query().findById(req.user!.id);

        if (color) {
            data.color = color;
        }

        if (!user) {
            return res.sendStatus(404);
        }

        const board = await user.$relatedQuery('boards').insert(data);
        return res.json(board);
    }

    public async show(req: ExtendedRequest, res: Response): Promise<any> {
        const board = await Board.query().findById(req.params.id);

        res.send(board);
    }
}
