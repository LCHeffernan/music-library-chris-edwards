const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');
const { it } = require('mocha');

describe('Albums Endpoints', () => {
  let artistId;

  beforeEach(async () => {
    await db.query('DELETE FROM Albums');
    await db.query('DELETE FROM Artists');
    const { rows } = await db.query(
      'INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *',
      ['Led Zeppelin', 'Rock']
    );
    artistId = rows[0].id;
  });

  describe('POST /artists/:artistId/albums', () => {
    it('creates a new album', async () => {
      const res = await request(app)
        .post(`/artists/${artistId}/albums`)
        .send({
          name: 'Double Fantasy',
          year: 1980,
          artistId: artistId,
        })
        .expect(201);
      expect(res.body).toMatchObject({
        id: expect.any(Number),
        name: 'Double Fantasy',
        year: 1980,
        artistId,
      });
    });

    it('returns an error if album creation fails', async () => {
      await request(app)
        .post(`/artists/${artistId}/albums`)
        .send({
          name: 'Invalid Album',
          year: 'not a year',
          artistId,
        })
        .expect(400, {
          message: 'Failed to create album',
        });
    });
  });
});
