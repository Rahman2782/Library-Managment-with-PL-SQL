const oracledb = require('oracledb');
require('dotenv').config(); //for .env variables (db user/password)

oracledb.autoCommit = true; //auto commits every insert/update

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const connectS = process.env.CONNECT_STRING;

async function getConnection() {
    return await oracledb.getConnection({
        usern: username,
        password: password,
        connectString: connectS
    });
}

module.exports = { getConnection };
