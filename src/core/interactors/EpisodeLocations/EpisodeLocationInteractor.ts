import { IResponse } from '../IResponse';
import EpisodeLocationResponse from './EpisodeLocationResponse';
import EpisodeRepository from '../../repositories/EpisodesRepository';

const MAXIMUM_TIME_TO_COUNT_CHARACTERS = 3 * 10000;

export default class EpisodeLocationInteractor {
  private episodeRepository: EpisodeRepository;

  constructor(episodeRepository: EpisodeRepository) {
    this.episodeRepository = episodeRepository;
  }

  public async getLocationsEpisodesCharacters(): Promise<IResponse<EpisodeLocationResponse>> {
    const startTime = new Date().getTime();
    const result: EpisodeLocationResponse[] = await this.episodeRepository.getAllAndCount();
    const endTime = new Date().getTime();

    return {
      exercise_name: 'Episode locations',
      time: `${(endTime - startTime) / 10000} seconds`,
      in_time: (endTime - startTime) < MAXIMUM_TIME_TO_COUNT_CHARACTERS,
      results: result,
    };
  }
}
