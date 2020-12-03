'use strict';

/**
 * Transform database information to a connection String
 * @param {Object} information of database
 * @return {string} Connection string
 */
function getConnectionString ({ user, host, port, password, database }) {
    user = user || 'root';
    host = host || '127.0.0.1';
    database = database || 'mysql';
    return `mysql://${user}${password ? `:${password}` : ''}@${host}${port ? `:${port}` : ''}/${database}`;
}

/**
 * Convert connectionString to object of database information
 * @param connectionString
 * @return {Object}
 */
function getDatabaseInformation (connectionString) {
    return connectionString.match(/mysql:\/\/(?<user>\w*)(?::(?<password>.*))?@(?<host>.*?)(?::(?<port>\w*))?\/(?<database>\w*)/)?.groups;
}

/* Only for node.js v15
function getConnectionString ({ user, host, port, password, databaseName }) {
    user ||= 'root';
    host ||= '127.0.0.1';
    port ||= 3306;
    databaseName ||= 'mysql';
    return `mysql://${user}${password ? `:${password}` : ''}@${host}${port ? `:${port}` : ''}/${databaseName}`;
}*/

module.exports = {
    getDatabaseInformation,
    getConnectionString
};