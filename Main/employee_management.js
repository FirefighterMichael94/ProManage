const mysql = require('mysql2');
const inquirer = require('inquirer');
const { addDepartment, viewDepartments, deleteDepartment, viewDepartmentBudget  } = require('./api/departments');
const { addRole, viewRoles, deleteRole} = require('./api/roles');
const { addEmployee, viewEmployees , updateEmployeeRole, updateEmployeeManager, viewEmployeesByManager, viewEmployeesByDepartment, deleteEmployee } = require('./api/employees');


// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'employee_management_db'
}).promise(); // Upgrade connection to use promises

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database.');
});

// Function to start the application
function startApp() {
  // Display options menu
  inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Update employee manager',
      'View employees by manager',
      'View employees by department',
      'Delete a department',
      'Delete a role',
      'Delete an employee',
      'View total utilized budget of a department',
      'Exit'
    ]
  }).then((answer) => {
    // Handle user selection
    switch (answer.action) {
      case 'View all departments':
        viewDepartments();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'Update employee manager':
        updateEmployeeManager();
        break;
      case 'View employees by manager':
        viewEmployeesByManager();
        break;
      case 'View employees by department':
        viewEmployeesByDepartment();
        break;
      case 'Delete a department':
        deleteDepartment();
        break;
      case 'Delete a role':
        deleteRole();
        break;
      case 'Delete an employee':
        deleteEmployee();
        break;
      case 'View total utilized budget of a department':
        viewDepartmentBudget();
        break;
      case 'Exit':
        connection.end();
        break;
    }
  });
}

startApp();

module.exports = { startApp };
