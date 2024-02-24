const express = require('express');

require('dotenv').config();

const app = express();
const cors = require('cors');
const routes = require('./routes');
const db = require('./db');
const config = require('./config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: config.NODE_ENV === 'production' ? process.env.FRONTEND_URL : true,
  }),
);
app.use('/api', routes);

const port = config.PORT || 8080;

db.sync({ force: false }).then(() => {
  app.listen(config.PORT, config.HOST, () => {
    console.log(`Example app listening on port ${port}`);
  });
});

module.exports = app;
