import request from 'supertest';
import Server from '../server';

let server = new Server();

beforeAll(async () => {
  await server.start();
});

afterAll(async () => {
  await server.stop();
});

jest.setTimeout(10000);

describe('Episode Locations', () => {
  it('should return 200 status when get path /. With body with length of 2', async () => {
    const response = await request(server.httpServer).get('/');
    expect(response.status).toBe(200);

    expect(response.body.length).toBe(2);
    expect(response.body[0].exercise_name).toMatch('Char Counter');
    expect(response.body[1].exercise_name).toMatch('Episode locations');
    expect(response.body[0].in_time).toBe(true);
    expect(response.body[1].in_time).toBe(true);
  });
});
