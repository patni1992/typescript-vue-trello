import { Model, snakeCaseMappers, ColumnNameMappers } from 'objection';

export class BaseModel extends Model {
    static get columnNameMappers(): ColumnNameMappers {
        return snakeCaseMappers();
    }

    createdAt?: string;
    updatedAt?: string;

    private formatDate(): string {
        return new Date()
            .toJSON()
            .slice(0, 19)
            .replace('T', ' ');
    }

    async $beforeInsert(context): Promise<any> {
        await super.$beforeInsert(context);
        this.createdAt = this.formatDate();
    }

    async $beforeUpdate(queryOptions, context): Promise<any> {
        await super.$beforeUpdate(queryOptions, context);
        this.updatedAt = this.formatDate();
    }
}
