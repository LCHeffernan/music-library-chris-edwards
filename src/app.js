const express = require('express');
const artistRouter = require('./routes/artist');

const app = express();
app.use(express.json());

app.get('/hello', (req, res) => {
  return res.status(200).json({ Message: 'Hello World!' });
});

app.use('/artists', artistRouter);

module.exports = app;
