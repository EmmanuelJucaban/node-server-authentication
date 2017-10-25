const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./router.js');
const app = express();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/auth');

const PORT = process.env.PORT || 3000;

app.use(morgan('combined'));
app.use(bodyParser.json());

router(app);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
