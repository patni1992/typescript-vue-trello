import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('cards', t => {
        t.increments('id')
            .primary()
            .unsigned();

        t.timestamps(true, true);
        t.text('content');
        t.enum('color', ['red', 'green', 'blue', 'orange']).notNullable();
        t.integer('position');
        t.integer('column_id')
            .unsigned()
            .references('columns.id')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('cards');
}
