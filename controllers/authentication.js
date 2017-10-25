const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/config');
const _ = require('lodash');

function tokenForUser(user) {
  return jwt.sign({ id: user.id}, config.secret);
};

exports.signin = async (req, res, next) => {
  res.send({token: tokenForUser(req.user) });
}

exports.signup = async (req, res, next) => {
  const body = _.pick(req.body, ['email', 'password']);
  try {
    const existingUser = await User.findOne({email: body.email});
    if (existingUser) {
      return res.status(422).send({error: 'User already exists'});
    }
    const user = new User(body);
    await user.save();
    res.json({ token: tokenForUser(user) });
  } catch (e) {
    res.status(422).send(e);
  }
};
