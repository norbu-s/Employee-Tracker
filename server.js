const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("./DB/connection");

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
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.mainOption) {
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
        case "Add a new department":
          addDepartment();
          break;
        case "Add a new role":
          addRole();
          break;
        case "Add a new employee":
          addEmployee();
          break;
        case "Exit":
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
  console.log("Displaying all departments in the database...\n");
  connection.query(
    "SELECT id, name As Department from department",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      console.log("===================MAIN MENU==================");
      mainPrompt();
    }
  );
};

//function to view all roles
const viewAllRole = () => {
  console.log("Displaying all roles in the database...\n");
  connection.query(
    "SELECT r.id, title, salary, name AS department FROM role r LEFT JOIN department d ON department_id = d.id",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      mainPrompt();
    }
  );
};

//function to view all employees
const viewAllEmployee = () => {
  const query = connection.query(
    'SELECT e.id, e.first_name AS First_Name, e.last_name AS Last_Name, title AS Title, salary AS Salary, name AS Department, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id',
    (err, res) => {
      if (err) throw err;
      console.table(res);
      mainPrompt();
    }
  );
};

// Function to add new a new Department
addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "What is the name of the new department?",
      },
    ])
    .then((answer) => {
      console.log("Adding new department to the database...\n");
      const query = connection.query(
        "INSERT INTO department SET?",
        {
          name: `${answer.newDepartment}`,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${answer.newDepartment} new Department created!\n`);
          mainPrompt();
        }
      );
    });
};

//Add Role

addRole = () =>
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
        name: "departmentId",
        type: "list",
        message: "Which department does this role belong to? || 1 - Human Resource || 2 - Engineering || 3 - Risk || 4 - Mortgage Service || 5 - Back Office||",
        choices: ["1", "2", "3", "4", "5"], 
      },
    ])
    .then((answer) => {
      console.log("Adding new role to the database...\n");
      const query = connection.query(
        "INSERT INTO role (title, salary,department_Id) VALUES (?)",
        {
          title: `${answer.newTitle}`,
          salary: `${answer.newSalary}`,
          department_Id: `${answer.departmentId}`
        },
        (err, res) => {
          if (err) throw err;
          console.table(
            `${answer.newTitle} new role created for ${answer.departmentId} !\n`
          );
          console.log("===================MAIN MENU==================");
          mainPrompt();
        }
      );
    });

// //function to add employees
 addEmployee = () => {
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
        name: "roleId",
        type: "list",
        message: "What is the new employees role?  || 6 - Assistant Manager || 7 - Tech lead || 8 - Risk Lead || 9 - Credit Manager || 10 - Payments Lead||",
        choices: ["6", "7", "8", "9", "10"], 
      },
      {
        name: "managerId",
        type: "list",
        message: "Which manager will the new employee report too?  || 1 - Human Resource || 2 - Engineering || 3 - Risk || 4 - Mortgage Service || 5 - Back Office||",
        choices: ["1", "2", "3", "4", "5"], 
      },
    ])
    .then((answer) => {
      console.log("Adding new employee to the database...\n");
      const query = connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)",
        {
          first_name: `${answer.EmployeeFirstName}`,
          last_name: `${answer.EmployeeLastName}`,
          role_id:`${answer.roleId}`,
          manager_id:`${answer.managerId}`
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${answer.EmployeeFirstName} ${answer.EmployeeLastName} added to Database!\n`);
          console.log("===================MAIN MENU==================");
          mainPrompt();
        }
      );
    });
}

//Function to update employee roles.
 updateRole = () => {
  inquirer
    .prompt([
      {
        name: "employeeName",
        type: "list",
        message: "Select the employee to update the role",
        choices: [
          "John Done",
          "John doe",
          "Jane best",
          "James Martin",
          "James West",
          "Vincent Ng",
          "Eric Junior",
          "Melanie Walsh",
          "Mark Levy",
        ],
      },
      {
        name: "newRoleId",
        type: "list",
        message: "What is the new employees role?  || 6 - Assistant Manager || 7 - Tech lead || 8 - Risk Lead || 9 - Credit Manager || 10 - Payments Lead||",
        choices: ["6", "7", "8", "9", "10"], 
      },
    ])
    .then((answer) => {
      const query = connection.query(
        "UPDATE employee_db.employee SET role_id = ? = where id = id",
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
}
console.log("===================MAIN MENU==================");

mainPrompt();


// DELETE FROM `employee_db`.`role` WHERE (`id` = '22');