import redisCacheClient from '../../src/dataSources/RedisCacheRepository';

beforeAll(async () => {
  await redisCacheClient.connect();
});

afterAll(async () => {
  await redisCacheClient.close();
});

describe('Redis cache', () => {
  const key = 'data';
  const data = { data1: 1, data2: 2 };

  it('should save data', async () => {
    await redisCacheClient.set(key, data);
  });

  it('should get data stored previously', async () => {
    const response: any = await redisCacheClient.get(key);

    expect(response).toBeTruthy();
    expect(JSON.stringify(response)).toEqual(JSON.stringify(data));
  });
});