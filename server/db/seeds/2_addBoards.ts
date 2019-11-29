import * as Knex from 'knex';
import { Model } from 'objection';
import { User } from '../../src/models/User';
import { Board } from '../../src/models/Board';
import { boardFactory } from '../factories/boardFactory';

export async function seed(knex: Knex): Promise<any> {
    Model.knex(knex);
    let amountOfBoards;
    let boards: Partial<Board>[] = [];
    const users = await User.query();

    for (let i = 0; i < users.length; i++) {
        amountOfBoards = Math.floor(Math.random() * 10);
        boards = boardFactory.buildList(amountOfBoards);
        await users[i].$relatedQuery('boards').insertGraph(boards);
    }

    return boards;
}
