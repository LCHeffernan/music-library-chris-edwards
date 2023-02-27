const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Delete Album', () => {
  let album;
  beforeEach(async () => {
    const { rows } = await db.query(
      'INSERT INTO Albums (name, year) VALUES( $1, $2) RETURNING *',
      ['Britney Spears', 1996]
    );

    album = rows[0];
  });

  describe('DELETE /albums/{id}', () => {
    it('deletes the album and returns the deleted data', async () => {
      const { status, body } = await request(app)
        .delete(`/albums/${album.id}`)
        .send();

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album.id,
        name: 'Britney Spears',
        year: 1996,
      });
    });

    it('returns a 404 if the album does not exist', async () => {
      const { status, body } = await request(app)
        .delete('/albums/999999999')
        .send();

      expect(status).to.equal(404);
      expect(body.message).to.equal('The album ID: 999999999 does not exist');
    });
  });
});
