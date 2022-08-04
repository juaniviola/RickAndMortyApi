import request from 'supertest';
import Server from '../server';

let server = new Server();

beforeAll(async () => {
  await server.start();
});

afterAll(async () => {
  await server.stop();
});

// set timeout to 3.5s as maximum time allowed for the test
jest.setTimeout(3500);

describe('Character counter', () => {
  it('should return 200 status when get path /char_counter. With body with props [results, in_time, time, exercise_name]', async () => {
    const response = await request(server.httpServer).get('/char_counter');
    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('results');
    expect(response.body).toHaveProperty('in_time');
    expect(response.body).toHaveProperty('time');
    expect(response.body).toHaveProperty('exercise_name');

    expect(response.body.results.length).toBe(3);
    expect(response.body.in_time).toBe(true);
    expect(response.body.exercise_name).toMatch('Char Counter');
  });
});
