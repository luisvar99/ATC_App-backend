const {Pool} = require('pg');
const {config} = require('dotenv');
config();

const db = new Pool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    max: 100
    
/*     ssl: {
        rejectUnauthorized: false,
    },  */}
);

module.exports = {db};