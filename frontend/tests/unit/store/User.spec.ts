import user from '@/store/user';
import mockAxios from 'jest-mock-axios';

describe('User', () => {
    test('SET_EMAIL set email', () => {
        user.SET_EMAIL('testemail@.com');
        expect(user.email).toBe('testemail@.com');
    });

    test('Login calls api and set data for token & user', async () => {
        const promise = user.login({
            username: 'john_doe',
            password: '123456',
        });

        const responseObj = {
            data: {
                user: {
                    username: 'john_doe',
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john_doe@hotmail.com',
                    profileImage: 'someImg.jpg',
                },
                token: 'testtoken1244',
            },
        };

        mockAxios.mockResponse(responseObj);
        await promise;
        expect(user.username).toBe('john_doe');
        expect(user.firstName).toBe('John');
        expect(user.lastName).toBe('Doe');
        expect(user.email).toBe('john_doe@hotmail.com');
        expect(user.profileImage).toBe('someImg.jpg');
        expect(user.token).toBe('testtoken1244');
    });
});
