import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('cards', t => {
        t.increments('id')
            .primary()
            .unsigned();

        t.timestamps(true, true);
        t.text('content');
        t.enum('color', ['#0279BF', '#FFAB4A', '#4ABF6B', '#eb5a46']).notNullable();

        t.integer('column_id')
            .unsigned()
            .references('columns.id');
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('cards');
}
