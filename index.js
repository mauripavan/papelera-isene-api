const express = require('express');
require('dotenv').config();

const app = express();
const cors = require('cors');
const routes = require('./routes');
const db = require('./db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: true, credentials: true }));
app.use('/api', routes);

const port = process.env.PORT || 4000;

db.sync({ force: false }).then(() => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`App listen on http://0.0.0.0:${port}  🚀`);
  });
});

module.exports = app;
