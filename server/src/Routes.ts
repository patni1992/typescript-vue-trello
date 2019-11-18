import { UsersController } from './controllers/users.controller';
import { BoardsController } from './controllers/boards.controller';
import { ColumnsController } from './controllers/columns.controller';
import * as express from 'express';
import { auth } from './middlewares/auth';

export class Routes {
    public usersController: UsersController = new UsersController();
    public boardsController: BoardsController = new BoardsController();
    public columnsController: ColumnsController = new ColumnsController();

    public constructor(app: express.Application) {
        app.route('/login').post(this.usersController.login);
        app.route('/register').post(this.usersController.create);

        app.route('/boards/:id').get(auth, this.boardsController.show);

        app.route('/boards')
            .get(auth, this.boardsController.index)
            .post(auth, this.boardsController.create);

        app.route('/columns')
            .get(auth, this.columnsController.index)
            .post(this.columnsController.create);

        app.route('/users')
            .get(this.usersController.index)
            .post(this.usersController.create);
    }
}
