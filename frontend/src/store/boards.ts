import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import { fetchBoards } from '@/api';
import store from '@/store';

export interface BoardsData {
    title: string;
    id: string;
    userId: number;
    color: string;
}

export interface BoardsState {
    byId: { [key: string]: BoardsData };
    allIds: string[];
}

@Module({ dynamic: true, name: 'boars', store, namespaced: true })
class Board extends VuexModule implements BoardsState {
    byId: BoardsState['byId'] = {};
    allIds: string[] = [];

    get getAllBoards() {
        return Object.values(this.byId);
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
        const mappedData: BoardsState['byId'] = {};
        response.data.forEach((element: any) => {
            mappedData[String(element.id)] = element;
        });

        this.SET_BOARDS(mappedData);
    }

    @Mutation
    SET_BOARDS(boards: BoardsState['byId']) {
        this.byId = boards;
        this.allIds = Object.keys(boards);
    }
}

export default getModule(Board);
