import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import { fetchColumnsWithCards, reOrderColumns, addColumn } from '@/api';
import cardsModule, { CardsData } from './cards';
import store from '@/store';
import { formatData, move } from './helpers';
import { columnsWithCards } from './guestData';
import user from './user';

export interface ColumnsData {
    title: string;
    id: number;
    boardId: number;
    createdAt: string;
    cards: CardsData[];
    position: number;
}

export interface ColumnsState {
    byId: { [key: number]: ColumnsData };
    allIds: number[];
}

@Module({
    dynamic: true,
    name: 'column',
    store,
    namespaced: true,
})
class Column extends VuexModule implements ColumnsState {
    byId: ColumnsState['byId'] = {};

    allIds: number[] = [];

    get getColumnsByBoardId() {
        return (boardId: number) => {
            const columns = Object.values(this.byId).filter(column => column.boardId === boardId);
            const columnIds = this.allIds.filter(id => columns.some(column => column.id === id));

            return columnIds.map((id: number) => this.byId[id]);
        };
    }
    private get guestColumnsWithCards() {
        return columnsWithCards;
    }

    @Action({ rawError: true })
    public async getColumnsAndCards(id: number) {
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

        this.MERGE_COLUMNS(formatData(columns));
        return data;
    }

    @Action
    async moveColumn(data: { from: number; to: number; boardId: number; columnId: number }) {
        const { from, to, boardId } = data;
        let columns = [...this.getColumnsByBoardId(boardId)];

        move(columns, from, to);

        columns = columns.map((column, index) => {
            return {
                ...column,
                position: index,
            };
        });

        this.MERGE_COLUMNS(formatData(columns));

        if (user.isGuest) {
            return;
        }

        await reOrderColumns({
            boardId,
            columnIds: this.getColumnsByBoardId(boardId).map(column => column.id),
        });
    }

    @Action({ rawError: true })
    public async createColumn(data: { title: string; boardId: number }) {
        const { title, boardId } = data;

        const newColumn = {
            title,
            id: new Date().valueOf(),
            boardId,
            position: 0,
            cards: [],
            createdAt: '',
        };

        this.ADD_COLUMN(newColumn);

        if (user.isGuest) {
            return;
        }

        const result = await addColumn(newColumn);

        return result;
    }

    @Mutation
    ADD_COLUMN(column: ColumnsData) {
        this.byId[column.id] = column;
        this.allIds.push(column.id);
    }

    @Mutation
    SET_COLUMNS(columns: { allIds: number[]; byId: { [key: number]: ColumnsData } }) {
        this.byId = columns.byId;
        this.allIds = columns.allIds;
    }

    @Mutation
    MERGE_COLUMNS(columns: { allIds: number[]; byId: { [key: number]: ColumnsData } }) {
        const uniqueValues = this.allIds.filter(val => !columns.allIds.includes(val));
        this.allIds = [...uniqueValues, ...columns.allIds];
        this.byId = { ...this.byId, ...columns.byId };
    }
}

export default getModule(Column);
