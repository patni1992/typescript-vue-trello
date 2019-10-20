import { User } from '../../models/User';
import * as Knex from 'knex';
import { Model } from 'objection';
import * as knexConfig from '../../../knexfile';

export const knex = Knex(knexConfig.test);
Model.knex(knex);

beforeEach(async () => {
    await knex.migrate.rollback();
    return await knex.migrate.latest();
});

describe('User model', () => {
    test('Password should be set after creating a new user', async done => {
        const someone = await User.query().insert({ firstName: 'John', lastName: 'Doe', password: '1234' });
        const vertifiedPassword = await someone.verifyPassword('1234');
        const wrongPassword = await someone.verifyPassword('wrong password');

        expect(someone.password).toBeTruthy();
        expect(vertifiedPassword).toBe(true);
        expect(wrongPassword).toBe(false);
        done();
    });

    test('Password should only be updated if a new one is set', async done => {
        const someone = await User.query().insert({ firstName: 'John', lastName: 'Doe', password: '1234' });
        const updatedPerson = await User.query().updateAndFetchById(someone.id, { firstName: 'Patrik' });

        expect(someone.password).toEqual(updatedPerson.password);

        const updatePassword = await User.query().updateAndFetchById(someone.id, {
            firstName: 'Patrik',
            password: '1234',
        });

        expect(someone.password).not.toEqual(updatePassword.password);

        done();
    });

    test('Should throw and error if no password is set when creating a user', async done => {
        try {
            await User.query().insert({ firstName: 'John', lastName: 'Doe' });
        } catch (e) {
            expect(e.message).toBe('password must not be empty');
        }

        done();
    });
});
