import { app, server, knex } from '../../../src/app';
import * as request from 'supertest';
import { User } from '../../../src/models/User';

beforeEach(async done => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    done();
});

afterAll(async () => {
    await server.close();
});

const userData = {
    password: '123456',
    firstName: 'John',
    lastName: 'Doe',
    username: 'john3-doe',
    email: 'john-d3oe@hotmail.com',
};

describe('/register', () => {
    describe('POST', () => {
        test('Create a new user', async () => {
            const response = await request(app)
                .post('/register')
                .send(userData)
                .expect(201)
                .expect('Content-Type', /json/);

            expect(response.body).toMatchObject({
                firstName: 'John',
                lastName: 'Doe',
                username: 'john3-doe',
                email: 'john-d3oe@hotmail.com',
            });
            return response;
        });

        test('Can not create user without correct data', async () => {
            let response = await request(app)
                .post('/register')
                .send({})
                .expect(400);

            expect(response.body.message).toEqual(
                'username: is a required property, firstName: is a required property, lastName: is a required property, email: is a required property, password: is a required property',
            );

            response = await request(app)
                .post('/register')
                .send({ firstName: 'test', lastName: '3lf' })
                .expect(400);

            expect(response.body.message).toEqual(
                'username: is a required property, email: is a required property, password: is a required property',
            );

            response = await request(app)
                .post('/register')
                .send({
                    firstName: 'test',
                    lastName: '3lf',
                    username: 'testuser',
                    password: '12345678',
                    email: 'patrik',
                })
                .expect(400);
            expect(response.body.message).toEqual('email: should match format "email"');

            return response;
        });
        test('Can not add user with existing mail or username', async () => {
            const newUser = {
                password: '123456',
                firstName: 'John',
                lastName: 'Doe',
            };

            await User.query().insert(userData);

            const existingEmail = await request(app)
                .post('/register')
                .send({ ...newUser, email: userData.email, username: 'bob123' })
                .expect(422);
            expect(existingEmail.body.message).toEqual('Email or Username is already taken');

            const existingUserName = await request(app)
                .post('/register')
                .send({ ...newUser, username: userData.username, email: 'bob1233343@hotmail.com' })
                .expect(422);

            expect(existingUserName.body.message).toEqual('Email or Username is already taken');

            return existingUserName;
        });
    });
});
