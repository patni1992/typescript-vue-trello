import * as Knex from 'knex';
import { Model } from 'objection';
import { Column } from '../../src/models/Column';
import { markdownData } from '../markdown';
import { Card } from '../../src/models/Card';
import { colors } from '../../src/models/Board';
import { sample } from 'lodash';

const createCard = () => {
    return {
        content: markdownData[Math.floor(Math.random() * markdownData.length)],
        color: sample(colors),
    };
};

export async function seed(knex: Knex): Promise<any> {
    Model.knex(knex);
    let amountOfColumns;
    let cards: Partial<Card>[] = [];
    const columns = await Column.query();

    for (let i = 0; i < columns.length; i++) {
        amountOfColumns = Math.floor(Math.random() * 10);
        cards = [];

        for (let x = 0; x < amountOfColumns; x++) {
            cards.push(createCard());
        }

        await columns[i].$relatedQuery('cards').insertGraph(cards);
    }

    return cards;
}
