const express = require('express');
const passport = require('passport');

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

// Get all users
usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
