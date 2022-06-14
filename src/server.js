"use strict";

require("dotenv").config();
let PORT = process.env.PORT || 4040;
const express = require("express");
const app = express();

const notFoundHandler = require("./middleware/404");
const errorHandler = require("./middleware/500");

const signInRouter = require('./auth/signIn');
const signUpRouter = require('./auth/signUp');

// app.use
app.use(express.json());
app.get('/', (req, res) => {
    res.send('The server is working successfully :) (; ');
})

app.use(express.urlencoded({ extended: true }));
app.use(signInRouter);
app.use(signUpRouter);

app.use("*", notFoundHandler);
app.use(errorHandler);

// start listening
function start(PORT) {
    app.listen(PORT, () => {
        console.log(`I am Listening and Running on port ${PORT}`);
    });
}
module.exports = {
    app: app,
    start: start,
};