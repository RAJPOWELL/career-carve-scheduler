// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const studentRoutes = require('./routes/studentRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create tables if they don't exist or modify if needed
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS mentors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        company_name TEXT,
        password TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        password TEXT 
    )`);

    // Add the area_of_interest column to students if it doesn't exist
    db.run(`ALTER TABLE students ADD COLUMN area_of_interest TEXT`);

    db.run(`CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER,
        mentor_id INTEGER,
        duration INTEGER,
        session_time TEXT,
        FOREIGN KEY (student_id) REFERENCES students(id),
        FOREIGN KEY (mentor_id) REFERENCES mentors(id)
    )`);
});

app.use('/api/auth', authRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/sessions', sessionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
