import { VuexModule, Module, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/store';

export interface CardsData {
    content: string;
    id: string;
    columnId: number;
    color: string;
}

export interface BoardsState {
    byId: { [key: string]: CardsData };
    allIds: string[];
}

@Module({
    dynamic: true,
    name: 'cards',
    store,
    namespaced: true,
})
class Card extends VuexModule implements BoardsState {
    byId: BoardsState['byId'] = {};

    allIds: string[] = [];

    get cardsByColumnId() {
        return (columnId: number) => Object.values(this.byId).filter(card => card.columnId === columnId);
    }

    @Mutation
    MERGE_CARDS(cards: { allIds: string[]; byId: { [key: string]: CardsData } }) {
        this.byId = { ...this.byId, ...cards.byId };
        this.allIds = [...this.allIds, ...cards.allIds];
    }
}

export default getModule(Card);
