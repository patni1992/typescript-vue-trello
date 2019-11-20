import * as Knex from 'knex';
import * as faker from 'faker';
import { Model } from 'objection';
import { Board } from '../../src/models/Board';
import { Column } from '../../src/models/Column';

const createColumn = () => {
    return {
        title: faker.lorem.sentence(),
    };
};

export async function seed(knex: Knex): Promise<any> {
    Model.knex(knex);
    let amountOfColumns;
    let columns: Partial<Column>[] = [];
    const boards = await Board.query();

    for (let i = 0; i < boards.length; i++) {
        amountOfColumns = Math.floor(Math.random() * 10);
        columns = [];

        for (let x = 0; x < amountOfColumns; x++) {
            columns.push(createColumn());
        }

        await boards[i].$relatedQuery('columns').insertGraph(columns);
    }

    return columns;
}
