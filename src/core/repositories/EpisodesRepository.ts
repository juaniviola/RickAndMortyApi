import EpisodeLocationResponse from '../interactors/EpisodeLocations/EpisodeLocationResponse';

export default interface EpisodeRepository {
  getAllAndCount(): Promise<EpisodeLocationResponse[]>;
};
