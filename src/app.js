const express = require('express');
const artistRouter = require('./routes/artist');
const albumsRouter = require('./routes/album');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());

app.use('/artists', artistRouter);
app.use('/albums', albumsRouter);

app.get('/status', (req, res) => {
  return res.sendStatus(200);
});

module.exports = app;
