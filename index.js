const express = require('express');

const app = express();
const cors = require('cors');
const routes = require('./routes');
const db = require('./db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: true, credentials: true }));
app.use('/api', routes);

db.sync({ force: false }).then(() => {
  app.listen(8080, () => {
    console.log('App listen on http://localhost:8080 🚀');
  });
});

module.exports = app;
