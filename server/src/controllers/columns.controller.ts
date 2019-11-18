import { Response } from 'express';
import { Board } from '../models/Board';
import { Column } from '../models/Column';
import { NextFunction } from 'connect';
import { ExtendedRequest } from '../interfaces/ExtendedRequest';
import { HttpException } from '../utils/HttpException';

export class ColumnsController {
    public async index(req: ExtendedRequest, res: Response, next: NextFunction): Promise<Response | void> {
        if (!req.query.boardId) {
            return next(new HttpException(400, 'boardId parameter is required'));
        }
        const columns = await Column.query().where('board_id', req.query.boardId);

        return res.json(columns);
    }

    public async create(req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> {
        const { title, boardId } = req.body;
        const board = await Board.query().findById(boardId);

        const data = {
            title,
        };

        if (board) {
            return res.send(await board.$relatedQuery('columns').insert(data));
        }

        res.sendStatus(400);
    }
}
