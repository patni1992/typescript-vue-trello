import * as request from 'supertest';
export const login = async app => {
    const response = await request(app)
        .post('/login')
        .send({
            username: 'admin',
            password: '123456',
        });

    return response.body;
};
