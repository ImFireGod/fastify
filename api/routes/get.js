'use strict';

async function routes (fastify, options) {
    fastify.get('/cars', (request, reply) => {
        return {
            hello: 'World'
        }
    });
}

module.exports = routes;