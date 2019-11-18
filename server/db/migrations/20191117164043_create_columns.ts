import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('columns', t => {
        t.increments('id')
            .primary()
            .unsigned();

        t.timestamps(true, true);
        t.string('title').notNullable();

        t.integer('board_id')
            .unsigned()
            .references('boards.id');
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('columns');
}
