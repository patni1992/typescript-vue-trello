import { app, server, knex } from '../../../src/app';
import * as request from 'supertest';
import { login } from '../../utils';
import { User } from '../../../src/models/User';
import { Card } from '../../../src/models/Card';
import { cardFactory } from '../../../db/factories/cardFactory';

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

describe('/boards', () => {
    describe('DELETE', () => {
        test('Guest can not delete a card', async () => {
            const response = await request(app)
                .delete(`/cards/${10}`)
                .expect(401);

            return response;
        });

        test('User can delete a card', async () => {
            const user = await login(app);
            const card = await Card.query().insert(cardFactory.build());
            const response = await request(app)
                .delete(`/cards/${card.id}`)
                .set('Authorization', 'Bearer ' + user.token)
                .expect(204);

            const deletedCard = await Card.query().findById(card.id);

            expect(deletedCard).toBeUndefined();

            return response;
        });

        test('Respond with 404 if not found', async () => {
            const user = await login(app);
            const response = await request(app)
                .delete(`/cards/00000`)
                .set('Authorization', 'Bearer ' + user.token)
                .expect(404);
            return response;
        });
    });
});
