const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /:
 *  get:
 *      description: Returns html for the default ExpressJS welcome page.
 *      responses:
 *          200:
 *              description: html content
 */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
