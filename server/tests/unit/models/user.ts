import { User } from '../../../src/models/User';
import { Board } from '../../../src/models/Board';

const userData = {
    firstName: 'John',
    lastName: 'Doe',
    password: '123456',
    username: 'john-doe',
    email: 'john-doe@hotmail.com',
};

describe('User model', () => {
    test('Password should be set after creating a new user', async () => {
        const someone = await User.query()
            .insert(userData)
            .resolve(true);

        expect(someone.isBcryptHash(someone.password)).toBe(true);
    });

    test('Password should only be updated if a new one is set', async () => {
        const someone = await User.query()

            .insert({ ...userData, id: 3 })
            .resolve(true);

        let passwordBeforeInsert = someone.password;

        await someone
            .$query()

            .patch({ firstName: 'Ted' })
            .resolve(true);

        let passwordAfterInsert = someone.password;

        expect(passwordAfterInsert).toEqual(passwordBeforeInsert);

        passwordBeforeInsert = someone.password;

        await someone
            .$query()
            .patch({ lastName: 'Nilsson', password: '123456789' })
            .resolve(true);

        passwordAfterInsert = someone.password;

        expect(passwordBeforeInsert).not.toEqual(passwordAfterInsert);
    });

    test('Should throw and error if no password is set when creating a user', async () => {
        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            username: 'john-doe',
            email: 'john-doe@hotmail.com',
        };
        try {
            await User.query().insert(userData);
        } catch (e) {
            expect(e.message).toBe('password: is a required property');
        }
    });

    test('Hide hidden fields when converting to JSON', async () => {
        const user = await User.query()
            .insert(userData)
            .resolve(true);

        const keys = Object.keys(user.toJSON());

        expect(user.hiddenFields).toEqual(['password', 'createdAt', 'updatedAt', 'isAdmin', 'id']);
        user.hiddenFields.forEach(value => expect(keys).not.toContain(value));
    });

    test('a user has many boards', async () => {
        const data = { title: 'test title' };
        const user = await User.query()
            .insert(userData)
            .resolve(true);
        user.boards = [];
        await user
            .$relatedQuery('boards')
            .insert(data)
            .resolve(true);

        expect(user.boards.length).toBe(1);
        expect(user.boards[0]).toBeInstanceOf(Board);
        expect(user.boards[0].title).toEqual(data.title);
    });
});
