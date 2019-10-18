require('ts-node/register');

module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'test_db',
        },
        migrations: {
            directory: './db/migrations',
        },
    },
};
