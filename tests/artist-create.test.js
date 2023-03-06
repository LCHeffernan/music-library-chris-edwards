const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('create artist', () => {
  describe('/artists', () => {
    describe('POST', () => {
      it('creates a new artist in the database', async () => {
        const { status, body } = await request(app).post('/artists').send({
          name: 'John Lennon',
          genre: 'rock & roll',
        });

        expect(status).to.equal(201);
        expect(body.name).to.equal('John Lennon');
        expect(body.genre).to.equal('rock & roll');

        const {
          rows: [artistData],
        } = await db.query(`SELECT * FROM Artists WHERE id = ${body.id}`);
        expect(artistData.name).to.equal('John Lennon');
        expect(artistData.genre).to.equal('rock & roll');
      });
    });
  });
});
