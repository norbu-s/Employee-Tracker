const mysql = require("mysql");
const inquirer = require("inquirer");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "yourRootPassword",
  database: "employeedb",
});

const postAuction = () => {
  // prompt for info about the item being put up for auction
  inquirer.prompt({
    name: "mainOption",
    type: "list",
    message: "What would you like to do today?",
    choices: [
      "Add a new department",
      "Add a new role",
      "Add a new employee",
      "View all deprtments",
      "View all role",
      "View all employees",
      "Update an employees role",
      "update an employees manager",
      "View employees by manager",
    ],
  })
  .then((answer) => {
      switch
  }
};

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  queryAllSongs();
  queryDanceSongs();
  addDanceSong();
  connection.end();
});
