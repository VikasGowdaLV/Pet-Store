const util = require('util');
const mysql = require('mysql');
/**
 * Connection to the database.
 *  */
const mySql = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root', // use your mysql username.
    password: 'password', // user your mysql password.
    database: 'petstore'
});

mySql.getConnection((err, connection) => {
    if(err) 
        console.error("Something went wrong connecting to the database ...");
    
    if(connection)
        connection.release();
    return;
});

mySql.query = util.promisify(mySql.query);

module.exports = mySql;