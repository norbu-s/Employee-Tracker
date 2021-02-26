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

const mainPrompt = () => {
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
      "Update an employees manager",
      "View employees by manager",
    ],
  })
  .then((answer) => {
    if (answer === 'Add a new department') {
        addDepartment();
    }
    if (answer === 'Add a new role') {
        addRole();
    }
    if (answer === 'Add a new employee') {
        addEmployee();
    }
    if (answer === 'View all deprtments') {
        viewDepartment();
    }
    if (answer === 'View all role') {
        viewRole();
    }
    if (answer === 'View all employees') {
        viewEmployee();
    }
    if (answer === 'Update an employees role') {
        updateRole();
    }
    if (answer === 'Update an employees manager') {
        updateEmployeeManager();
    }
    if (answer === 'View employees by manager') {
        viewEmployeeByManager();
    }
    else {
        connection.end();
    }
});


const addDepartment = () => {
    inquirer.prompt({
        name: "newDepartmenr",
        type: "input",
        message: "Please add a department?"
    });
     connection.query('INSERT into department', (err, res) => {
      if (err) throw err;
      res.forEach(({  }) => {
        console.log(`${id} | ${title} | ${artist} | ${genre}`);
      });
      console.log('-----------------------------------');
    });
  }}

// // function add roles
// const addRole = () => {
//     connection.query('INSERT into role', (err, res) => {
//       if (err) throw err;

//       res.forEach(({  }) => {
//         console.log(`${id} | ${title} | ${artist} | ${genre}`);
//       });
//       console.log('-----------------------------------');
//     });
//   };


// //function to add employees

// //fucntion to view all department
//   const viewDepartment = () => {
//     connection.query('SELECT * from department', (err, res) => {
//       if (err) throw err;

//       res.forEach(({  }) => {
//         console.log(`${id} | ${name} `);
//       });
//       console.log('-----------------------------------');
//     });
//   };

// //function to view all roles
// const viewRole= () => {
//     connection.query('SELECT * from roles', (err, res) => {
//       if (err) throw err;

//       res.forEach(({  }) => {
//         console.log(`${id} | ${title} | ${salary} | ${department_id} `);
//       });
//       console.log('-----------------------------------');
//     });
//   };

// //function to view all employees
// const viewEmployee= () => {
//     connection.query('SELECT * from employee', (err, res) => {
//       if (err) throw err;

//       res.forEach(({  }) => {
//         console.log(`${id} | ${first_name} | ${last_name} | ${role_id} | ${manager_id} `);
//       });
//       console.log('-----------------------------------');
//     });
//   };

// //Function to update employee roles.
// const updateRole= () => {
//     connection.query('SELECT * from employee', (err, res) => {
//       if (err) throw err;

//       res.forEach(({  }) => {
//         console.log(`${id} | ${first_name} | ${last_name} | ${role_id} | ${manager_id} `);
//       });
//       console.log('-----------------------------------');
//     });
//   };


// //function to update employee's manager.
// const updateEmployeeManager= () => {
//     connection.query('SELECT * from employee', (err, res) => {
//       if (err) throw err;

//       res.forEach(({  }) => {
//         console.log(`${id} | ${first_name} | ${last_name} | ${role_id} | ${manager_id} `);
//       });
//       console.log('-----------------------------------');
//     });
//   };


// //function to view employees by manager.
// const viewEmployeeByManager= () => {
//     connection.query('SELECT * from employee', (err, res) => {
//       if (err) throw err;

//       res.forEach(({  }) => {
//         console.log(`${id} | ${first_name} | ${last_name} | ${role_id} | ${manager_id} `);
//       });
//       console.log('-----------------------------------');
//     });
//   };

//   console.log(quey.sql);
// }
// //delete department.

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
//   mainPrompt();
//   addDepartment();clear
//   addRole();
//   viewDepartment();
//   viewRole();
//   viewEmployee();
//   updateRole();
//   updateEmployeeManager();
//   viewEmployeeByManager();
//   connection.end();
});

mainPrompt();