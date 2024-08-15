// backend/routes/studentRoutes.js
const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.post('/', (req, res) => {
    const { name, area_of_interest } = req.body;
    db.run('INSERT INTO students (name, area_of_interest) VALUES (?, ?)', [name, area_of_interest], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json({ id: this.lastID, name, area_of_interest });
    });
});

module.exports = router;