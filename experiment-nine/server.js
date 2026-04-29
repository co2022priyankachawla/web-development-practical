const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as template engine
app.set('view engine', 'ejs');

// Routes

// Static page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Dynamic page
app.get('/form', (req, res) => {
    res.render('form');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name } = req.body;

    res.send(`
        <h1>Hello, ${name}!</h1>
        <p>Form submitted successfully.</p>
        <a href="/form">Go Back</a>
    `);
});

// Start server
app.listen(3000, () => {
    console.log('🚀 Server running on http://localhost:3000');
});
