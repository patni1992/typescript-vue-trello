import { BaseModel } from './BaseModel';

export class Coulumn extends BaseModel {
    static tableName = 'columns';
    readonly id!: number;
    boardId?: number;
    title?: string;

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
