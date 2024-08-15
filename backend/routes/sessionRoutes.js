// backend/routes/sessionRoutes.js
const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.post('/', (req, res) => {
    const { student_id, mentor_id, duration, session_time } = req.body;
    db.run('INSERT INTO sessions (student_id, mentor_id, duration, session_time) VALUES (?, ?, ?, ?)', [student_id, mentor_id, duration, session_time], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json({ id: this.lastID });
    });
});

module.exports = router;