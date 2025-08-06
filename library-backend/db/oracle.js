const oracledb = require('oracledb');

oracledb.autoCommit = true; //auto commits every insert/update

async function getConnection() {
    console.log('DB_USERNAME:', process.env.DB_USERNAME);
    console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : 'undefined');
    console.log('DB_CONNECT_STRING:', process.env.DB_CONNECT_STRING);
    
    return await oracledb.getConnection({
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        connectString: process.env.DB_CONNECT_STRING,
    });
}

module.exports = { getConnection };
