'use strict';

const { users } = require("../models/index");
const bcrypt = require('bcrypt');
const base64 = require('base-64');

async function basicAuth(req, res, next) {
  if (req.headers.authorization) {
    let basicHeaderParts = req.headers.authorization.split(' ');
    let encodedString = basicHeaderParts.pop();
    let decodedString = base64.decode(encodedString);
    let [username, password] = decodedString.split(':');
    try {
      const user = await users.findOne({ where: { username: username } });
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        req.user = user;
        next();
      }
      else {
        next('Invalid Password')
      }
    } catch (error) { next('Invalid Username') }
  }
}

module.exports = basicAuth;