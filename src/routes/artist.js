const express = require('express');
const artistController = require('../controllers/artist');
const albumsController = require('../controllers/albums');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Artist:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The ID of the artist
 *         name:
 *           type: string
 *           description: The name of the artist
 *         genre:
 *           type: string
 *           description: The genre of the artist's music
 *       required:
 *         - name
 *         - genre
 *     NewArtist:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the artist
 *         genre:
 *           type: string
 *           description: The genre of the artist's music
 *       required:
 *         - name
 *         - genre
 */

/**
 * @swagger
 * tags:
 *   name: Artists
 *   description: API endpoints for managing artists
 */

/**
 * @swagger
 * /artists:
 *   get:
 *     summary: Get all artists
 *     tags: [Artists]
 *     description: Retrieve a list of all artists
 *     responses:
 *       200:
 *         description: A list of artists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Artist'
 */
router.get('/', artistController.getAllArtists);

/**
 * @swagger
 * /artists/{id}:
 *   get:
 *     summary: Get an artist by ID
 *     tags: [Artists]
 *     description: Retrieve an artist by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the artist to retrieve
 *     responses:
 *       200:
 *         description: The requested artist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 *       404:
 *         description: The artist was not found
 */
router.get('/:id', artistController.getArtistById);

/**
 * @swagger
 * /artists:
 *   post:
 *     summary: Create a new artist
 *     tags: [Artists]
 *     description: Create a new artist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewArtist'
 *     responses:
 *       201:
 *         description: The created artist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 */
router.post('/', artistController.createArtist);

/**
 * @swagger
 * /artists/{id}:
 *   patch:
 *     summary: Update an artist
 *     tags: [Artists]
 *     description: Update an existing artist by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the artist to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateArtist'
 *     responses:
 *       200:
 *         description: The updated artist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 *       404:
 *         description: The artist was not found
 *
 *   delete:
 *     summary: Delete an artist
 *     tags: [Artists]
 *     description: Delete an existing artist by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the artist to delete
 *     responses:
 *       204:
 *         description: The artist was deleted
 *       404:
 *         description: The artist was not found
 */
router.patch('/:id', artistController.updateArtist);

/**
 * @swagger
 * /artists/{id}:
 *   delete:
 *     summary: Delete an artist
 *     tags: [Artists]
 *     description: Delete an existing artist by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the artist to delete
 *     responses:
 *       204:
 *         description: The artist was deleted
 *       404:
 *         description: The artist was not found
 */
router.delete('/:id', artistController.deleteArtist);

/**
 * @swagger
 * /artists/{id}/albums:
 *   post:
 *     summary: Create a new album for an artist
 *     tags: [Albums]
 *     description: Create a new album for an artist
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the artist to create an album for
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewAlbum'
 *     responses:
 *       201:
 *         description: The created album
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Album'
 *       404:
 *         description: The artist was not found
 */
router.post('/:id/albums', albumsController.createAlbum);

/**
 * @swagger
 * /artists/bulk:
 *   post:
 *     summary: Create multiple new albums for multiple artists
 *     tags: [Albums]
 *     description: Create multiple new albums for multiple artists
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 artistId:
 *                   type: string
 *                   description: The ID of the artist to create an album for
 *                 name:
 *                   type: string
 *                   description: The name of the album
 *                 year:
 *                   type: number
 *                   description: The year the album was released
 *     responses:
 *       201:
 *         description: The created albums
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Album'
 *       404:
 *         description: One or more artists were not found
 */
router.post('/bulk', albumsController.createAlbums);

module.exports = router;
