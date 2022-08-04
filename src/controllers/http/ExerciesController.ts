import express from 'express';
import { Request, Response } from 'express';
import { countCharactersInteractor, episodeLocationInteractor } from '../../core/interactors';

const ExerciseController = express.Router();

ExerciseController.get('/', async (req: Request, res: Response) => {
  try {
    const characterCounter = await countCharactersInteractor.getCharactersCount();
    const locationCounter = await episodeLocationInteractor.getLocationsEpisodesCharacters();

    res.status(200).json([
      characterCounter,
      locationCounter,
    ]);
  } catch (error) {
    return res.sendStatus(500);
  }
});

export default ExerciseController;
