const express = require('express');
const passport = require('passport');

const usersRouter = express.Router();
const { User } = require('../models');

// Register new user
usersRouter.post('/', async (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch(next);
});

// Login user
usersRouter.post(
  '/login',
  passport.authenticate('local'),
  async (req, res, next) => res.send(req.user).catch(next),
);

// Logout user
usersRouter.post('/logout', async (req, res, next) => {
  req.logOut();
  res.sendStatus(200).catch(next);
});

module.exports = usersRouter;
