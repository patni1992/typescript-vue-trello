import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import { fetchBoards, fetchBoardById, createBoard } from '@/api';
import { formatData } from './helpers';
import { guestBoards } from './guestData';
import store from '@/store';
import user from './user';

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

    private get guestBoards() {
        return guestBoards;
    }

    @Action({ rawError: true })
    public async getBoards() {
        let boards = this.guestBoards;

        if (!user.isGuest) {
            const response = await fetchBoards();
            boards = response.data;
        }

        this.SET_BOARDS(formatData(boards));
    }

    @Action({ rawError: true })
    public async getBoardById(id: number) {
        if (!user.isGuest) {
            const response = await fetchBoardById(id);
            this.ADD_BOARD(response.data);
        }
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
