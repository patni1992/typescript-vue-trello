import { shallowMount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
// @ts-ignore
import vClickOutside from 'v-click-outside';
import CreateNewBoardCard from '@/components/CreateNewBoardCard.vue';
import ColorPicker from '@/components/ColorPicker.vue';

Vue.use(vClickOutside);

let wrapper: Wrapper<any>;
let onCreate = jest.fn();

describe('CreateNewBoardCard', () => {
    beforeEach(() => {
        onCreate = jest.fn();
        wrapper = shallowMount(CreateNewBoardCard, {
            propsData: {
                onCreate,
            },
        });
    });

    test('is called', () => {
        expect(wrapper.name()).toBe('CreateNewBoardCard');
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('shows create new board when mounted', () => {
        expect(wrapper.element.innerHTML.includes('Create new board')).toBe(true);
    });

    test('clicking new-board shows create-board', () => {
        wrapper.find('.new-board').trigger('click');
        expect(wrapper.find('.create-board').exists()).toBe(true);
    });

    test('clicking new-board hides new-board', () => {
        wrapper.find('.new-board').trigger('click');
        expect(wrapper.find('.new-board').exists()).toBe(false);
    });

    test('ColorPicker can be found in create-board', () => {
        wrapper.find('.new-board').trigger('click');
        expect(wrapper.contains(ColorPicker)).toBe(true);
    });

    test('ColorPicker can be found in create-board', () => {
        wrapper.find('.new-board').trigger('click');
        expect(wrapper.contains(ColorPicker)).toBe(true);
    });

    test('input can be found in create-board', () => {
        wrapper.find('.new-board').trigger('click');
        expect(wrapper.contains('input')).toBe(true);
    });

    test('clicking create-btn calls createBoard', () => {
        const spy = jest.spyOn(wrapper.vm, 'createBoard');
        wrapper.find('.new-board').trigger('click');
        wrapper.vm.boardTitle = 'some text';
        wrapper.find('.create-btn').trigger('click');
        expect(spy).toBeCalled();
    });

    test('createBoard calls onCreate', () => {
        wrapper.find('.new-board').trigger('click');
        wrapper.vm.createBoard();
        expect(onCreate).toBeCalled();
    });

    test('createBoard clears boardTitle', () => {
        wrapper.find('.new-board').trigger('click');
        wrapper.vm.boardTitle = 'some text';
        wrapper.vm.createBoard();
        expect(wrapper.vm.boardTitle).toHaveLength(0);
    });
});
