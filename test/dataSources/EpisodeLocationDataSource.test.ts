import EpisodeLocationDataSource from '../../src/dataSources/EpisodeDataSource';
import EpisodeLocationResponse from '../../src/core/interactors/EpisodeLocations/EpisodeLocationResponse';

jest.setTimeout(10000);

describe('EpisodeLocationDataSource', () => {
  it('should return episode locations', async () => {
    const episodeQuantity = 51;

    const episodeLocationDataSource = new EpisodeLocationDataSource();
    const response: EpisodeLocationResponse[] = await episodeLocationDataSource.getAllAndCount();

    expect(response.length).toBe(episodeQuantity);
  });
});
