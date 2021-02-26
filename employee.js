const inqurier = require('inquirer');
const mysql = require('mysql'),
const server.js =require('./server')




// function to update employee
const addDepartment = () => {
    connection.query('INSERT into department  ', (err, res) => {
      if (err) throw err;
      console.log(res); // Array of rows of table
      res.forEach(({  }) => {
        console.log(`${id} | ${title} | ${artist} | ${genre}`);
      });
      console.log('-----------------------------------');
    });
  };

// function add roles


//function to add employees

//fucntion to view all department
  const viewAllDepartment = () => {
    connection.query('SELECT * from department', (err, res) => {
      if (err) throw err;
      console.log(res); // Array of rows of table
      res.forEach(({  }) => {
        console.log(`${id} | ${name} `);
      });
      console.log('-----------------------------------');
    });
  };

//function to view all roles
const viewAllRole= () => {
    connection.query('SELECT * from roles', (err, res) => {
      if (err) throw err;
      console.log(res); // Array of rows of table
      res.forEach(({  }) => {
        console.log(`${id} | ${title} | ${salary} | ${department_id} `);
      });
      console.log('-----------------------------------');
    });
  };

//function to view all employees


//Function to update employee roles.


//function to update employee's manager.

//function to view employees by manager.

//delete department.