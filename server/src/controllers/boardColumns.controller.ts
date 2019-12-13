import { Response } from 'express';
import { ExtendedRequest } from '../interfaces/ExtendedRequest';
import { NextFunction } from 'express-serve-static-core';
import { Board } from '../models/Board';

export class BoardColumnsController {
    public async create(req: ExtendedRequest, res: Response, next: NextFunction): Promise<Response | void> {
        const { boardId } = req.params;
        const { title } = req.body;

        const board = await Board.query()
            .findById(boardId)
            .throwIfNotFound();

        const countColumns = await board.$relatedQuery('columns').resultSize();

        const columnData = {
            title,
            position: countColumns + 1,
        };

        const column = await board.$relatedQuery('columns').insertAndFetch(columnData);

        res.send(column);
    }
}
