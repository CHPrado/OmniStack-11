import request from 'supertest';

import connection from '../../src/database/connection';
import server from '../../src/server';

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(server)
      .post('/ongs')
      .send({
        name: 'APAD5',
        email: 'conta@teste.com',
        whatsapp: '34343111143',
        city: 'City Teste',
        uf: 'SC',
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
