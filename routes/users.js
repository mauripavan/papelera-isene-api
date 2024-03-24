const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const usersRouter = express.Router();
const { User } = require('../models');

// Register new user
usersRouter.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).send({ error: 'Ya existe un usuario con ese email.' });
    } else {
      next(error);
    }
  }
});

// Login user

usersRouter.post('/login', async (req, res) => {
  // eslint-disable-next-line consistent-return
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).send({ error: 'Authentication failed' });
    }
    req.login(user, { session: false }, (error) => {
      if (error) {
        res.send(error);
      }
      const token = jwt.sign(user.toJSON(), JWT_SECRET);
      return res.json({ user, token });
    });
  })(req, res);
});

module.exports = usersRouter;
