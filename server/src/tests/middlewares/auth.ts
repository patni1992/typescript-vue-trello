import * as jwt from 'jsonwebtoken';
import { jwtKey } from '../../../config.js';
import { auth } from '../../middlewares/auth';

describe('middleware/auth', () => {
    const jwetToken = jwt.sign({ id: 1, email: 'johndoe@hotmail.com' }, jwtKey);
    const mockReq = {
        user: {},
        headers: {
            authorization: jwetToken,
        },
    };
    const mockRes = {
        sendStatus: jest.fn(),
    };
    const next = jest.fn();

    it('Pass on valid jwt', async () => {
        await auth(mockReq as any, mockRes as any, next);
        expect(next).toHaveBeenCalledTimes(1);
        expect(mockReq.user).toMatchObject({ id: 1, email: 'johndoe@hotmail.com' });
    });

    it('Fail on invalid jwt', async () => {
        mockReq.headers.authorization = '1243';
        await auth(mockReq as any, mockRes as any, next);
        expect(mockRes.sendStatus).toBeCalledWith(401);
    });
});
