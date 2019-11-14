import { BaseModel } from './BaseModel';

const colors = ['#0279BF', '#FFAB4A', '#4ABF6B', '#eb5a46'] as const;

export class Board extends BaseModel {
    static tableName = 'boards';
    readonly id!: number;
    userId?: number;
    title?: string;
    color?: typeof colors[number];

    static get jsonSchema(): object {
        return {
            type: 'object',
            required: ['title'],
            properties: {
                id: { type: 'integer' },
                userId: { type: 'integer' },
                title: { type: 'string', minLength: 1, maxLength: 255 },
                color: { enum: colors },
            },
        };
    }
}
