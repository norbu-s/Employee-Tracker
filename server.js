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
        "Exit"
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
        case "Update an employees role":
          viewEmployeeByManager();
          break;
        case "View employees by manager":
          viewEmployeeByManager();
          break;
  
        case 'Exit':
            connection.end();
            break;
        default:
          console.log("Invalid action");
          break;
      }
    });
};

//function to view all department
const viewAllDepartment = () => {
  console.log('Displaying all departments in the database...\n')
  connection.query("SELECT id, name As Department from department", (err, res) => {
    if (err) throw err;
    console.table(res);
    console.log("===================MAIN MENU==================");
mainPrompt();
  });
};


//function to view all roles
const viewAllRole = () => {
  console.log('Displaying all roles in the database...\n')
  connection.query("SELECT r.id, title, salary, name AS department FROM role r LEFT JOIN department d ON department_id = d.id", (err, res) => {
    if (err) throw err;
    console.table(res);
    console.log("===================MAIN MENU==================");
mainPrompt();
  });
};

//function to view all employees
const viewAllEmployee = () => {
  const query = connection.query('SELECT e.id, e.first_name AS First_Name, e.last_name AS Last_Name, title AS Title, salary AS Salary, name AS Department, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id', (err, res) => {
    if (err) throw err;
    console.table(res);
    console.log("===================MAIN MENU==================");
mainPrompt();
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
      console.log('Adding new department to the database...\n')
      const query = connection.query(
        "INSERT INTO department SET?",
        {
          name: `${answer.newDepartment}`,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${answer.newDepartment} new Department created!\n`);
          console.log("===================MAIN MENU==================");
          mainPrompt();
        }
      );
    });
};

//Add role
async function addRole() {
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
        name: "department",
        type: "list",
        message: "Which department does this role belong to?",
        choices: "department"
      },
    ])
    .then((answer) => {
      console.log('Adding new role to the database...\n')
      const query = connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?)",
        {
          title: `${answer.newTitle}`,
          salary: `${answer.newSalary}`,
          department: `${answer.department}`,
        },
        (err, res) => {
          if (err) throw err;
          console.table(`${answer.newTitle} new Role created for ${answer.dept}!\n`);
          console.log("===================MAIN MENU==================");
          mainPrompt();
        }
      );
    });
};


// //function to add employees
async function addEmployee() {
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
    ])
    .then((answer) => {
      console.log('Adding new employee to the database...\n')
      const query = connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: `${answer.EmployeeFirstName}`,
          last_name: `${answer.lastName}`,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} new employee added to Database!\n`);
          console.log("===================MAIN MENU==================");
          mainPrompt();
        }
      );
    });
};


//Function to update employee roles.
async function updateRole() {
  inquirer
    .prompt([
      // viewAllEmployee(),
      {
        name: "employeeName",
        type: "list",
        message: "Select the employee to update the role",
        choices:
         employee.map(obj =>obj.name)
      },
      {
        name: "newRoleId",
        type: "list",
        message: "Select the employee to update the role",
        choices: [

        ]
      
      },
    ])
    .then((answer) => {
      const query = connection.query(
        'UPDATE role SET ? WHERE ?',
        [roleId,employeeID],
        {
          title: `${answer.newRoleId}`
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} role updated!\n`);
          mainPrompt();
        }
      );
    });
};
console.log("===================MAIN MENU==================");


connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
});

mainPrompt();
