const express = require('express');

require('dotenv').config();

const app = express();
const cors = require('cors');
const routes = require('./routes');
const db = require('./db');
const { HOST, PORT, FRONTEND_URL } = require('./config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: FRONTEND_URL,
  }),
);
app.use('/api', routes);

const port = PORT || 8080;

db.sync({ force: false }).then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`Example app listening on port ${port}`);
  });
});

module.exports = app;
