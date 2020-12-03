const Api = require('./api/classes/Api');

const api = new Api(2485, true, {
    connectionString: 'mysql://root:root@127.',
    options: {
        queueLimit: 0
    }
});