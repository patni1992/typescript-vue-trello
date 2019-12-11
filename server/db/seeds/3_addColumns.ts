import * as Knex from 'knex';
import { Model } from 'objection';
import { Board } from '../../src/models/Board';
import { Column } from '../../src/models/Column';
import { columnFactory, resetCounter } from '../factories/columnFactory';

export async function seed(knex: Knex): Promise<any> {
    Model.knex(knex);
    let amountOfColumns;
    let columns: Partial<Column>[] = [];
    const boards = await Board.query();

    for (let i = 0; i < boards.length; i++) {
        amountOfColumns = Math.floor(Math.random() * 10);
        columns = columnFactory.buildList(amountOfColumns);
        resetCounter();

        await boards[i].$relatedQuery('columns').insertGraph(columns);
    }

    return columns;
}
