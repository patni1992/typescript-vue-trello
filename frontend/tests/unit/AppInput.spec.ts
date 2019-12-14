import { shallowMount, mount, Wrapper } from '@vue/test-utils';
import AppInput from '@/components/AppInput.vue';

let wrapper: Wrapper<any>;

describe('AppUnput', () => {
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

    test('renders textarea if type is textarea', () => {
        wrapper = shallowMount(AppInput, {
            propsData: {
                type: 'textarea',
            },
        });
        const textarea = wrapper.find('textarea');

        expect(textarea.exists()).toBe(true);
        expect(textarea.classes()).toContain('textarea');
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
        expect(wrapper.emitted().input).toContainEqual(['hello 392439']);
    });
});
