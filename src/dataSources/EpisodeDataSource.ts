import axios from 'axios';
import EpisodeInterface from '../core/entities/Episode';
import EpisodeLocationResponse from '../core/interactors/EpisodeLocations/EpisodeLocationResponse';
import EpisodeRepository from '../core/repositories/EpisodesRepository';
import config from '../config';

const { apiUrl } = config.app;

export default class EpisodeDataSource implements EpisodeRepository {
  private characters: any = {};
  private episodes: any = {};
  private episodeNames: any = {};
  private results: any = {};

  private async getCharacteres(resources: string): Promise<void> {
    const response = await axios.get(`${apiUrl}/character/${resources}`);

    response.data?.map(({ origin, url }: any) => {
      this.characters[url] = origin.name;
    });
  }

  private async getEpisodes(page: number): Promise<void> {
    const response = await axios.get(`${apiUrl}/episode/?page=${page}`);

    response.data?.results?.map(({ name, episode, characters }: EpisodeInterface) => {
      this.episodes[episode] = characters;
      this.episodeNames[episode] = name;

      characters.map((character: any) => {
        const characterUri = character.split('/');
        const characterId = characterUri[characterUri.length - 1];
        this.characters[character] = characterId;
      });
    });
  }

  public async getAllAndCount(): Promise<EpisodeLocationResponse[]> {
    const response = await axios.get(`${apiUrl}/episode/`);
    const episodesInfo = response.data.info.pages;

    const totalPages = new Array(episodesInfo).fill(0).map((_, i) => this.getEpisodes(i + 1));
    await Promise.all(totalPages);

    const allCharacters = Array.from(new Set(Object.values(this.characters)));
    const chunkSize = 200;
    const chunkedCharacters = [];
    for (let i = 0; i < allCharacters.length; i += chunkSize) {
      chunkedCharacters.push(
        this.getCharacteres(allCharacters.slice(i, i + chunkSize).join(','))
      );
    }

    await Promise.all(chunkedCharacters);

    Object.keys(this.episodes).map((episode: string) => {
      const episodeCharacters = this.episodes[episode];
      const episodeCharactersNames = Array.from(
        new Set(episodeCharacters.map((character: string) => this.characters[character]))
      );
      this.results[episode] = episodeCharactersNames;
    });

    return Object.keys(this.results).map((episode: string) => {
      return {
        name: this.episodeNames[episode],
        episode,
        locations: this.results[episode],
      };
    });
  }
}
