# Assignment 6: Course Management System (Node.js & MySQL)

## Title
Development of a CRUD-based Course Management System using Node.js, Express.js, and MySQL.

## Aim
To design, implement, and test a full-stack REST API capable of performing database operations persistently using a relational MySQL structural model alongside a synchronized browser frontend. 

## Objective
- To deploy a custom **Node.js/Express** backend establishing an asynchronous interface with a **MySQL** relational database using the `mysql2` driver.
- To execute parameterized SQL queries corresponding directly with unified HTTP REST methods (`GET`, `POST`, `PUT`, `DELETE`).
- To construct a streamlined responsive HTML/JS frontend that consumes the API dynamically using JavaScript's native Promise-based `fetch()`.

## Theory 
- **Node.js & Express.js**: Express is a lightweight robust backend framework functioning natively inside Node.js; it routes structurally requested URLs dynamically resolving executions toward endpoints.
- **MySQL & Relational Databases**: MySQL is a prominent, strict SQL management module using interconnected tables organizing definitive constraints. Connections within Node interpret SQL statements executing data manifestations.
- **CRUD Principles**: Represents the exact mapping logic universally governing storage systems and stateless models alike—Create (POST), Read (GET), Update (PUT), and Delete (DELETE).

## Tools Used
- Node.js (Runtime Architecture)
- Express.js (REST API Network Layer)
- MySQL Database / Workbench
- `mysql2` package (Driver Connection)
- HTML/CSS/Vanilla JS (Frontend UI Visualization)
- Postman (Raw API testing simulator)

## Procedure
1. Initialize the project mapping via `npm init -y` and executing dependency installs (`express`, `mysql2`).
2. Construct the logical table representation using MySQL creating database `course_db` featuring columns for IDs, Names, Instructors, Durations, and numeric Fees.
3. Establish connections utilizing `mysql.createConnection` nested transparently within `db.js`.
4. Create the core controller logic mapped against the `server.js` executing standardized CRUD `db.query(...)` implementations guarding against injection errors.
5. Create modern HTML CSS views embedding DOM injections triggered inherently by asynchronous window `fetch` configurations spanning `/public` directories.
6. Serve static files cleanly via Express middleware booting the ecosystem at port 3000 mapping frontends and API architectures unified.

## Code Snippets

**Database Query Execution (Add Course - POST):**
```javascript
app.post('/courses', (req, res) => {
    const { courseName, instructorName, duration, fees } = req.body;
    const query = 'INSERT INTO courses (course_name, instructor_name, duration, fees) VALUES (?, ?, ?, ?)';
    
    db.query(query, [courseName, instructorName, duration, fees], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed' });
        res.status(201).json({ message: 'Course added', id: result.insertId });
    });
});
```

**Frontend Fetch Resolution:**
```javascript
const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(courseData)
});
```

## Output Verification

### Frontend Web UI Output
- **[Placeholder 1: Image of styled Add Course Panel layout]**
- **[Placeholder 2: Image of graphical data-table listing items containing action Edit/Delete buttons dynamically rendering.]**
- **[Placeholder 3: Visual instance representing a greenish Success Confirmation toast reading: 'Course Added']**

### Postman Test Flow Output (Backend Isolated test):
- **Body**: `{ "courseName": "History 101", "instructorName": "Mr. Roberts", "duration": "4 Months", "fees": 125.00 }`
- **Response status 201 Created**:
```json
{
  "message": "Course added successfully!",
  "id": 1
}
```

## Conclusion
The Course Management Ecosystem demonstrated scalable persistence bridging frontend and backend architecture fluidly. Utilizing native HTTP standardizations maps directly onto exact SQL queries enabling rich interface controls over stateful databases securely. 
