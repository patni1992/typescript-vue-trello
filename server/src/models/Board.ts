import { BaseModel } from './BaseModel';
import { Pojo, Model } from 'objection';
import { Column } from './Column';

const colors = ['#0279BF', '#FFAB4A', '#4ABF6B', '#eb5a46'] as const;

export class Board extends BaseModel {
    static tableName = 'boards';
    readonly id!: number;
    userId?: number;
    title?: string;
    color?: typeof colors[number];
    columns?: Array<Column>;

    static relationMappings = {
        columns: {
            relation: Model.HasManyRelation,
            modelClass: Column,
            join: {
                from: 'boards.id',
                to: 'columns.board_id',
            },
        },
    };

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
