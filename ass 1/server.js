const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to receive and validate form data
app.post('/api/submit', (req, res) => {
    const { name, email, password } = req.body;
    let errors = [];

    // Server-side validation
    if (!name || name.trim() === '') {
        errors.push("Name is required.");
    }
    
    // Simple email regex for validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Valid email is required.");
    }

    if (!password || password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: "Validation failed on the server.", errors });
    }

    // Success response (If this was real, you would save it to a DB)
    return res.status(200).json({ success: true, message: "Form submitted successfully! You are now registered." });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
