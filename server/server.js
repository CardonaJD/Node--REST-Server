require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/user'));

mongoose.connect(process.env.URLDB, {useNewUrlParser: true, useCreateIndex: true },
(error, resp) => {
  if (error) {
    throw error;
  }

  console.log('DB ONLINE');
});

app.listen(process.env.PORT, () => {
  console.log('Escuchando puerto ' + process.env.PORT);
});