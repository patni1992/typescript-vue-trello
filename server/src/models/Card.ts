import { BaseModel } from './BaseModel';

export const colors = ['#0279BF', '#FFAB4A', '#4ABF6B', '#eb5a46'] as const;

export class Card extends BaseModel {
    static tableName = 'cards';
    readonly id!: number;
    columnId!: number;
    color?: typeof colors[number];
    content?: string;

    static get jsonSchema(): object {
        return {
            type: 'object',
            required: ['content'],
            properties: {
                id: { type: 'integer' },
                content: { type: 'string', minLength: 1 },
                color: { enum: colors },
            },
        };
    }
}
