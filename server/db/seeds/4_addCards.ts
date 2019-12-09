import * as Knex from 'knex';
import { Model } from 'objection';
import { Column } from '../../src/models/Column';
import { Card } from '../../src/models/Card';
import { cardFactory, resetCounter } from '../factories/cardFactory';

export async function seed(knex: Knex): Promise<any> {
    Model.knex(knex);
    let amountOfCards;
    let cards: Partial<Card>[] = [];
    const columns = await Column.query();

    for (let i = 0; i < columns.length; i++) {
        amountOfCards = Math.floor(Math.random() * 10);
        cards = cardFactory.buildList(amountOfCards);
        resetCounter();

        await columns[i].$relatedQuery('cards').insertGraph(cards);
    }

    return cards;
}
