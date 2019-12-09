import { Response } from 'express';
import { Board } from '../models/Board';
import { Column } from '../models/Column';
import { ExtendedRequest } from '../interfaces/ExtendedRequest';
import { HttpException } from '../utils/HttpException';
import { NextFunction } from 'express-serve-static-core';

export class ColumnsController {
    public async index(req: ExtendedRequest, res: Response, next: NextFunction): Promise<Response | void> {
        if (!req.query.boardId) {
            return next(new HttpException(400, 'boardId parameter is required'));
        }
        const columns = await Column.query()
            .where('board_id', req.query.boardId)
            .allowEager('cards')
            .eager(req.query.include);

        columns.map(column => {
            if (column.cards) {
                column.cards = column.cards.sort((a, b) => (a.position > b.position ? 1 : -1));
            }
        });

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
