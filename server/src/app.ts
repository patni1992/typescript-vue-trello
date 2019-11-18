import * as express from 'express';
import { PORT } from './constants';
import { Routes } from './Routes';
import * as Knex from 'knex';
import { Model } from 'objection';
import * as knexConfig from '../knexfile';
import * as bodyParser from 'body-parser';
import { HttpException } from './utils/HttpException';
import 'express-async-errors';
import * as cors from 'cors';
import { HttpLogger } from './utils/HttpLogger';
import { logger } from './utils/logger';
import * as morgan from 'morgan';
export const app = express();
const httpLogger = new HttpLogger();
const dbENV = process.env.NODE_ENV || 'development';

export const knex = Knex(knexConfig[dbENV]);
Model.knex(knex);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('combined', { stream: httpLogger }));

new Routes(app);

app.use(function(err: HttpException, req, res, next) {
    logger.error(JSON.stringify(err.stack));
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: app.get('env') === 'development' ? err : {},
    });
});

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    return res.status(404).send({ message: `${req.method} route ${req.url} not found.` });
});

export const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
