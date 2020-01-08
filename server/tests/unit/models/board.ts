import { Board } from '../../../src/models/Board';
import { boardFactory } from '../../../db/factories/boardFactory';

describe('Board model', () => {
    test('Throw error if color is not allowed', async () => {
        await expect(
            Board.query().insert({
                color: 'black' as 'blue',
                userId: 1,
                title: 'some board',
            }),
        ).rejects.toThrowError('color: should be equal to one of the allowed values');
    });
});

describe('a board requires title of min 3 characters', () => {
    test('Throw error if color is not allowed', async () => {
        await expect(Board.query().insert(boardFactory.build({ title: '' }))).rejects.toThrowError(
            'title: should NOT be shorter than 3 characters',
        );
    });
});
