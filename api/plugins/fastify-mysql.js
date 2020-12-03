'use strict';

const Database = require('./Database');
const { getDatabaseInformation } = require('./getConnectionString');
const fp = require('fastify-plugin');

async function fastifyMysql (fastify, database) {
    const connectionInformation = database.connectionString ? getDatabaseInformation(database.connectionString) || database : database;
    database = new Database({ ...connectionInformation });
    fastify.addHook('onClose', (fastify, done) => database.pool.end().then(done).catch(done));

    fastify.log.info(`Trying to connect to ${database.connectionString}`);
    try {
        await database.preparedRequest('SELECT NOW()');
        fastify.log.info(`Connected to ${database.connectionString}`);
    } catch (e) {
        return fastify.log.error(`Cannot connect to ${database.connectionString}`);
    }

    fastify.decorate('mysql', database);
}

module.exports = fp(fastifyMysql);
