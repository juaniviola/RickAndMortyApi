import EpisodeLocationInteractor from '../../../src/core/interactors/EpisodeLocations/EpisodeLocationInteractor';
import EpisodeLocationResponse from './EpisodeLocationResponse';
import stub from '../__mocks__/EpisodeLocationStub';

let episodeLocationInteractor: EpisodeLocationInteractor;
let episodeRepository: any = { getAll: () => stub };

beforeEach(() => {
  episodeLocationInteractor = new EpisodeLocationInteractor(episodeRepository);
});

describe('EpisodeLocationInteractor with stub', () => {
  it('should return Episode Location exercise response', async () => {
    const response = await episodeLocationInteractor.getLocationsEpisodesCharacters();

    expect(response.exercise_name).toEqual(EpisodeLocationResponse.exercise_name);
    expect(JSON.stringify(response.results)).toEqual(JSON.stringify(EpisodeLocationResponse.results));
  });
});
