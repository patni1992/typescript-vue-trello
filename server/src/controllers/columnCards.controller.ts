import { Response } from 'express';
import { Card } from '../models/Card';
import { ExtendedRequest } from '../interfaces/ExtendedRequest';
import { NextFunction } from 'express-serve-static-core';
import { Column } from '../models/Column';

export class ColumnCardsController {
    public async create(req: ExtendedRequest, res: Response, next: NextFunction): Promise<Response | void> {
        const { columnId } = req.params;
        const { content, color } = req.body;

        const column = await Column.query()
            .findById(columnId)
            .throwIfNotFound();

        const countCards = await column.$relatedQuery('cards').resultSize();

        const cardData = {
            content,
            color,
            position: -Math.abs(countCards),
        };

        const card = await column.$relatedQuery('cards').insertAndFetch(cardData);

        res.send(card);
    }
}
