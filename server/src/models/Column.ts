import { BaseModel } from './BaseModel';
import { Model } from 'objection';
import { Card } from './Card';

export class Column extends BaseModel {
    static tableName = 'columns';
    readonly id!: number;
    boardId!: number;
    position!: number;
    title!: string;
    cards?: Array<Card>;

    static relationMappings = {
        cards: {
            relation: Model.HasManyRelation,
            modelClass: Card,
            join: {
                from: 'columns.id',
                to: 'cards.column_id',
            },
        },
    };

    static get jsonSchema(): object {
        return {
            type: 'object',
            required: ['title'],
            properties: {
                id: { type: 'integer' },
                boardId: { type: 'integer' },
                title: { type: 'string', minLength: 1, maxLength: 255 },
            },
        };
    }
}
