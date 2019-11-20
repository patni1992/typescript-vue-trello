require('ts-node/register');
const { knexSnakeCaseMappers } = require('objection');

module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'trello-dev',
        },
        migrations: {
            directory: './db/migrations',
        },
        seeds: { directory: './db/seeds' },
    },
    test: {
        client: 'sqlite3',
        connection: {
            filename: './db/database.sqlite',
        },
        useNullAsDefault: true,
        migrations: {
            directory: './db/migrations',
        },

        ...knexSnakeCaseMappers(),
    },
};
