const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '7758521',
    database: 'ithubs'
})

module.exports = connection