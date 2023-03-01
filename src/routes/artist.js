const express = require('express');
const artistController = require('../controllers/artist');
const albumsController = require('../controllers/albums');

const router = express.Router();

router.post('/', artistController.createArtist);
router.post('/artist/:artistId', artistController.createArtist);
router.get('/', artistController.getAllArtists);
router.get('/:id', artistController.getArtistById);
router.patch('/:id', artistController.updateArtist);
router.delete('/:id', artistController.deleteArtist);
router.post('/:id/albums', albumsController.createAlbum);
router.post('/bulk', albumsController.createAlbums);

module.exports = router;
