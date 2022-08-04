import express from 'express';
import { Request, Response } from 'express';
import { countCharactersInteractor } from '../../core/interactors';

const CharCounterController = express.Router();

CharCounterController.get('/char_counter', async (req: Request, res: Response) => {
  try {
    const characterCounter = await countCharactersInteractor.getCharactersCount();

    res.status(200).json(characterCounter);
  } catch (error) {
    return res.sendStatus(500);
  }
});

export default CharCounterController;
