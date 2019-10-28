import { UserToken } from './UserToken';
import { Request } from 'express';
export interface ExtendedRequest extends Request {
    user?: UserToken | undefined;
}
