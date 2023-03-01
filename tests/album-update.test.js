const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');
const { it } = require('mocha');

describe('Update Album', async () => {
  let artistId, albumId;

  beforeEach(async () => {
    await db.query('DELETE FROM Albums');
    await db.query('DELETE FROM Artists');
    const { rows } = await db.query(
      'INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *',
      ['Led Zeppelin', 'Rock']
    );
    artistId = rows[0].id;
  });

  const { rows } = await db.query(
    'INSERT INTO Albums (name, year, artist_id) VALUES($1, $2, $3) RETURNING *',
    ['Trilogy: Past, Present & Future', 1918, artistId]
  );
  albumId = rows[0].id;

  describe('PATCH /albums/:id', () => {
    it('updates the album and returns the updated record', async () => {
      const { status, body } = await request(app)
        .patch(`/albums/${albumId}`)
        .send({ name: 'Trilogy: Past, Present and Future', year: 1978 });

      expect(status).to.equal(200);
      expect(body).to.deep.equal({
        id: albumId,
        name: 'Trilogy: Past, Present and Future',
        year: 1978,
        artist_id: artistId,
      });
    });

    it('returns a 404 if the album does not exist', async () => {
      const { status, body } = await request(app)
        .patch('/albums/99999999')
        .send({ name: 'Frankie Sinatra', year: 42789 });

      expect(status).to.equal(404);
      expect(body.message).to.equal('Album 99999999 does not exist');
    });
  });
});
