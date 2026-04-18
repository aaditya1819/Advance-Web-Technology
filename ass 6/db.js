const mysql = require('mysql2');

// Configure your MySQL connection directly here
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // Change this to your MySQL username
  password: 'Bhikari@420',         // Change this to your MySQL password
  database: 'course_db' // The database we will create during setup
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed. Please ensure MySQL is running and credentials are correct.');
    console.error('Error details:', err.message);
    return;
  }
  console.log('Successfully connected to the MySQL Database ("course_db")!');
});

module.exports = connection;
