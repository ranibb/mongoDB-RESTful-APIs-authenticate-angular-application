const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const db = "mongodb://rani:rani123@ds245512.mlab.com:45512/eventsdb"

mongoose.connect(db, err => {
    if(err) {
        console.error('Error!' + err)
    } else {
        console.log('Connected to mongodb');
    }
})

router.get('/', (req, res) => {
    res.send('From API route')
})

module.exports = router;