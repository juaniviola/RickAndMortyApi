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
    const results: any[] = await this.getAllAndMerge();
    const endTime = new Date().getTime();

    return {
      exercise_name: 'Episode locations',
      time: `${(endTime - startTime) / 10000} seconds`,
      in_time: (endTime - startTime) < MAXIMUM_TIME_TO_COUNT_CHARACTERS,
      results,
    };
  }

  private async getAllAndMerge(): Promise<any[]> {
    const result = await this.episodeRepository.getAll();
    if (!result) return [];

    const { episodes, episodeNames, characters } = result;
    const results: any = {};
    Object.keys(episodes).forEach((episode: string) => {
      const locations = Array.from(
        new Set(episodes[episode].map((character: string) => characters[character]))
      );

      results[episode] = {
        name: episodeNames[episode],
        episode,
        locations,
      };
    });

    return Object.values(results);
  }
}
