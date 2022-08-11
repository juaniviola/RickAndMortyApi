import EpisodeLocationResponse from '../../../src/core/interactors/EpisodeLocations/EpisodeLocationResponse';

const stub: EpisodeLocationResponse = {
  episodeNames: {
    'S01E01': 'Death Star',
    'S01E02': 'Death Star 2',
    'S01E03': 'Death Star 3',
    'S01E04': 'Death Star 4',
  },
  episodes: {
    'S01E01': [ 'c/1', 'c/2', 'c/3', 'c/4', 'c/5' ],
    'S01E02': [ 'c/1', 'c/4', 'c/5' ],
    'S01E03': [ 'c/2', 'c/3', 'c/4', 'c/5' ],
    'S01E04': [ 'c/3', 'c/4', 'c/5' ],
  },
  characters: {
    'c/1': 'Kashyyyk',
    'c/2': 'Mustafar',
    'c/3': 'Kashyyyk',
    'c/4': 'Kamino',
    'c/5': 'Geonosis',
  },
};

export default stub;
