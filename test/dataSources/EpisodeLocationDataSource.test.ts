import EpisodeLocationDataSource from '../../src/dataSources/EpisodeDataSource';
import { EpisodeRepositoryResponse } from '../../src/core/repositories/EpisodesRepository';
import redisCacheClient from '../../src/dataSources/RedisCacheRepository';

// set timeout to 3s as maximum time allowed for the test
jest.setTimeout(3000);

beforeAll(async () => {
  await redisCacheClient.connect();
});

afterAll(async () => {
  await redisCacheClient.close();
});

describe('EpisodeLocationDataSource', () => {
  it('should return episode locations', async () => {
    const episodeQuantity = 51;

    const episodeLocationDataSource = new EpisodeLocationDataSource(redisCacheClient);
    const response: EpisodeRepositoryResponse = await episodeLocationDataSource.getAll();

    expect(Object.keys(response.episodes).length).toBe(episodeQuantity);
    expect(Object.keys(response.episodes).length).toBe(episodeQuantity);
    expect(Object.keys(response.characters).length).toBeGreaterThan(0);
  });
});
