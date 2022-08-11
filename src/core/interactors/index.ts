import CountCharactersInteractor from './CountCharacters/CountCharactersInteractor';
import EpisodeLocationInteractor from './EpisodeLocations/EpisodeLocationInteractor';

import ResourceDataSource from '../../dataSources/ResourceDataSource';
import EpisodeDataSource from '../../dataSources/EpisodeDataSource';
import RedisCacheRepository from '../../dataSources/RedisCacheRepository';

const countCharactersInteractorInstance = new CountCharactersInteractor(
  new ResourceDataSource(RedisCacheRepository),
);
const episodeLocationInteractorInstance = new EpisodeLocationInteractor(
  new EpisodeDataSource(RedisCacheRepository),
);

export const countCharactersInteractor = countCharactersInteractorInstance;
export const episodeLocationInteractor = episodeLocationInteractorInstance;
