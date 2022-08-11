import request from 'supertest';
import Server from '../server';
import redisCacheClient from '../../../src/dataSources/RedisCacheRepository';

let server = new Server();

beforeAll(async () => {
  await redisCacheClient.connect();
  await server.start();
});

afterAll(async () => {
  await server.stop();
  await redisCacheClient.close();
});

describe('Application', () => {
  it('should return 404 status code when get unexisting route', async () => {
    const response = await request(server.httpServer).get('/unexisting-route');
    expect(response.status).toBe(404);
  });
});
