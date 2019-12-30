const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT;

module.exports = oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectString: process.env.DB_HOST
});