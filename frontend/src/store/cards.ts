import { VuexModule, Module, Mutation, getModule, Action } from 'vuex-module-decorators';
import { formatData, move } from './helpers';
import { addCard, reOrderCards, updateCard } from '../api';
import store from '@/store';
import user from './user';

export interface CardsData {
    content: string;
    id: number;
    columnId: number;
    position: number;
    color: string;
}

export interface UpdateCard {
    content: string;
    color: string;
    id: number;
}

export interface BoardsState {
    byId: { [key: number]: CardsData };
    allIds: number[];
}

@Module({
    dynamic: true,
    name: 'cards',
    store,
    namespaced: true,
})
class Card extends VuexModule implements BoardsState {
    byId: BoardsState['byId'] = {};

    allIds: number[] = [];

    get cardsByColumnId() {
        return (columnId: number) => {
            const cards = Object.values(this.byId).filter(card => card.columnId === columnId);
            const cardsIds = this.allIds.filter(id => cards.some(card => card.id === id));

            return cardsIds.map((id: number) => this.byId[id]);
        };
    }

    @Mutation
    MERGE_CARDS(cards: { allIds: number[]; byId: { [key: number]: CardsData } }) {
        const uniqueValues = this.allIds.filter(val => !cards.allIds.includes(val));
        this.byId = { ...this.byId, ...cards.byId };
        this.allIds = [...uniqueValues, ...cards.allIds];
    }

    @Mutation
    ADD_CARD(card: CardsData) {
        this.byId[card.id] = card;
        this.allIds.unshift(card.id);
    }

    @Mutation
    REMOVE_CARD(id: number) {
        delete this.byId[id];
        this.allIds = this.allIds.filter(cardId => cardId !== id);
    }

    @Mutation
    EDIT_CARD(updatedCard: UpdateCard) {
        this.byId[updatedCard.id] = { ...this.byId[updatedCard.id], ...updatedCard };
    }

    @Mutation
    REPLACE_CARD(data: { oldId: number; card: CardsData }) {
        const { oldId, card } = data;
        this.byId = { ...this.byId, [card.id]: card };
        this.allIds[this.allIds.indexOf(oldId)] = card.id;
        delete this.byId[oldId];
    }

    @Action({ rawError: true })
    public async moveCard(data: { from: number; to: number; action: string; card: CardsData }) {
        const { from, to, action, card } = data;

        if (action === 'ADD_CARD_COLUMN') {
            const cardsInSameColumn = [...this.cardsByColumnId(card.columnId)];
            cardsInSameColumn.splice(card.position, 0, card);
            this.MERGE_CARDS(formatData(cardsInSameColumn));
        } else if (action === 'REMOVE_CARD_COLUMN') {
            this.REMOVE_CARD(card.id);
        } else if (action === 'MOVE_CARD_SAME_COLUMN') {
            let cards = [...this.cardsByColumnId(card.columnId)];
            move(cards, from, to);

            cards.map((card, index) => {
                return {
                    ...card,
                    position: index,
                };
            });

            this.MERGE_CARDS(formatData(cards));
        }

        if (user.isGuest) {
            return;
        }

        await reOrderCards({
            columnId: card.columnId,
            cardIds: this.cardsByColumnId(card.columnId).map(card => card.id),
        });
    }

    @Action({ rawError: true })
    public async createCard(data: { content: string; columnId: number }) {
        const { content, columnId } = data;
        const newCard = {
            content,
            id: new Date().valueOf(),
            columnId,
            position: 0,
            color: 'blue',
        };

        this.ADD_CARD(newCard);

        if (user.isGuest) {
            return;
        }

        const result = await addCard(newCard);

        return result;
    }

    @Action({ rawError: true })
    public async updateCard(updatedCard: UpdateCard) {
        this.EDIT_CARD(updatedCard);

        if (user.isGuest) {
            return;
        }

        const result = await updateCard(updatedCard);

        return result;
    }
}

export default getModule(Card);
