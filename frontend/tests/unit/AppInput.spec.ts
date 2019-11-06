import { shallowMount, mount, Wrapper } from '@vue/test-utils';
import AppInput from '@/components/AppInput.vue';

let wrapper: Wrapper<any>;

describe('AppButton', () => {
    beforeEach(() => {
        wrapper = shallowMount(AppInput);
    });

    test('is called', () => {
        expect(wrapper.name()).toBe('AppInput');
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('default type is text', () => {
        expect(wrapper.find('input').attributes().type).toBe('text');
    });

    test('can set type password', () => {
        wrapper = shallowMount(AppInput, {
            propsData: {
                type: 'password',
            },
        });
        expect(wrapper.find('input').attributes().type).toBe('password');
    });

    test('render placeholder', () => {
        wrapper = shallowMount(AppInput, {
            propsData: {
                placeholder: 'Nice input',
            },
        });
        expect(wrapper.find('input').attributes().placeholder).toBe('Nice input');
    });

    test('changing input value emits input event', () => {
        wrapper.find('input').setValue('hello 392439');

        expect(wrapper.emitted().input[0]).toEqual(['hello 392439']);
    });
});
