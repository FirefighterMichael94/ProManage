const inquirer = require('inquirer');
const mysql = require('mysql2');
const { startApp } = require('../employee_management');

function addEmployee() {
  inquirer.prompt([
    {
      name: 'firstName',
      type: 'input',
      message: 'Enter the first name of the employee:'
    },
    {
      name: 'lastName',
      type: 'input',
      message: 'Enter the last name of the employee:'
    },
    // Add more prompts for other employee details
  ]).then((answers) => {
    pool.query(
      'INSERT INTO employee (first_name, last_name) VALUES (?, ?)',
      [answers.firstName, answers.lastName],
      (error, results) => {
        if (error) {
          console.error('Error adding employee:', error);
          return;
        }
        console.log('Employee added successfully!');
        startApp();
        // Call startApp or other function to continue the app flow
      }
    );
  });
}

function viewEmployees() {
  pool.query('SELECT * FROM employee', (error, results) => {
    if (error) {
      console.error('Error fetching employees:', error);
      return;
    }
    console.table(results);
    // Call startApp or other function to continue the app flow
  });
}

function updateEmployeeRole() {
    // Prompt user for employee ID and new role ID
    inquirer.prompt([
      {
        name: 'employeeId',
        type: 'input',
        message: 'Enter the ID of the employee to update:'
      },
      {
        name: 'roleId',
        type: 'input',
        message: 'Enter the ID of the new role:'
      }
    ]).then((answers) => {
      // Update employee's role in the database
      pool.query(
        'UPDATE employee SET role_id = ? WHERE id = ?',
        [answers.roleId, answers.employeeId],
        (error, results) => {
          if (error) {
            console.error('Error updating employee role:', error);
            return;
          }
          console.log('Employee role updated successfully!');
          // Call startApp or other function to continue the app flow
        }
      );
    });
  }
  
function updateEmployeeManager() {
    // Prompt user for employee ID and new manager ID
    inquirer.prompt([
      {
        name: 'employeeId',
        type: 'input',
        message: 'Enter the ID of the employee to update:'
      },
      {
        name: 'managerId',
        type: 'input',
        message: 'Enter the ID of the new manager:'
      }
    ]).then((answers) => {
      // Update employee's manager in the database
      pool.query(
        'UPDATE employee SET manager_id = ? WHERE id = ?',
        [answers.managerId, answers.employeeId],
        (error, results) => {
          if (error) {
            console.error('Error updating employee manager:', error);
            return;
          }
          console.log('Employee manager updated successfully!');
          // Call startApp or other function to continue the app flow
        }
      );
    });
  }
  
function viewEmployeesByManager() {
    // Prompt user for manager ID
    inquirer.prompt({
      name: 'managerId',
      type: 'input',
      message: 'Enter the ID of the manager to view employees for:'
    }).then((answer) => {
      // Query database to get employees by manager ID
      pool.query(
        'SELECT * FROM employee WHERE manager_id = ?',
        [answer.managerId],
        (error, results) => {
          if (error) {
            console.error('Error fetching employees by manager:', error);
            return;
          }
          console.table(results);
          // Call startApp or other function to continue the app flow
        }
      );
    });
  }
  
function viewEmployeesByDepartment() {
    // Prompt user for department ID
    inquirer.prompt({
      name: 'departmentId',
      type: 'input',
      message: 'Enter the ID of the department to view employees for:'
    }).then((answer) => {
      // Query database to get employees by department ID
      pool.query(
        'SELECT * FROM employee WHERE department_id = ?',
        [answer.departmentId],
        (error, results) => {
          if (error) {
            console.error('Error fetching employees by department:', error);
            return;
          }
          console.table(results);
          // Call startApp or other function to continue the app flow
        }
      );
    });
  }
  
function deleteEmployee() {
    // Prompt user for employee ID
    inquirer.prompt({
      name: 'employeeId',
      type: 'input',
      message: 'Enter the ID of the employee to delete:'
    }).then((answer) => {
      // Delete employee from the database
      pool.query(
        'DELETE FROM employee WHERE id = ?',
        [answer.employeeId],
        (error, results) => {
          if (error) {
            console.error('Error deleting employee:', error);
            return;
          }
          console.log('Employee deleted successfully!');
          // Call startApp or other function to continue the app flow
        }
      );
    });
  }
  
  module.exports = { addEmployee, viewEmployees , updateEmployeeRole, updateEmployeeManager, viewEmployeesByManager, viewEmployeesByDepartment, deleteEmployee };


