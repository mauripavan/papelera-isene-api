require('dotenv').config();

const express = require('express');

const app = express();
const cors = require('cors');
const volleyball = require('volleyball');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./models');
const db = require('./db');
const routes = require('./routes');
const { DB_HOST, DB_PORT, FRONTEND_URL } = require('./config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: FRONTEND_URL,
  }),
);

app.use(
  sessions({
    secret: 'papelera',
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    ((email, password, done) => {
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }

          return user.hash(password, user.salt).then((hash) => {
            if (hash !== user.password) {
              return done(null, false);
            }

            return done(null, user);
          });
        })
        .catch(done);
    }),
  ),
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch(done);
});

app.use(volleyball);
app.use('/api', routes);

// middleware error (error handler)
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send('Something failed!');
});

const port = DB_PORT;

db.sync({ force: false }).then(() => {
  app.listen(DB_PORT, DB_HOST, () => {
    console.log(`Example app listening on port ${port}`);
  });
});

module.exports = app;
