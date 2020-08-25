import { Response } from 'express';
import { User } from '../models/User';
import { Board } from '../models/Board';
import { NextFunction } from 'connect';
import { ExtendedRequest } from '../interfaces/ExtendedRequest';

export class BoardsController {
    public async index(req: ExtendedRequest, res: Response): Promise<Response> {
        const boards = await Board.query()
            .where('user_id', req.user!.id)
            .orderBy('created_at', 'desc');

        return res.json(boards);
    }

    public async create(req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> {
        const { color, title } = req.body;
        const user = await User.query().findById(req.user!.id);

        if (!user) {
            return res.sendStatus(404);
        }

        const boardData = {
            color,
            title,
        };

        const boards = await user
            .$relatedQuery('boards')
            .insert(boardData)
            .skipUndefined();

        return res.json(boards);
    }

    public async show(req: ExtendedRequest, res: Response): Promise<any> {
        const board = await Board.query()
            .findById(req.params.id)
            .allowEager('columns.cards')
            .eager(req.query.include!);

        res.send(board);
    }

    public async delete(req: ExtendedRequest, res: Response): Promise<any> {
        await Board.query()
            .deleteById(req.params.id)
            .throwIfNotFound();

        res.sendStatus(200);
    }

    public async update(req: ExtendedRequest, res: Response, next: NextFunction): Promise<Response | void> {
        const { title, color } = req.body;

        const board = await Board.query()
            .patchAndFetchById(req.params.id, { title, color })
            .throwIfNotFound();

        res.send(board);
    }
}
