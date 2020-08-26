import cards from '@/store/cards';
import user from '@/store/user';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
    mockAxios.reset();
});

describe('Card', () => {
    test('deleteCard removes card from store', async () => {
        cards.ADD_CARD({
            content: 'Hello 123',
            id: 10,
            columnId: 10,
            position: 1,
            color: 'blue',
        });

        const promise = cards.deleteCard(10);
        mockAxios.mockResponse();
        await promise;

        expect(cards.allIds).toHaveLength(0);
        expect(Object.keys(cards.byId)).toHaveLength(0);
    });

    test('deleteCard calls api', async () => {
        const promise = cards.deleteCard(10);
        mockAxios.mockResponse();
        await promise;

        expect(mockAxios.delete).toHaveBeenCalledWith(`/cards/${10}`);
    });

    test.only('deleteCard does not call api if user is guest', async () => {
        user.SET_IS_GUEST(true);
        await cards.deleteCard(10);

        expect(mockAxios.delete).not.toHaveBeenCalled()
    });
});
