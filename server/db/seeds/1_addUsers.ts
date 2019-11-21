import * as Knex from 'knex';
import * as faker from 'faker';
import { Model } from 'objection';
import { User } from '../../src/models/User';
import { Board } from '../../src/models/Board';
import { Column } from '../../src/models/Column';
import { Card } from '../../src/models/Card';

const createUser = () => {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: '123456',
    };
};

export async function seed(knex: Knex): Promise<any> {
    Model.knex(knex);
    const amountofUsers = 50;
    const users: Partial<User>[] = [];

    for (let i = 0; i < amountofUsers; i++) {
        users.push(createUser());
    }
    await Card.query().delete();
    await Column.query().delete();
    await Board.query().delete();
    await User.query().delete();
    const dbUsers = await User.query().insertGraph(users);

    return dbUsers;
}
