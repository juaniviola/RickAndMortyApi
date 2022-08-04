import ResourceInterface from '../../entities/Resource';
import ResourceRepository from '../../repositories/ResourceRepository';
import { IResponse } from '../IResponse';
import CharCounterResponse from './CharCounterResponse';

const MAXIMUM_TIME_TO_COUNT_CHARACTERS = 3 * 10000;

export default class CountCharactersInteractor {
  private resourceRepository: ResourceRepository;

  constructor(resourceRepository: ResourceRepository) {
    this.resourceRepository = resourceRepository;
  }

  public async getCharactersCount(): Promise<IResponse<CharCounterResponse>> {
    try {
      const startTime = new Date().getTime();

      const charCount = await this.countResourceCharacters('character', 'c');
      const locationCount = await this.countResourceCharacters('location', 'l');
      const episodeCount = await this.countResourceCharacters('episode', 'e');

      const endTime = new Date().getTime();

      return {
        exercise_name: 'Char Counter',
        time: `${(endTime - startTime) / 10000} seconds`,
        in_time: (endTime - startTime) < MAXIMUM_TIME_TO_COUNT_CHARACTERS,
        results: [charCount, episodeCount, locationCount],
      };
    } catch (error) {
      throw Error(error);
    }
  }

  private async countResourceCharacters(resource: string, character: string): Promise<CharCounterResponse> {
    const resources: ResourceInterface[] = await this.resourceRepository.getAll(resource);
    let count = 0;

    if (resources) {
      resources.forEach((_resource: ResourceInterface) => {
        _resource.name.toLowerCase().split('').forEach((letter: string) => (letter === character ? count++ : null));
      });
    }

    return {
      char: character,
      resource,
      count,
    };
  }
}
