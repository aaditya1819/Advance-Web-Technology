-- RUN THESE COMMANDS IN YOUR MYSQL WORKBENCH OR CLI

-- 1. Create the Database
CREATE DATABASE IF NOT EXISTS course_db;

-- 2. Switch to the newly created database
USE course_db;

-- 3. Create the Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL,
    instructor_name VARCHAR(255) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    fees DECIMAL(10, 2) NOT NULL
);

-- Note: You can optionally add test data here:
-- INSERT INTO courses (course_name, instructor_name, duration, fees) VALUES ('Intro to React', 'John Doe', '3 Months', 150.00); 
