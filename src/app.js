const express = require('express');
const artistRouter = require('./routes/artist');
const albumsRouter = require('./routes/album');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());

const options = {
  swaggerDefinition: {
    info: {
      title: 'Music Library',
      version: '1.0.0',
      description: 'A simple music library database API',
    },
  },
  apis: [path.join(__dirname, '/routes/*.js')],
};
const swaggerSpecs = swaggerJsdoc(options);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/artists', artistRouter);
app.use('/albums', albumsRouter);

app.get('/status', (req, res) => {
  return res.sendStatus(200).json({ status: 'OK' });
});

module.exports = app;
