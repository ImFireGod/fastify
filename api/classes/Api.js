'use strict';

const fastify = require('fastify')({ logger: true });
const fs = require('fs/promises');
const path = require('path');

class Api {
    constructor (port, autoStart = true) {
        this.port = port;
        this.loadRoutes().then((_) => {
            if (autoStart) this.startApi();
        }).catch((error) => fastify.log.error(error));
    }

    startApi () {
        fastify.listen(this.port).then((error, address) => {
            if (error) return fastify.log.error(error);
            fastify.log.info(`Server listening on ${address}`);
        });
    }

    async loadRoutes () {
        for (const route of (await fs.readdir(path.join(__dirname, '../routes')))) {
            if (!route.endsWith('.js')) continue;
            await fastify.register(require(`../routes/${route}`));
        }
    }
}

module.exports = Api;