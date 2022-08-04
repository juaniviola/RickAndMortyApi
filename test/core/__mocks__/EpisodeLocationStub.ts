import EpisodeLocationResponse from '../../../src/core/interactors/EpisodeLocations/EpisodeLocationResponse';

const stub: EpisodeLocationResponse[] = [
  {
    name: 'Death Star',
    episode: 'S01E01',
    locations: [
      'Kashyyyk',
      'Mustafar',
      'Kamino',
      'Geonosis',
    ],
  },
  {
    name: 'Death Star 2',
    episode: 'S01E02',
    locations: [
      'Tatooine',
      'Bespin',
      'Coruscant',
    ],
  },
  {
    name: 'Death Star 3',
    episode: 'S01E03',
    locations: [
      'Tatooine',
      'Bespin',
      'Coruscant',
      'Cloud City',
    ],
  },
  {
    name: 'Death Star 4',
    episode: 'S01E04',
    locations: [
      'Tatooine',
      'Bespin',
      'Coruscant',
      'Cloud City',
      'Endor',
      'Hoth',
    ],
  },
];

export default stub;
