import ResourceInterface from '../../src/core/entities/Resource';
import ResourcesDataSource from '../../src/dataSources/ResourceDataSource';
import redisCacheClient from '../../src/dataSources/RedisCacheRepository';

// set timeout to 3s as maximum time allowed for the test
jest.setTimeout(3000);

beforeAll(async () => {
  await redisCacheClient.connect();
});

afterAll(async () => {
  await redisCacheClient.close();
});

describe('ResourcesDataSource', () => {
  it('should return episode resources', async () => {
    const resource = 'episode';
    const quantity = 51;

    const resourcesDataSource = new ResourcesDataSource(redisCacheClient);
    const response: ResourceInterface[] = await resourcesDataSource.getAll(resource);

    expect(response.length).toBe(quantity);
  });
});
