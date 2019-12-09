import { BaseModel } from './BaseModel';
import { Colors } from '../interfaces/Colors';

export class Card extends BaseModel {
    static tableName = 'cards';
    readonly id!: number;
    columnId!: string;
    position!: number;
    color?: typeof Colors[number];
    content!: string;

    static get jsonSchema(): object {
        return {
            type: 'object',
            required: ['content'],
            properties: {
                id: { type: 'integer' },
                content: { type: 'string', minLength: 1 },
                color: { enum: Colors },
                position: { type: 'integer' },
            },
        };
    }
}
