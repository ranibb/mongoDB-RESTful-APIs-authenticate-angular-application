const express = require('express');
const router = express.Router();
const User = require('../models/user');
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

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if(error) {
            console.log(error);
        } else {
            res.status(200).send(registeredUser)
        } 
    })
})

module.exports = router;