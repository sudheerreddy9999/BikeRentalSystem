var mysql = require('mysql');
var pool  = mysql.createPool({
  port     : 3306,
  host     : "localhost",
  user     : "root",
  password : "1905",
  database : "bikerental",
  connectionlimit: 10
});

module.exports = pool;