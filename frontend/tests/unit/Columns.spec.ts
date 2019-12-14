import { shallowMount, Wrapper } from '@vue/test-utils';
import Columns from '@/components/Columns.vue';
import Column from '@/components/Column.vue';

let wrapper: Wrapper<any>;

describe('Columns', () => {
    beforeEach(() => {
        wrapper = shallowMount(Columns, {
            propsData: {
                color: 'blue',
                columns: [{ id: 1 }, { id: 2 }, { id: 3 }],
            },
        });
    });

    test('is called', () => {
        expect(wrapper.name()).toBe('Columns');
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('it renders correct amount of column components', () => {
        expect(wrapper.findAll(Column).length).toBe(3);
    });

    test('pass props to column', () => {
        expect(wrapper.find(Column).props().color).toBe('blue');
        expect(wrapper.find(Column).props().column.id).toBe(1);
    });
});
