import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('boards', t => {
        t.increments('id')
            .primary()
            .unsigned();

        t.timestamps(true, true);
        t.string('title').notNullable();
        t.string('color').notNullable();
        t.integer('user_id')
            .unsigned()
            .references('users.id');
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('boards');
}
