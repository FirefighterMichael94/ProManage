const express = require('express');
const mysql = require('mysql2');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3001;

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'employee_management_db',
  password: 'password',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to the employee management system!');
});

// Example route to run the Node.js application with Inquirer
app.post('/run-inquirer', (req, res) => {
  const { command } = req.body;

  // Execute the Node.js application with Inquirer
  const child = exec(command, (error, stdout, stderr) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    if (stderr) {
      res.status(500).json({ error: stderr });
      return;
    }
    res.status(200).json({ output: stdout });
  });

  // Log any errors
  child.on('error', (err) => {
    console.error('Error executing command:', err);
    res.status(500).json({ error: 'Error executing command' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
