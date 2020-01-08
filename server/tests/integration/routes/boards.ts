import { app, server, knex } from '../../../src/app';
import * as request from 'supertest';
import { login } from '../../utils';
import { User } from '../../../src/models/User';
import { Board } from '../../../src/models/Board';

jest.unmock('bcrypt');

beforeEach(async done => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await User.query().insert({
        firstName: 'John',
        lastName: 'Doe',
        password: '123456',
        username: 'admin',
        email: 'admin@admin.se',
    });
    done();
});

afterAll(async () => {
    await server.close();
});

const boardData = {
    title: 'Project title',
};

describe('/boards', () => {
    describe('POST', () => {
        test('Guest can not create a board', async () => {
            const response = await request(app)
                .post('/boards')
                .send(boardData)
                .expect(401);

            return response;
        });
        test('User can create a board', async () => {
            const user = await login(app);
            const response = await request(app)
                .post('/boards')
                .set('Authorization', 'Bearer ' + user.token)
                .send(boardData)
                .expect(200);

            return response;
        });
        test('User can edit a board', async () => {
            const board = await Board.query().insert(boardData);
            const user = await login(app);
            const response = await request(app)
                .put(`/boards/${board.id}/`)
                .set('Authorization', 'Bearer ' + user.token)
                .send({
                    title: 'updated title',
                })
                .expect(200);

            const updatedBoard = await Board.query().findById(board.id);

            expect(response.body.title).toBe('updated title');
            expect(updatedBoard!.title).toBe('updated title');

            return response;
        });
    });
});
