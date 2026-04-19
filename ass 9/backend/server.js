const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware to enable Cross-Origin Resource Sharing globally so Angular on :4200 can pull data smoothly
app.use(cors());

// Main GET endpoint to fetch students collection over API standards natively 
app.get('/api/students', (req, res) => {
  const studentsData = [
    { id: 1, name: "Alice Jenkins", course: "B.Tech", marks: 85 },
    { id: 2, name: "Bob Smith", course: "BCA", marks: 78 },
    { id: 3, name: "Charlie Chaplin", course: "MCA", marks: 92 },
    { id: 4, name: "David Johnson", course: "B.Sc", marks: 66 },
    { id: 5, name: "Eve Polastri", course: "B.Tech", marks: 81 }
  ];
  
  // Simulating an organic internet delay (1 second) to prominently debug & showcase Angular's Async Loading screen
  setTimeout(() => {
    res.json(studentsData);
  }, 1000); 
});

// Boot target logic
app.listen(PORT, () => {
  console.log(`Backend Server API is successfully running at http://localhost:${PORT}`);
});
