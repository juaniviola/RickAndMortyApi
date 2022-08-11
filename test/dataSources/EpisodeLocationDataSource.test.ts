import EpisodeLocationDataSource from '../../src/dataSources/EpisodeDataSource';
import EpisodeLocationResponse from '../../src/core/interactors/EpisodeLocations/EpisodeLocationResponse';

// set timeout to 3s as maximum time allowed for the test
jest.setTimeout(3000);

describe('EpisodeLocationDataSource', () => {
  it('should return episode locations', async () => {
    const episodeQuantity = 51;

    const episodeLocationDataSource = new EpisodeLocationDataSource();
    const response: EpisodeLocationResponse = await episodeLocationDataSource.getAll();

    expect(Object.keys(response.episodeNames).length).toBe(episodeQuantity);
    expect(Object.keys(response.episodes).length).toBe(episodeQuantity);
    expect(Object.keys(response.characters).length).toBeGreaterThan(0);
  });
});
