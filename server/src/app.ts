import * as express from 'express';
import { PORT } from './constants';
import { Routes } from './Routes';
import * as Knex from 'knex';
import { Model } from 'objection';
import * as knexConfig from '../knexfile';
import * as bodyParser from 'body-parser';
import { errorHandler } from './middlewares/errorHandler';
const app = express();

const dbENV = process.env.NODE_ENV || 'development';

export const knex = Knex(knexConfig[dbENV]);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

Model.knex(knex);

new Routes(app);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.use(errorHandler);

export default app;
