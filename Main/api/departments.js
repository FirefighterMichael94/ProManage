const inquirer = require('inquirer');
const mysql = require('mysql2');
const {startApp} = require('../employee_management');

function addDepartment() {
  inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'Enter the name of the department:'
  }).then((answer) => {
    pool.query(
      'INSERT INTO department (name) VALUES (?)',
      [answer.name],
      (error, results) => {
        if (error) {
          console.error('Error adding department:', error);
          return;
        }
        console.log('Department added successfully!');
        // Call startApp or other function to continue the app flow
      }
    );
  });
}

function viewDepartments() {
  pool.query('SELECT * FROM department', (error, results) => {
    if (error) {
      console.error('Error fetching departments:', error);
      return;
    }
    console.table(results);
    // Call startApp or other function to continue the app flow
  });
}

function deleteDepartment() {
    inquirer.prompt({
      name: 'departmentId',
      type: 'input',
      message: 'Enter the ID of the department to delete:'
    }).then((answer) => {
      pool.query(
        'DELETE FROM department WHERE id = ?',
        [answer.departmentId],
        (error, results) => {
          if (error) {
            console.error('Error deleting department:', error);
            return;
          }
          console.log('Department deleted successfully!');
          // Call startApp or other function to continue the app flow
        }
      );
    });
  }
  
function viewDepartmentBudget() {
    // Prompt user for department ID
    inquirer.prompt({
      name: 'departmentId',
      type: 'input',
      message: 'Enter the ID of the department to view budget for:'
    }).then((answer) => {
      // Query database to calculate total department budget
      pool.query(
        'SELECT SUM(role.salary) AS total_budget FROM employee INNER JOIN role ON employee.role_id = role.id WHERE role.department_id = ?',
        [answer.departmentId],
        (error, results) => {
          if (error) {
            console.error('Error calculating department budget:', error);
            return;
          }
          const totalBudget = results[0].total_budget || 0; // Get the total budget or default to 0 if no results
          console.log(`Total budget for department ${answer.departmentId}: $${totalBudget}`);
          // Call startApp or other function to continue the app flow
          startApp();
        }
      );
    });
  }

module.exports = { addDepartment, viewDepartments, deleteDepartment, viewDepartmentBudget  };
