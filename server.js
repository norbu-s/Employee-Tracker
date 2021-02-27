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

//Function to add new a new Department
const addDepartment = () => {
    inquirer.prompt([
        {
        name: "newDepartment",
        type: "input",
        message: "What is the name of the new department?"
        },
    ]).then((answer) => {
        const query = connection.query(
            'INSERT INTO department SET ?',
            {
            id:id,
            name: `${answer.newDepartment}`
            },
            (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} new Department created!\n`);
                updateProduct();
            }
    )});
      console.log('-----------------------------------');
}

// function add roles
const addRole = () => {
    inquirer.prompt([
        {
        name: "newRole",
        type: "input",
        message: "What is the name of the new role?"
        },
        {
         name: "newTitle",
         type: "input",
         message: "What is the name if the new Title"
        },
        {
        name: "newSalaray",
        type: "input",
        message: "What is the salary for this role"
        },
        {
        name: "deptId",
        type: "list",
        Choice:[ 
        "1 = Humanresource",
        "2 = Engineering",
        "3 = Risk",
        "4 = Mortgage Service",
        "5 = Back Office"
    ],
}
]).then((answer) => {const query = connection.query(
        'INSERT INTO role SET ?',
        {
        id: id,
          name: `${answer.newRole}`,
          title: `${answer.newTitle}`,
          salary: `${answer.newSalaray}`,
          department_id: `${answer.deptId}`
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} new Role created!\n`);
            updateRole();
        }
        )});
      console.log('-----------------------------------');
    }
    

// //function to add employees
const addEmployee = () => {
    inquirer.prompt([
        {
         name: "firstName",
         type: "input",
         message: "What is the first name of the employee"
        },
        {
        name: "lastname",
        type: "input",
        message: "What is the last name of the employee"
        },
        {
        name: "roleId",
        type: "choice",
        message: "What is the role id?"
        [
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
            "13 = Payments Lead"
        ]
        },
        {
        name: "roleId",
        type: "choice",
        message: "Who will the new Employee report too?"
        [
        "1 =  Humanresource Manager",
        "2 = Engineering Manager",
        "3 = Risk Manager",
        "4 = Mortgage Service Manager",
        "5 = Back Office Manger"
        ]
},
]).then((answer) => {const query = connection.query(
    'INSERT INTO role SET ?',
    {
    id: id,
      name: `${answer.newRole}`,
      first_name: `${answer.firstName}`,
    last_name: `${answer.lastName}`,
      role_id: `${answer.roleId}`,
      manager_id: `${answer.managerID}`
    },
    (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} product inserted!\n`);
        updateRole();
    }
    )});
  console.log('-----------------------------------');
}

//fucntion to create new role
const query = connection.query(
        'INSERT INTO role SET ?',
        {
        id: id,
          name: `${answer.newRole}`,
          first_name: `${answer.firstName}`,
        last_name: `${answer.lastName}`,
          role_id: `${answer.roleId}`,
          manager_id: `${answer.managerID}`
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} product inserted!\n`);
            updateRole();
        }
      );
      console.log('-----------------------------------');
};

//fucntion to view all department
  const viewDepartment = () => {
    connection.query('SELECT * from department', (err, res) => {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
      });
      console.log('-----------------------------------');
    };

//function to view all roles
const viewRole= () => {
    connection.query('SELECT * from roles', (err, res) => {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
      });
      console.log('-----------------------------------');
    };


//function to view all employees
const viewEmployee= () => {
    connection.query('SELECT * from employee', (err, res) => {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
      });
    };

//Function to update employee roles.
const updateRole= () => {
    connection.query('SELECT * from employee', (err, res) => {
      if (err) throw err;

      res.forEach(({  }) => {
        console.log(`${id} | ${first_name} | ${last_name} | ${role_id} | ${manager_id} `);
      });
      console.log('-----------------------------------');
    });
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
//   mainPrompt();
  addDepartment();clear
  addRole();
  viewDepartment();
  viewRole();
  viewEmployee();
  updateRole();
  updateEmployeeManager();
  viewEmployeeByManager();
  connection.end();
});

mainPrompt();