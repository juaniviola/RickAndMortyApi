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

// set timeout to 3.5s as maximum time allowed for the test
jest.setTimeout(3500);

describe('Episode Locations', () => {
  it('should return 200 status when get path /episodes_location. With body with props [results, in_time, time, exercise_name]', async () => {
    const response = await request(server.httpServer).get('/episodes_location');
    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('results');
    expect(response.body).toHaveProperty('in_time');
    expect(response.body).toHaveProperty('time');
    expect(response.body).toHaveProperty('exercise_name');

    expect(response.body.results.length).toBeGreaterThan(0);
    expect(response.body.in_time).toBe(true);
    expect(response.body.exercise_name).toMatch('Episode locations');
  });
});
