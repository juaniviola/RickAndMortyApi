import axios from 'axios';
import EpisodeInterface from '../core/entities/Episode';
import EpisodeRepository, { EpisodeRepositoryResponse } from '../core/repositories/EpisodesRepository';
import config from '../config';
import CacheRepository from '../core/repositories/ChacheRepository';

const { apiUrl } = config.app;

export default class EpisodeDataSource implements EpisodeRepository {
  private cacheRepository: CacheRepository;
  private characters: any = {};
  private episodes: any = {};
  private episodeNames: any = {};

  constructor(cacheRepository: CacheRepository) {
    this.cacheRepository = cacheRepository;
  }

  public async getAll(): Promise<EpisodeRepositoryResponse> {
    const response = await axios.get(`${apiUrl}/episode/`);
    const episodesInfo = response.data.info;

    const episodesKey = Array(episodesInfo.count).fill(0).map((_, i) => i + 1).join(',');
    const dataFromCache = await this.cacheRepository.get(episodesKey);
    if (dataFromCache) {
      return dataFromCache;
    }

    await this.getEpisodes(episodesKey);

    const allCharacters = Array.from(new Set(Object.values(this.characters))).join(',');
    await this.getCharacteres(allCharacters);

    const { episodeNames, episodes, characters } = this;
    await this.cacheRepository.set(episodesKey, { episodeNames, episodes, characters });

    return { episodeNames, episodes, characters };
  }

  private async getCharacteres(resources: string): Promise<void> {
    const response = await axios.get(`${apiUrl}/character/${resources}`);

    response.data?.map(({ origin, url }: any) => {
      this.characters[url] = origin.name;
    });
  }

  private async getEpisodes(resources: string): Promise<void> {
    const response = await axios.get(`${apiUrl}/episode/${resources}`);

    response.data?.map(({ name, episode, characters }: EpisodeInterface) => {
      this.episodes[episode] = characters;
      this.episodeNames[episode] = name;

      characters.map((character: any) => {
        const characterUri = character.split('/');
        const characterId = characterUri[characterUri.length - 1];
        this.characters[character] = characterId;
      });
    });
  }
}
