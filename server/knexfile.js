require('ts-node/register');
const { knexSnakeCaseMappers } = require('objection');

module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host: 'db',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        },
        migrations: {
            directory: './db/migrations',
        },
        seeds: { directory: './db/seeds' },
        ...knexSnakeCaseMappers(),
    },
    test: {
        client: 'sqlite3',
        connection: { filename: ':memory:' },
        useNullAsDefault: true,
        migrations: {
            directory: './db/migrations',
        },

        ...knexSnakeCaseMappers(),
    },
};
