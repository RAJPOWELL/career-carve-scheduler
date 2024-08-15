// backend/routes/sessionRoutes.js
const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.post('/', (req, res) => {
    const { student_id, mentor_id, duration, session_time } = req.body;

    if (!student_id || !mentor_id || !duration || !session_time) {
        return res.status(400).send('Missing required fields');
    }

    db.run('INSERT INTO sessions (student_id, mentor_id, duration, session_time) VALUES (?, ?, ?, ?)', [student_id, mentor_id, duration, session_time], function(err) {
        if (err) {
            console.error('Error inserting session:', err.message);
            return res.status(500).send(err.message);
        }
        res.json({ id: this.lastID });
    });
});

module.exports = router;
