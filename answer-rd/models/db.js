const mysql = require("mysql");

// 配置数据库连接池
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "8.141.153.140",
    user: "root",
    password: "875213liu!",
    database: "myblog",
});

module.exports = {
    query: function(sql, params) {
        return new Promise(function(resolve, reject) {
            pool.getConnection(function(err, connection) {
                if (err) reject(err); // not connected!
                connection.query(sql, params, function(error, results, fields) {
                    connection.release();
                    if (error) reject(emyrror);
                    resolve(results);
                });
            });
        });
    }
};