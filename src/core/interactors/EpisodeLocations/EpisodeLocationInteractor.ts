import { IResponse } from '../IResponse';
import EpisodeLocationResponse from './EpisodeLocationResponse';
import EpisodeRepository from '../../repositories/EpisodesRepository';

const MAXIMUM_TIME_TO_COUNT_CHARACTERS = 3 * 10000;

export default class EpisodeLocationInteractor {
  private episodeRepository: EpisodeRepository;

  constructor(episodeRepository: EpisodeRepository) {
    this.episodeRepository = episodeRepository;
  }

  private async getAllAndCount(): Promise<any[]> {
    const result: EpisodeLocationResponse = await this.episodeRepository.getAll();

    if (!result) return [];

    const { episodes, episodeNames, characters } = result;
    const results: { [key: string]: {} } = {};
    Object.keys(episodes).map((episode: string) => {
      const episodeCharacters = episodes[episode];
      const episodeCharacterNames = Array.from(
        new Set(episodeCharacters.map((character: string) => characters[character])),
      );

      results[episode] = {
        name: episodeNames[episode],
        episode,
        locations: [...episodeCharacterNames],
      };
    });

    return Object.values(results);
  }

  public async getLocationsEpisodesCharacters(): Promise<IResponse<EpisodeLocationResponse>> {
    const startTime = new Date().getTime();
    const result: any[] = await this.getAllAndCount();
    const endTime = new Date().getTime();

    return {
      exercise_name: 'Episode locations',
      time: `${(endTime - startTime) / 10000} seconds`,
      in_time: (endTime - startTime) < MAXIMUM_TIME_TO_COUNT_CHARACTERS,
      results: result,
    };
  }
}
