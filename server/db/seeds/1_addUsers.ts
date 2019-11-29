import * as Knex from 'knex';
import * as faker from 'faker';
import { Model } from 'objection';
import { User } from '../../src/models/User';
import { Board } from '../../src/models/Board';
import { Column } from '../../src/models/Column';
import { Card } from '../../src/models/Card';
import { userFactory } from '../factories/userFactory';

export async function seed(knex: Knex): Promise<any> {
    Model.knex(knex);
    const users: Partial<User>[] = userFactory.buildList(50);

    await Card.query().delete();
    await Column.query().delete();
    await Board.query().delete();
    await User.query().delete();
    const dbUsers = await User.query().insertGraph(users);

    return dbUsers;
}
