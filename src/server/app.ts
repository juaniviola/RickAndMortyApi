import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

const app = express();

import ExerciseController from '../controllers/http/ExerciesController';
import EpisodesLocationController from '../controllers/http/EpisodesLocationController';
import CharCounterController from '../controllers/http/CharCounterController';

// config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(morgan('tiny'));

// routes
app.use('/', ExerciseController);
app.use('/', CharCounterController);
app.use('/', EpisodesLocationController);
app.use('*', (_: Request, res: Response) => res.sendStatus(404));

export default app;
