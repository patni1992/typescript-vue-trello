import { shallowMount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
// @ts-ignore
import vClickOutside from 'v-click-outside';
import Card from '@/components/Card.vue';
import cards from '@/store/cards';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

let wrapper: Wrapper<any>;

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(vClickOutside);

const cardsData = {
    id: 10,
    color: 'blue',
    content: '# Test content 1234',
};

jest.mock('@/store/cards', () => ({
    deleteCard: jest.fn(),
}));

describe('Card', () => {
    beforeEach(() => {
        wrapper = shallowMount(Card, {
            propsData: {
                card: cardsData,
            },
        });
    });

    test('is called', () => {
        expect(wrapper.name()).toBe('Card');
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('color is applied as class', () => {
        expect(wrapper.find('.card').element.classList.contains('blue')).toBe(true);
    });

    test('renders content', () => {
        expect(wrapper.element.innerHTML.includes('Test content 1234')).toBe(true);
    });

    test('Delete icon is visible when editMode is true', async () => {
        await wrapper.setData({ editMode: true });
        expect(wrapper.element.innerHTML.includes('trash-delete')).toBe(true);
    });

    test('Delete icon is hidden when editMode is false', () => {
        expect(wrapper.element.innerHTML.includes('trash-delete')).toBe(false);
    });

    test('Clicking delete icon calls deleteCard method', async () => {
        await wrapper.setData({ editMode: true });
        wrapper.find('#trash-delete').trigger('click');
        expect(cards.deleteCard).toBeCalledWith(cardsData.id);
    });
});
