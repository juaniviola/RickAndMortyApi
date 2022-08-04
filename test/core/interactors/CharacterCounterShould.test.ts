import CharacterCounterInteractor from '../../../src/core/interactors/CountCharacters/CountCharactersInteractor';
import characterCounterResponse from './CharacterCounterResponse';
import stub from '../__mocks__/ResourcesStub';

let characterCounterInteractor: CharacterCounterInteractor;
let characterRepository: any = { getAll: () => stub };

beforeEach(() => {
  characterCounterInteractor = new CharacterCounterInteractor(characterRepository);
});

describe('CharacterCounterInteractor with stub', () => {
  it('should return Character counter exercise response', async () => {
    const response = await characterCounterInteractor.getCharactersCount();

    expect(response.exercise_name).toEqual(characterCounterResponse.exercise_name);
    expect(JSON.stringify(response.results)).toEqual(JSON.stringify(characterCounterResponse.results));
  });
});
