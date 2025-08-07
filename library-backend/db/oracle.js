const oracledb = require('oracledb');

oracledb.autoCommit = true; //auto commits every insert/update

async function getConnection() {
    
    return await oracledb.getConnection({
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        connectString: process.env.DB_CONNECT_STRING,
    });
}

module.exports = { getConnection };
