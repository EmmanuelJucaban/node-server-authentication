const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./router.js');
const app = express();

router(app);

mongoose.connect('mongodb://localhost/auth');

const PORT = process.env.PORT || 3000;

app.use(morgan('combined'));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
