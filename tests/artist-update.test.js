const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Update Album', () => {
  let artist;

  beforeEach(async () => {
    const { rows } = await db.query(
      'INSERT INTO Artists (name, genre) VALUES($1, $2) RETURNING *',
      ['Frank Sinatra', 'Jazz']
    );
    artist = rows[0];
  });

  describe('PATCH /albums/:id', () => {
    it('updates the artist and returns the updated record', async () => {
      const { status, body } = await request(app)
        .patch(`/artists/${artist.id}`)
        .send({ name: 'Frankie Sinatra', genre: 'Easy Listening' });

      expect(status).to.equal(200);
      expect(body).to.deep.equal({
        id: artist.id,
        name: 'Frankie Sinatra',
        genre: 'Easy Listening',
      });
    });

    it('returns a 404 if the artist does not exist', async () => {
      const { status, body } = await request(app)
        .patch('/artists/99999999')
        .send({ name: 'Frankie Sinatra', genre: 'Easy Listening' });

      expect(status).to.equal(404);
      expect(body.message).to.equal('Artist 99999999 does not exist');
    });
  });
});
