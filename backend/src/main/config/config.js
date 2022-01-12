module.exports = {
    development: {
        username: 'root',
        password: 'password',
        database: 'inventory_tracking_backend',
        host: 'localhost',
        dialect: 'mysql',
    },
    production: {
        username: 'root',
        password: null,
        database: 'inventory_tracking_backend',
        host: 'localhost',
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
    },  
};