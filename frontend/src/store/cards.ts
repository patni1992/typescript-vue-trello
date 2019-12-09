import { VuexModule, Module, Mutation, getModule, Action } from 'vuex-module-decorators';
import { formatData } from './helpers';
import { reOrderCards, addCard } from '../api';
import store from '@/store';
import user from './user';

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

    @Mutation
    ADD_CARD(card: CardsData) {
        this.byId[card.id] = card;
        this.allIds.unshift(card.id);
    }

    @Action({ rawError: true })
    public async moveCards(data: { columnId: string; cards: CardsData[] }) {
        const { columnId, cards } = data;
        const updatedCards = cards.map(card => ({ ...card, columnId }));

        this.MERGE_CARDS(formatData(updatedCards));

        if (user.isGuest) {
            return;
        }

        await reOrderCards({ columnId, cardIds: cards.map(card => card.id) });
    }

    @Action({ rawError: true })
    public async createCard(data: { content: string; columnId: string }) {
        const { content, columnId } = data;
        const newCard = {
            content,
            id: new Date().valueOf().toString(),
            columnId,
            color: '#0279BF',
        };

        this.ADD_CARD(newCard);

        if (user.isGuest) {
            return;
        }

        const result = await addCard(newCard);

        return result;
    }
}

export default getModule(Card);
