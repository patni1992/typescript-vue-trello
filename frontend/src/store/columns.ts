import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import { fetchColumnsWithCards } from '@/api';
import cardsModule from './cards';
import store from '@/store';

export interface ColumnsData {
    title: string;
    id: number;
    boardId: number;
    createdAt: string;
}

export interface ColumnsState {
    byId: { [key: string]: ColumnsData };
    allIds: string[];
}

function formatData<T>(entities: T[]) {
    const mappedData: { allIds: string[]; byId: { [key: string]: T } } = { allIds: [], byId: {} };

    entities.forEach((entity: any) => {
        mappedData.byId[String(entity.id)] = entity;
    });

    mappedData.allIds = Object.keys(entities);

    return mappedData;
}

@Module({
    dynamic: true,
    name: 'column',
    store,
    namespaced: true,
})
class Column extends VuexModule implements ColumnsState {
    byId: ColumnsState['byId'] = {};

    allIds: string[] = [];

    get getAllColumns() {
        return Object.values(this.byId);
    }

    @Action({ rawError: true })
    public async getColumnsAndCards(id: number) {
        const response = await fetchColumnsWithCards(id);
        const cards = response.data.map((col: any) => col.cards).flat();

        cardsModule.MERGE_CARDS(formatData(cards));

        const columns: ColumnsData[] = response.data.map((col: any) => ({
            ...col,
            cards: col.cards.map((card: any) => card.id),
        }));

        this.SET_COLUMNS(formatData(columns));
        return response.data;
    }

    @Mutation
    SET_COLUMNS(columns: { allIds: string[]; byId: { [key: string]: ColumnsData } }) {
        this.byId = columns.byId;
        this.allIds = columns.allIds;
    }
}

export default getModule(Column);
