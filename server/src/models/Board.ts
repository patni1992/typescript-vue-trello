import { BaseModel } from './BaseModel';
import { Model } from 'objection';
import { Column } from './Column';
import { Colors } from '../interfaces/Colors';

export class Board extends BaseModel {
    static tableName = 'boards';
    readonly id!: number;
    userId!: number;
    title!: string;
    color!: typeof Colors[number];
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
                title: { type: 'string', minLength: 3, maxLength: 255 },
                color: { enum: Colors },
            },
        };
    }
}
