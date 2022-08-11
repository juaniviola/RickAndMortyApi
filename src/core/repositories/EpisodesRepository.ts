import EpisodeLocationResponse from '../interactors/EpisodeLocations/EpisodeLocationResponse';

export default interface EpisodeRepository {
  getAll(): Promise<EpisodeLocationResponse>;
};
