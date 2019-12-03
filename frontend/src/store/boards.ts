import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import { fetchBoards, fetchBoardById, createBoard } from '@/api';
import { formatData } from './helpers';
import store from '@/store';

export interface BoardsData {
    title: string;
    id: string;
    userId: number;
    color: string;
}

export interface NewBoard {
    title: string;
    color: string;
}

export interface BoardsState {
    byId: { [key: string]: BoardsData };
    allIds: string[];
}

@Module({
    dynamic: true,
    name: 'boards',
    store,
    namespaced: true,
})
class Board extends VuexModule implements BoardsState {
    byId: BoardsState['byId'] = {};

    allIds: string[] = [];

    get getAllBoards() {
        return this.allIds.map(id => this.byId[id]);
    }

    get emptyBoard(): BoardsData {
        return {
            title: '',
            id: '',
            userId: 0,
            color: '',
        };
    }

    @Action({ rawError: true })
    public async getBoards() {
        const response = await fetchBoards();

        this.SET_BOARDS(formatData(response.data));
    }

    @Action({ rawError: true })
    public async getBoardById(id: number) {
        const response = await fetchBoardById(id);
        this.ADD_BOARD(response.data);
    }

    @Action({ rawError: true })
    public async createNewBoard(newBoard: NewBoard) {
        const response = await createBoard(newBoard);
        this.ADD_BOARD(response.data);
    }

    @Mutation
    ADD_BOARD(board: BoardsData) {
        this.byId = { ...this.byId, [board.id]: board };
        this.allIds.unshift(board.id);
    }

    @Mutation
    REPLACE_BOARD(boardId: string, newBoard: BoardsData) {
        this.byId[newBoard.id] = newBoard;
        this.allIds[this.allIds.indexOf(newBoard.id)] = newBoard.id;
        delete this.byId[boardId];
    }

    @Mutation
    SET_BOARDS(boards: { allIds: string[]; byId: { [key: string]: BoardsData } }) {
        this.byId = boards.byId;
        this.allIds = boards.allIds;
    }
}

export default getModule(Board);
