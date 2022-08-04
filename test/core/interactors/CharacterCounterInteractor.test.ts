import CharacterCounterInteractor from '../../../src/core/interactors/CountCharacters/CountCharactersInteractor';
import characterCounterResponse from './CharacterCounterResponse';

let characterCounterInteractor: CharacterCounterInteractor;
let characterRepository: any = {
  getAll: jest.fn(),
  getResources: jest.fn(),
};

beforeEach(() => {
  characterCounterInteractor = new CharacterCounterInteractor(characterRepository);
});

describe('CharacterCounterInteractor', () => {
  it('should call getAll method of characterRepository', async () => {
    await characterCounterInteractor.getCharactersCount();
    expect(characterRepository.getAll).toHaveBeenCalled();
  });

  it('should return Character counter exercise response', async () => {
    const response = await characterCounterInteractor.getCharactersCount();

    expect(response).toHaveProperty('exercise_name');
    expect(response).toHaveProperty('time');
    expect(response).toHaveProperty('in_time');
    expect(response).toHaveProperty('results');
    expect(response.results).toHaveLength(3);
    expect(response.exercise_name).toEqual(characterCounterResponse.exercise_name);
  });
});
