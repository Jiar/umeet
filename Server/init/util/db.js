const mysql = require('mysql')
const env = process.env.NODE_ENV || 'local'
const config = require('./../../config.json')[env]
const dbConfig = config.mysql

const pool = mysql.createPool({
    host: dbConfig.host,
    user: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database
})

let query = function (sql, values) {
    return new Promise( (resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if(err) {
                console.log(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if(err) {
                        console.log(err)
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

module.exports = {
    query
}