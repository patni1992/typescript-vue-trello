import { User } from '../../models/User';
import * as Knex from 'knex';
import { Model } from 'objection';
import * as knexConfig from '../../../knexfile';

export const knex = Knex(knexConfig.test);
Model.knex(knex);

const userData = {
    firstName: 'John',
    lastName: 'Doe',
    password: '123456',
    userName: 'john-doe',
    email: 'john-doe@hotmail.com',
};

beforeEach(async () => {
    await knex.migrate.rollback();
    return await knex.migrate.latest();
});

describe('User model', () => {
    test('Password should be set after creating a new user', async done => {
        const someone = await User.query().insert(userData);

        expect(someone.isBcryptHash(someone.password)).toBe(true);
        done();
    });

    test('Password should only be updated if a new one is set', async done => {
        const someone = await User.query().insert(userData);
        const updatedPerson = await User.query().patchAndFetchById(someone.id, { firstName: 'Patrik' });

        expect(someone.password).toEqual(updatedPerson.password);

        const updatePassword = await User.query().patchAndFetchById(someone.id, {
            firstName: 'Patrik',
            password: '12345678',
        });

        expect(someone.password).not.toEqual(updatePassword.password);

        done();
    });

    test('Should throw and error if no password is set when creating a user', async done => {
        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            userName: 'john-doe',
            email: 'john-doe@hotmail.com',
        };
        try {
            await User.query().insert(userData);
        } catch (e) {
            expect(e.message).toBe('password: is a required property');
        }

        done();
    });

    test('Hide hidden fields when converting to JSON', async done => {
        const user = await User.query().insert(userData);
        const keys = Object.keys(user.toJSON());

        expect(user.hiddenFields).toEqual(['password', 'createdAt', 'updatedAt', 'isAdmin']);
        user.hiddenFields.forEach(value => expect(keys).not.toContain(value));

        done();
    });
});
