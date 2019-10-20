import { BaseModel } from './BaseModel';
import * as Bcrypt from 'bcrypt';

export class User extends BaseModel {
    static tableName = 'users';

    readonly id!: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    userName?: string;
    password?: string;
    isAdmin = false;
    profileImage?: string;

    private isBcryptHash(str): boolean {
        const REGEXP = /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9./]{53}$/;
        return REGEXP.test(str);
    }

    private async generateHash(): Promise<any> {
        if (this.password) {
            if (this.isBcryptHash(this.password)) {
                throw new Error('bcrypt tried to hash another bcrypt hash');
            }

            const hash = await Bcrypt.hash(this.password, 12);
            this.password = hash;
            return this.password;
        }

        throw new Error('password must not be empty');
    }

    async $beforeInsert(context): Promise<any> {
        await super.$beforeInsert(context);
        return this.generateHash();
    }

    async $beforeUpdate(queryOptions, context): Promise<any> {
        await super.$beforeUpdate(queryOptions, context);

        if (this.password === undefined) {
            return;
        }

        return this.generateHash();
    }

    verifyPassword(password): Promise<any> {
        return Bcrypt.compare(password, this.password);
    }
}
