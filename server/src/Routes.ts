import { UsersController } from './controllers/users.controller';
import { BoardsController } from './controllers/boards.controller';
import { ColumnsController } from './controllers/columns.controller';
import { CardsController } from './controllers/cards.controller';
import { ColumnCardsController } from './controllers/columnCards.controller';
import { BoardColumnsController } from './controllers/boardColumns.controller';
import * as express from 'express';
import { auth } from './middlewares/auth';
import { User } from './models/User';

export class Routes {
    public usersController: UsersController = new UsersController();
    public boardsController: BoardsController = new BoardsController();
    public columnsController: ColumnsController = new ColumnsController();
    public CardsController: CardsController = new CardsController();
    public columnCardsController: ColumnCardsController = new ColumnCardsController();
    public boardColumnsController: BoardColumnsController = new BoardColumnsController();

    public constructor(app: express.Application) {
        app.route('/login').post(this.usersController.login);
        app.route('/register').post(this.usersController.create);

        app.route('/boards/:id')
            .get(auth, this.boardsController.show)
            .put(auth, this.boardsController.update)
            .delete(auth, this.boardsController.delete);

        app.route('/boards')
            .get(auth, this.boardsController.index)
            .post(auth, this.boardsController.create);

        app.route('/boards/:boardId/columns').post(auth, this.boardColumnsController.create);

        app.route('/columns/:columnId/cards').post(auth, this.columnCardsController.create);

        app.route('/columns')
            .get(auth, this.columnsController.index)
            .post(auth, this.columnsController.create);

        app.route('/columns/:id')
            .put(auth, this.columnsController.update)
            .delete(auth, this.columnsController.delete);

        app.route('/columns/reorder').patch(auth, this.columnsController.reOrder);

        app.route('/cards/reorder').patch(auth, this.CardsController.reOrder);

        app.route('/users')
            .get(this.usersController.index)
            .post(this.usersController.create);
    }
}
