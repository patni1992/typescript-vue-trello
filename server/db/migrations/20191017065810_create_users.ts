import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('users', t => {
        t.increments();
        t.timestamps(true, true);
        t.string('first_name');
        t.string('last_name');
        t.string('user_name').unique();
        t.string('email').unique();
        t.string('password');
        t.boolean('is_admin');
        t.string('profile_image');
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('users');
}
