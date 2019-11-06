import { BaseModel } from './BaseModel';

export class Board extends BaseModel {
    static tableName = 'boards';

    readonly id!: number;
    userId?: number;
    title?: string;
    color = '#0279BE';

    static get jsonSchema(): object {
        return {
            type: 'object',
            required: ['title'],

            properties: {
                id: { type: 'integer' },
                userId: { type: 'integer' },
                title: { type: 'string', minLength: 1, maxLength: 255 },
                color: { type: 'string', minLength: 1, maxLength: 255 },
            },
        };
    }
}
