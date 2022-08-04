import CountCharactersInteractor from './CountCharacters/CountCharactersInteractor';
import EpisodeLocationInteractor from './EpisodeLocations/EpisodeLocationInteractor';

import ResourceDataSource from '../../dataSources/ResourceDataSource';
import EpisodeDataSource from '../../dataSources/EpisodeDataSource';

const countCharactersInteractorInstance = new CountCharactersInteractor(new ResourceDataSource());
const episodeLocationInteractorInstance = new EpisodeLocationInteractor(new EpisodeDataSource());

export const countCharactersInteractor = countCharactersInteractorInstance;
export const episodeLocationInteractor = episodeLocationInteractorInstance;
