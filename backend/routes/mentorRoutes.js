// backend/routes/mentorRoutes.js
const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/', (req, res) => {
    db.all('SELECT * FROM mentors', [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows);
    });
});

router.post('/', (req, res) => {
    const { name, area_of_interest, available_time } = req.body;
    db.run('INSERT INTO mentors (name, area_of_interest, available_time) VALUES (?, ?, ?)', [name, area_of_interest, available_time], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json({ id: this.lastID, name, area_of_interest, available_time });
    });
});

module.exports = router;