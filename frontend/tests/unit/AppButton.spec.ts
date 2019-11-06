import { shallowMount, mount, Wrapper } from '@vue/test-utils';
import AppButton from '@/components/AppButton.vue';

let wrapper: Wrapper<any>;

describe('AppButton', () => {
    beforeEach(() => {
        wrapper = shallowMount(AppButton);
    });

    test('is called', () => {
        expect(wrapper.name()).toBe('AppButton');
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('emit a click event', () => {
        const click = jest.fn();
        wrapper = shallowMount(AppButton, {
            listeners: {
                click,
            },
        });
        wrapper.find('.button').trigger('click');
        expect(click).toHaveBeenCalledTimes(1);
    });
});
