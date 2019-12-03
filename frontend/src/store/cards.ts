import { VuexModule, Module, Mutation, getModule, Action } from 'vuex-module-decorators';
import { formatData } from './helpers';
import { reOrderCards } from '../api';
import store from '@/store';

export interface CardsData {
    content: string;
    id: string;
    columnId: string;
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
        return (columnId: string) => {
            const cards = Object.values(this.byId).filter(card => card.columnId === columnId);
            const cardsIds = this.allIds.filter(id => cards.some(card => card.id === id));

            return cardsIds.map((id: string) => this.byId[id]);
        };
    }

    @Mutation
    MERGE_CARDS(cards: { allIds: string[]; byId: { [key: string]: CardsData } }) {
        const uniqueValues = this.allIds.filter(val => !cards.allIds.includes(val));
        this.byId = { ...this.byId, ...cards.byId };
        this.allIds = [...uniqueValues, ...cards.allIds];
    }

    @Action({ rawError: true })
    public async moveCards(data: { columnId: string; cards: CardsData[] }) {
        const { columnId, cards } = data;
        const updatedCards = cards.map(card => ({ ...card, columnId }));

        this.MERGE_CARDS(formatData(updatedCards));

        await reOrderCards({ columnId, cardIds: cards.map(card => card.id) });
    }

    @Mutation
    MOVE_CARDS(cards: CardsData[]) {
        console.log(cards);
    }
}

export default getModule(Card);
