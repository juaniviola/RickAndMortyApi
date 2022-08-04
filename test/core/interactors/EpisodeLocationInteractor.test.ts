import EpisodeLocationInteractor from '../../../src/core/interactors/EpisodeLocations/EpisodeLocationInteractor';
import episodeLocationResponse from './EpisodeLocationResponse';

let episodeLocationInteractor: EpisodeLocationInteractor;
let episodeRepository: any = {
  getAllAndCount: jest.fn(),
  getEpisodes: jest.fn(),
  getCharacteres: jest.fn(),
};

beforeEach(() => {
  episodeLocationInteractor = new EpisodeLocationInteractor(episodeRepository);
});

describe('EpisodeLocationInteractor', () => {
  it('should call getAll method of episodeRepository', async () => {
    await episodeLocationInteractor.getLocationsEpisodesCharacters();
    expect(episodeRepository.getAllAndCount).toHaveBeenCalled();
  });

  it('should return Episode Location exercise response', async () => {
    const response = await episodeLocationInteractor.getLocationsEpisodesCharacters();

    expect(response).toHaveProperty('exercise_name');
    expect(response).toHaveProperty('time');
    expect(response).toHaveProperty('in_time');
    expect(response).toHaveProperty('results');
    expect(response.exercise_name).toEqual(episodeLocationResponse.exercise_name);
  });
});
