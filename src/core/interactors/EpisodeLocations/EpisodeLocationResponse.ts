type Episode = { [key: string]: string[] };
type EpisodeName = { [key: string]: string };
type Character = { [key: string]: string };

export default interface EpisodeLocationResponse {
  episodes: Episode;
  episodeNames: EpisodeName;
  characters: Character;
}
