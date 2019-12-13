import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import { fetchBoards, fetchBoardById, createBoard, updateBoard, removeBoard } from '@/api';
import { formatData } from './helpers';
import { guestBoards } from './guestData';
import store from '@/store';
import user from './user';

export interface BoardsData {
    title: string;
    id: number;
    userId: number;
    color: string;
}

export interface NewBoard {
    title: string;
    color: string;
}

export interface UpdateBoard {
    title?: string;
    color?: string;
    id: number;
}

export interface BoardsState {
    byId: { [key: number]: BoardsData };
    allIds: number[];
}

@Module({
    dynamic: true,
    name: 'boards',
    store,
    namespaced: true,
})
class Board extends VuexModule implements BoardsState {
    byId: BoardsState['byId'] = {};

    allIds: number[] = [];

    get getAllBoards() {
        return this.allIds.map(id => this.byId[id]);
    }

    get emptyBoard(): BoardsData {
        return {
            title: '',
            id: 0,
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

    @Action({ rawError: true })
    public async editBoard(updatedBoard: UpdateBoard) {
        this.UPDATE_BOARD(updatedBoard);

        const response = await updateBoard(updatedBoard);

        return response;
    }

    @Action({ rawError: true })
    public async deleteBoard(id: number) {
        this.DELETE_BOARD(id);
        if (!user.isGuest) {
            await removeBoard(id);
        }
    }

    @Mutation
    DELETE_BOARD(id: number) {
        delete this.byId[id];
        this.allIds = this.allIds.filter(val => val !== id);
    }

    @Mutation
    ADD_BOARD(board: BoardsData) {
        this.byId = { ...this.byId, [board.id]: board };
        this.allIds.unshift(board.id);
    }

    @Mutation
    UPDATE_BOARD(updateBoard: UpdateBoard) {
        this.byId[updateBoard.id] = {
            ...this.byId[updateBoard.id],
            ...updateBoard,
        };
    }

    @Mutation
    REPLACE_BOARD(boardId: number, newBoard: BoardsData) {
        this.byId[newBoard.id] = newBoard;
        this.allIds[this.allIds.indexOf(newBoard.id)] = newBoard.id;
        delete this.byId[boardId];
    }

    @Mutation
    SET_BOARDS(boards: { allIds: number[]; byId: { [key: number]: BoardsData } }) {
        this.byId = boards.byId;
        this.allIds = boards.allIds;
    }
}

export default getModule(Board);
