'use strict';

const express = require('express');
const signupRouters = express.Router();
const { users } = require('./models/index');
const bcrypt = require('bcrypt');
const logger = require("./middleware/logger");

signupRouters.post('/signup', async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const record = await users.create(req.body);
        res.status(201).json(record);
    } catch (e) { res.status(403).send('User Name Error :( Try Another Username'); }

})

module.exports = signupRouters;