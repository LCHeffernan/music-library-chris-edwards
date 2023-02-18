const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');

describe('create artist', () => {
  describe('/artists', () => {
    describe('POST', () => {
      it('creates a new artist in the database', async () => {
        const res = await await request(app).post('/artists');
        expect(res.status).to.equal(201);
      });
    });
  });
});
