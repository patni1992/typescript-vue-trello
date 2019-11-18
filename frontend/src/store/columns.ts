import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import { fetchColumns } from '@/api';
import store from '@/store';

export interface ColumnsData {
    name: string;
    id: string;
}

export interface ColumnsState {
    byId: { [key: string]: ColumnsData };
    allIds: string[];
}

@Module({ dynamic: true, name: 'coulumn', store, namespaced: true })
class Board extends VuexModule implements ColumnsState {
    byId: ColumnsState['byId'] = {};
    allIds: string[] = [];

    get getAllColumns() {
        return Object.values(this.byId);
    }

    @Action({ rawError: true })
    public async getColumns(id: number) {
        const response = await fetchColumns(id);

        const mappedData: ColumnsState['byId'] = {};
        response.data.forEach((element: any) => {
            mappedData[String(element.id)] = element;
        });

        this.SET_COLUMNS(mappedData);
    }

    @Mutation
    SET_COLUMNS(boards: ColumnsState['byId']) {
        this.byId = boards;
        this.allIds = Object.keys(boards);
    }
}

export default getModule(Board);
