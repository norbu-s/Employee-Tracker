const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");


// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "yourRootPassword",
  database: "employee_db",
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
  });
  
module.exports = connection;