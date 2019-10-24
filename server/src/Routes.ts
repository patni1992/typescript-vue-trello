import { UsersController } from './controllers/users.controller';
import * as express from 'express';

export class Routes {
    public usersController: UsersController = new UsersController();

    public constructor(app: express.Application) {
        app.route('/users')
            .get(this.usersController.index)
            .post(this.usersController.create);
    }
}
