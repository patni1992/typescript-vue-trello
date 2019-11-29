import { BaseModel } from './BaseModel';
import { pick, omit } from 'lodash';
import * as bcrypt from 'bcrypt';
import { Pojo, Model } from 'objection';
import { Board } from './Board';

export class User extends BaseModel {
    static tableName = 'users';

    readonly id!: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    password?: string;
    isAdmin = false;
    profileImage?: string;
    boards!: Array<Board>;

    get hiddenFields(): string[] {
        return ['password', 'createdAt', 'updatedAt', 'isAdmin', 'id'];
    }

    static relationMappings = {
        boards: {
            relation: Model.HasManyRelation,
            modelClass: Board,
            join: {
                from: 'users.id',
                to: 'boards.user_id',
            },
        },
    };

    static async getUser(email: User['email'], username: User['username']): Promise<User | undefined> {
        return await User.query()
            .where('email', email || '')
            .orWhere('username', username || '')
            .first();
    }

    static get jsonSchema(): object {
        return {
            type: 'object',
            required: ['firstName', 'lastName', 'email', 'username', 'password'],

            properties: {
                id: { type: 'integer' },
                firstName: { type: 'string', minLength: 1, maxLength: 255 },
                lastName: { type: 'string', minLength: 1, maxLength: 255 },
                email: { type: 'string', format: 'email', maxLength: 255 },
                password: { type: 'password', minLength: 6, maxLength: 255 },
                isAdmin: { type: 'boolean' },
                profileImage: { type: 'string', minLength: 1, maxLength: 255 },
            },
        };
    }

    isBcryptHash(str): boolean {
        const REGEXP = /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9./]{53}$/;
        return REGEXP.test(str);
    }

    private async generateHash(): Promise<any> {
        if (this.password) {
            if (this.isBcryptHash(this.password)) {
                throw new Error('bcrypt tried to hash another bcrypt hash');
            }

            const hash = await bcrypt.hash(this.password, 12);
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

    verifyPassword(password): Promise<boolean> {
        if (this.password) {
            return bcrypt.compare(password, this.password);
        } else {
            throw new Error('password must not be empty');
        }
    }

    $formatJson(jsonRaw): Pojo {
        super.$formatJson(jsonRaw);
        return omit(jsonRaw, this.hiddenFields);
    }
}
