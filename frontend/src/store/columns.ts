import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import { fetchColumnsWithCards } from '@/api';
import cardsModule, { CardsData } from './cards';
import store from '@/store';
import { formatData } from './helpers';
import { columnsWithCards } from './guestData';
import user from './user';

export interface ColumnsData {
    title: string;
    id: string;
    boardId: string;
    createdAt: string;
    cards: CardsData[];
}

export interface ColumnsState {
    byId: { [key: string]: ColumnsData };
    allIds: string[];
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

    private get guestColumnsWithCards() {
        return columnsWithCards;
    }

    @Action({ rawError: true })
    public async getColumnsAndCards(id: string) {
        let data = this.guestColumnsWithCards.filter(column => column.boardId === id);

        if (!user.isGuest) {
            const response = await fetchColumnsWithCards(id);
            data = response.data;
        }

        const cards = data.map((col: any) => col.cards).flat();

        cardsModule.MERGE_CARDS(formatData(cards));

        const columns: ColumnsData[] = data.map((col: any) => ({
            ...col,
            cards: col.cards.map((card: any) => card.id),
        }));

        this.SET_COLUMNS(formatData(columns));
        return data;
    }

    @Mutation
    SET_COLUMNS(columns: { allIds: string[]; byId: { [key: string]: ColumnsData } }) {
        this.byId = columns.byId;
        this.allIds = columns.allIds;
    }
}

export default getModule(Column);
