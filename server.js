const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

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
  inquirer
    .prompt({
      name: "mainOption",
      type: "list",
      message: "What would you like to do today?",
      choices: [
        "Add a new department",
        "Add a new role",
        "Add a new employee",
        "View all departments",
        "View all role",
        "View all employees",
        "Update an employees role",
        "Update an employees manager",
        "View employees by manager",
      ],
    })
    .then((answer) => {
      switch (answer.mainOption) {
        case "Add a new department":
          addDepartment();
          break;
        case "Add a new role":
          addRole();
          break;
        case "Add a new employee":
          addEmployee();
          break;
        case "View all departments":
          viewAllDepartment();
          break;
        case "View all role":
          viewAllRole();
          break;
        case "View all employees":
          viewAllEmployee();
          break;
        case "Update an employees role":
          updateRole();
          break;
        // case "Exit application":
        //   console.log("Application closed.\n");
        //   setTimeout(() => {
        //     connection.end();
        //   }, 1000);
        //   break;
        default:
          console.log("Invalid action");
          break;
      }
    });
};
// Function to add new a new Department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "What is the name of the new department?",
      },
    ])
    .then((answer) => {
      const query = connection.query(
        "INSERT INTO department SET ?",
        {
          name: `${answer.newDepartment}`,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} new Department created!\n`);
          mainPrompt();
        }
      );
    });
};
console.log("----------------MENU-------------------");

// function add roles
const addRole = () => {
  inquirer
    .prompt([
      {
        name: "newTitle",
        type: "input",
        message: "What is the name if the new Title",
      },
      {
        name: "newSalary",
        type: "input",
        message: "What is the salary for this role",
      },
      {
        name: "deptId",
        type: "list",
        choices: ["1", "2", "3", "4", "5"],
      },
    ])
    .then((answer) => {
      const query = connection.query(
        "INSERT INTO role SET ?",
        {
          title: `${answer.newTitle}`,
          salary: `${answer.newSalary}`,
          department_id: `${answer.deptId}`,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} new Role created!\n`);
          mainPrompt();
        }
      );
    });
  console.log("-----------------------------------");
};

// //function to add employees
const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "EmployeeFirstName",
        type: "input",
        message: "What is the first name of the employee",
      },
      {
        name: "EmployeeLastName",
        type: "input",
        message: "What is the last name of the employee",
      },
      {
        name: "eRoleId",
        type: "list",
        message: "What is the employee's role id?",
        choices: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
        ],
      },
      {
        name: "managerId",
        type: "list",
        message: "Who will the new Employee report too?",
        choices: ["1", "2", "3", "4 ", "5"],
      },
    ])
    .then((answer) => {
      const query = connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: `${answer.EmployeeFirstName}`,
          last_name: `${answer.lastName}`,
          role_id: `${answer.roleId}`,
          manager_id: `${answer.managerId}`,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} product inserted!\n`);
          mainPrompt();
        }
      );
    });
  console.log("-----------------------------------");
};

//fucntion to view all department
const viewAllDepartment = () => {
  connection.query("SELECT * from department", (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    console.table("All Employees:", res);
    mainPrompt();
  });
  console.log("-----------------------------------");
};

//function to view all roles
const viewAllRole = () => {
  connection.query("SELECT * from role", (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    mainPrompt();
  });
  console.log("-----------------------------------");
};

//function to view all employees
const viewAllEmployee = () => {
  connection.query("SELECT * from employee", (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    mainPrompt();
  });
  console.log("-----------------------------------");
};

//Function to update employee roles.
const updateRole = () => {
  inquirer
    .prompt([
      {
        name: "newRoleId",
        type: "list",
        message: "What is the employees new role?",
        choices: [
          "1 = Humanresource Manager",
          "2 = Engineering Manager",
          "3 = Risk Manager",
          "4 = Mortgage Services Manager",
          "5 = Engineering Manager",
          "6 = Risk Manager",
          "7 = Mortgage Services Manager",
          "8 = Back office Manager",
          "9 = Assistant Manager",
          "10 = Tech Lead",
          "11 = Risk Lead",
          "12 = Credit Manager",
          "13 = Payments Lead",
        ],
      },
    ])
    .then((answer) => {
      const query = connection.query(
        "INSERT INTO role SET ?",
        {
          role_id: `${answer.newRoleId}`,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} role updated!\n`);
          mainPrompt();
        }
      );
    });
  console.log("-----------------------------------");
};

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

//   console.log(query.sql);

// //delete department.

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
});

mainPrompt();
