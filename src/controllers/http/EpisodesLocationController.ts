import express from 'express';
import { Request, Response } from 'express';
import { episodeLocationInteractor } from '../../core/interactors';

const EpisodesLocationController = express.Router();

EpisodesLocationController.get('/episodes_location', async (req: Request, res: Response) => {
  try {
    const locationCounter = await episodeLocationInteractor.getLocationsEpisodesCharacters();

    res.status(200).json(locationCounter);
  } catch (error) {
    return res.sendStatus(500);
  }
});

export default EpisodesLocationController;
