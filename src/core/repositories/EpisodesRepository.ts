type Episode = { [key: string]: string[] };
type EpisodeName = { [key: string]: string };
type Character = { [key: string]: string };

export interface EpisodeRepositoryResponse {
  episodes: Episode;
  episodeNames: EpisodeName;
  characters: Character;
}

export default interface EpisodeRepository {
  getAll(): Promise<EpisodeRepositoryResponse>;
};
