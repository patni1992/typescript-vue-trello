import user from '@/store/user';
import mockAxios from 'jest-mock-axios';
import axios from 'axios';

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

describe('User', () => {
    test('SET_EMAIL set email', () => {
        user.SET_EMAIL('testemail@.com');
        expect(user.email).toBe('testemail@.com');
    });

    test('SET_USERNAME set username', () => {
        user.SET_USERNAME('testUser');
        expect(user.username).toBe('testUser');
    });

    test('SET_LAST_NAME set lastName', () => {
        user.SET_LAST_NAME('someLastName');
        expect(user.lastName).toBe('someLastName');
    });

    test('SET_FIRST_NAME set firstName', () => {
        user.SET_FIRST_NAME('someFirstName');
        expect(user.firstName).toBe('someFirstName');
    });

    test('SET_PROFILE_IMAGE set profileImage', () => {
        user.SET_PROFILE_IMAGE('img.jpg');
        expect(user.profileImage).toBe('img.jpg');
    });

    test('SET_TOKEN set token', () => {
        user.SET_TOKEN('token_123456');
        expect(user.token).toBe('token_123456');
    });

    test('Login calls api and set data for token & user', async () => {
        const promise = user.login({
            username: 'john_doe',
            password: '123456',
        });

        mockAxios.mockResponse(responseObj);
        await promise;
        expect(user.username).toBe('john_doe');
        expect(user.firstName).toBe('John');
        expect(user.lastName).toBe('Doe');
        expect(user.email).toBe('john_doe@hotmail.com');
        expect(user.profileImage).toBe('someImg.jpg');
        expect(user.token).toBe('testtoken1244');
    });

    test('Login saves token and user in localstorage', async () => {
        const promise = user.login({
            username: 'john_doe',
            password: '123456',
        });

        mockAxios.mockResponse(responseObj);

        await promise;
        expect(localStorage.__STORE__['token']).toBe(responseObj.data.token);
        expect(JSON.parse(localStorage.__STORE__['user'])).toMatchObject(responseObj.data.user);
    });

    test('login sets token as auth header in axios', async () => {
        const promise = user.login({
            username: 'john_doe',
            password: '123456',
        });

        mockAxios.mockResponse(responseObj);

        await promise;
        expect(axios.defaults.headers.common.Authorization).toBe('Bearer testtoken1244');
    });

    test('logout removes token from state & localstorage', () => {
        const KEY = 'token';
        const VALUE = 'sometoken1234';
        user.SET_TOKEN(VALUE);
        localStorage.setItem(KEY, VALUE);
        user.logout();

        expect(user.token).toBe('');
        expect(localStorage.__STORE__[KEY]).toBe(undefined);
    });
    test('logout removes auth header from axios', () => {
        axios.defaults.headers.common['Authorization'] = `Bearer token12345`;
        user.logout();
        expect(axios.defaults.headers.common.Authorization).toBeUndefined();
    });
});
