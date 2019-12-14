import { Response } from 'express';
import { Card } from '../models/Card';
import { ExtendedRequest } from '../interfaces/ExtendedRequest';
import { NextFunction } from 'express-serve-static-core';
import { HttpException } from '../utils/HttpException';

export class CardsController {
    public async reOrder(req: ExtendedRequest, res: Response, next: NextFunction): Promise<Response | void> {
        const { columnId, cardIds } = req.body;

        if (!Array.isArray(cardIds)) {
            return next(new HttpException(400, 'a list with cardIds is required'));
        }

        if (!columnId) {
            return next(new HttpException(400, 'columnId is required'));
        }

        const cards = await Card.query().whereIn('id', cardIds);
        cards.forEach(async card => await card.$query().patch({ position: cardIds.indexOf(card.id), columnId }));

        return res.send(cardIds);
    }

    public async update(req: ExtendedRequest, res: Response, next: NextFunction): Promise<Response | void> {
        const { content, color } = req.body;
        const card = await Card.query()
            .updateAndFetchById(req.params.id, { content, color })
            .throwIfNotFound();

        return res.send(card);
    }
}
