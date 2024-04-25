const inquirer = require('inquirer');
const mysql = require('mysql2');
const {startApp} = require('../employee_management');

function addRole() {
  inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: 'Enter the title of the role:'
    },
    {
      name: 'salary',
      type: 'input',
      message: 'Enter the salary for the role:'
    },
    {
      name: 'department_id',
      type: 'input',
      message: 'Enter the department ID for the role:'
    }
  ]).then((answers) => {
    pool.query(
      'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
      [answers.title, answers.salary, answers.department_id],
      (error, results) => {
        if (error) {
          console.error('Error adding role:', error);
          return;
        }
        console.log('Role added successfully!');
        // Call startApp or other function to continue the app flow
      }
    );
  });
}

function viewRoles() {
  pool.query('SELECT * FROM role', (error, results) => {
    if (error) {
      console.error('Error fetching roles:', error);
      return;
    }
    console.table(results);
    // Call startApp or other function to continue the app flow
    startApp();
});
}

function deleteRole() {
    inquirer.prompt({
      name: 'roleId',
      type: 'input',
      message: 'Enter the ID of the role to delete:'
    }).then((answer) => {
      pool.query(
        'DELETE FROM role WHERE id = ?',
        [answer.roleId],
        (error, results) => {
          if (error) {
            console.error('Error deleting role:', error);
            return;
          }
          console.log('Role deleted successfully!');
          // Call startApp or other function to continue the app flow
        }
      );
    });
  }

module.exports = { addRole, viewRoles, deleteRole };
