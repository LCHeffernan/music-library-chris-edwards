const express = require('express');
const artistRouter = require('./routes/artist');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());

app.get('/hello', (req, res) => {
  return res.status(200).json({ Message: 'Hello World!' });
});

app.use('/artists', artistRouter);

module.exports = app;
