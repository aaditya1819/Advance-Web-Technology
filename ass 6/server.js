const express = require('express');
const db = require('./db');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// ============================================
// REST API Endpoints for Course Management
// ============================================

// 1. GET /courses (View all courses)
app.get('/courses', (req, res) => {
    const query = 'SELECT * FROM courses ORDER BY id DESC';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

// 2. POST /courses (Add a new course)
app.post('/courses', (req, res) => {
    const { courseName, instructorName, duration, fees } = req.body;
    
    // Quick validation
    if (!courseName || !instructorName || !duration || !fees) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = 'INSERT INTO courses (course_name, instructor_name, duration, fees) VALUES (?, ?, ?, ?)';
    db.query(query, [courseName, instructorName, duration, fees], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to insert data' });
        }
        res.status(201).json({ message: 'Course added successfully!', id: result.insertId });
    });
});

// 3. PUT /courses/:id (Update course details)
app.put('/courses/:id', (req, res) => {
    const { id } = req.params;
    const { courseName, instructorName, duration, fees } = req.body;

    const query = 'UPDATE courses SET course_name = ?, instructor_name = ?, duration = ?, fees = ? WHERE id = ?';
    db.query(query, [courseName, instructorName, duration, fees, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update course' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json({ message: 'Course updated successfully!' });
    });
});

// 4. DELETE /courses/:id (Delete a course)
app.delete('/courses/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM courses WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete course' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json({ message: 'Course deleted successfully!' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Course Management System is running on http://localhost:${port}`);
});
