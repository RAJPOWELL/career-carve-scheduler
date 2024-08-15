// backend/routes/authRoutes.js
const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Signup route
router.post('/signup', (req, res) => {
    const { name, area_of_interest, role } = req.body;
    const table = role === 'mentor' ? 'mentors' : 'students';
    
    db.run(`INSERT INTO ${table} (name, area_of_interest) VALUES (?, ?)`, [name, area_of_interest], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json({ id: this.lastID, name, area_of_interest });
    });
});

// Login route
router.post('/login', (req, res) => {
    const { name, role } = req.body;
    const table = role === 'mentor' ? 'mentors' : 'students';

    db.get(`SELECT * FROM ${table} WHERE name = ?`, [name], (err, row) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (row) {
            res.json(row);
        } else {
            res.status(404).send('User not found');
        }
    });
});

module.exports = router;