'use strict';

const { getConnectionString } = require('./getConnectionString');
const mysql = require('mysql2/promise');

class Database {
    constructor({ host, user, database, password, port, options }) {
        this.credentials = {
            host, user, database, password, port
        };

        this.pool = mysql.createPool({
            ...this.credentials, ...options
        });
    }

    get connectionString() {
        return getConnectionString(this.credentials);
    }

    /**
     * Do prepared request
     * @param {String} request
     * @param {?} values
     */
    async preparedRequest (request, ...values) {
        return await this.pool.query(
            request, values.flat(1)
        );
    }

    /**
     * Do simple request
     * @param request
     * @return {Promise<?>}
     * @deprecated
     */
    async request (request) {
        return await this.pool.query(request);
    }
}

module.exports = Database;