const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /:
 *  get:
 *      description: Returns status page.
 *      responses:
 *          200:
 *              description: status page
 */
router.get('/status', function (req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
