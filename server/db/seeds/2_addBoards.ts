import * as Knex from 'knex';
import * as faker from 'faker';
import { Model } from 'objection';
import { User } from '../../src/models/User';
import { Board, colors } from '../../src/models/Board';
import { sample } from 'lodash';

const createBoard = () => {
    return {
        title: faker.lorem.sentence(),
        color: sample(colors),
    };
};

export async function seed(knex: Knex): Promise<any> {
    Model.knex(knex);
    let amountOfBoards;
    let boards: Partial<Board>[] = [];
    const users = await User.query();

    for (let i = 0; i < users.length; i++) {
        amountOfBoards = Math.floor(Math.random() * 10);
        boards = [];

        for (let x = 0; x < amountOfBoards; x++) {
            boards.push(createBoard());
        }

        await users[i].$relatedQuery('boards').insertGraph(boards);
    }

    return boards;
}
