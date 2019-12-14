import { shallowMount, Wrapper } from '@vue/test-utils';
import Column from '@/components/Column.vue';
import cards from '@/store/cards';
import Card from '@/components/Card.vue';
import AppItem from '@/components/AddItem.vue';

let wrapper: Wrapper<any>;

jest.mock('@/store/cards', () => ({
    createCard: jest.fn(),
    cardsByColumnId: jest.fn(() => [{ id: 1 }, { id: 2 }, { id: 3 }]),
}));

describe('Column', () => {
    beforeEach(() => {
        wrapper = shallowMount(Column, {
            propsData: {
                color: 'blue',
                column: {
                    title: 'Test column',
                    id: 1,
                },
            },
        });
    });

    test('is called', () => {
        expect(wrapper.name()).toBe('Column');
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('pass title from props', () => {
        expect(wrapper.find(AppItem).props().label).toBe('Test column');
    });

    test('apply color prop as class', () => {
        expect(wrapper.find('.header').element.classList.contains('darken-blue')).toBe(true);
        expect(wrapper.find('.cards').element.classList.contains('darken-blue')).toBe(true);
    });

    test('addNewCard calls cards.createCard with correct arguments', () => {
        wrapper.vm.addNewCard('some content');
        expect(cards.createCard).toBeCalledWith({ columnId: 1, content: 'some content' });
    });

    test('truncateString format string in correct way', () => {
        const truncatedString = wrapper.vm.truncateString('Hello, this is a test of truncateString', 10);
        expect(truncatedString).toBe('Hello, thi...');
    });

    test('render all cards', () => {
        expect(wrapper.findAll(Card).length).toBe(3);
    });
});
