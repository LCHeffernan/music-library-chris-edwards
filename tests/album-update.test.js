const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Update Album', () => {
  let album;

  beforeEach(async () => {
    const { rows } = await db.query(
      'INSERT INTO Albums (name, year) VALUES($1, $2) RETURNING *',
      ['Trilogy: Past, Present & Future', 1918]
    );
    album = rows[0];
  });

  describe('PATCH /albums/:id', () => {
    it('updates the artist and returns the updated record', async () => {
      const { status, body } = await request(app)
        .patch(`/albums/${album.id}`)
        .send({ name: 'Trilogy: Past, Present and Future', year: 1978 });

      expect(status).to.equal(200);
      expect(body).to.deep.equal({
        id: album.id,
        name: 'Trilogy: Past, Present and Future',
        year: 1978,
      });
    });

    it('returns a 404 if the artist does not exist', async () => {
      const { status, body } = await request(app)
        .patch('/albums/99999999')
        .send({ name: 'Frankie Sinatra', year: 42789 });

      expect(status).to.equal(404);
      expect(body.message).to.equal('Album 99999999 does not exist');
    });
  });
});
