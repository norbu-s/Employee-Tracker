const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");
const {cli} = require('cli-ux')


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
        case "View employees by manager":
          viewEmployeeByManager();
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

//function to view all department
const viewAllDepartment = () => {
  console.log('Displaying all departments in the database...\n')
  connection.query("SELECT name from department", (err, res) => {
    if (err) throw err;
    // console.log(res);
    res.forEach(({ name}) => {
      console.log(`${name}`);
    });
    // console.log(query.sql);
mainPrompt();
  });
};


//function to view all roles
const viewAllRole = () => {
  console.log('Displaying all roles in the database...\n')
  connection.query("SELECT * from role", (err, res) => {
    if (err) throw err;
    // console.log(res);
    res.forEach(({ id, title, salary, department_id}) => {
      console.log(`${id} | ${title} | ${salary} | ${department_id}`);
    });
    // console.log(query.sql);
mainPrompt();
  });
};

//function to view all employees
const viewAllEmployee = () => {
  connection.query("SELECT * from employee", (err, res) => {
    if (err) throw err;
    // console.log(res);
    res.forEach(({ id, first_name, last_name,role_id,manager_id}) => {
      console.log(`${id} | ${first_name} | ${last_name} | ${role_id}| ${manager_id}`);
    });
    // console.log(query.sql);
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
      console.log('Adding new role to the database...\n')
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
        message: "What is the employee's role title?",
        choices: [
          "Humanresource Manager",
          "Engineering Manager",
          "Risk Manager",
          "Risk Manager",
          "Engineering Asst. Manager",
          "Risk Asst.Manager",
          "Mortgage Services Asst.Manager",
          "Back office Manager",
          "Assistant Manager",
          "Tech lead",
          "Risk Lead",
          "Credit Manager",
          "Payments Lead",
        ],
      },
      {
        name: "eManagerId",
        type: "list",
        message: "Who will the new Employee report too?",
        choices: ["1", "2", "3", "4 ", "5"],
      },
    ])
    .then((answer) => {
      console.log('Adding new employee to the database...\n')
      const query = connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: `${answer.EmployeeFirstName}`,
          last_name: `${answer.lastName}`,
          role_id: `${answer.eRoleId}`,
          manager_id: `${answer.eManagerId}`,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} new employee added to Database!\n`);
          mainPrompt();
        }
      );
    });
  console.log("-----------------------------------");
};

//Function to update employee roles.
const updateRole = () => {
  inquirer
    .prompt([
      viewAllEmployee(),
      {
        name: "newRoleId",
        type: "list",
        message: "What is the employees new role?",
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
    ])
    .then((answer) => {
      const query = connection.query(
        "UPDATE employee SET role_id =? WHERE id = ?"
     ,
        {
          id: `${answer.newRoleId}`
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
//     connection.query('
// ', (err, res) => {
//       if (err) throw err;

//       res.forEach(({  }) => {
//         console.log(`${id} | ${first_name} | ${last_name} | ${role_id} | ${manager_id} `);
//       });
//       console.log('-----------------------------------');
//     });
//   };

//function to view employees by manager.
const viewEmployeeByManager = () => {
  connection.query("Select id from employee where id = ? where = manager_id =?", (err, res) => {
    if (err) throw err;
    // console.log(res);
    res.forEach(({ id, first_name, last_name,manager_id}) => {
      console.log(`${id} | ${first_name} | ${last_name} |  ${manager_id}`);
    });
    // console.log(query.sql);
mainPrompt();
  });
};
//   console.log(query.sql);

// //delete department.

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
});

mainPrompt();
