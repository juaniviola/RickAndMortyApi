import request from 'supertest';
import Server from '../server';

let server = new Server();

beforeAll(async () => {
  await server.start();
});

afterAll(async () => {
  await server.stop();
});

describe('Application', () => {
  it('should return 404 status code when get unexisting route', async () => {
    const response = await request(server.httpServer).get('/unexisting-route');
    expect(response.status).toBe(404);
  });
});
