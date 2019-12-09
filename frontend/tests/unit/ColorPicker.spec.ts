import { shallowMount, mount, Wrapper } from '@vue/test-utils';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck } from '@fortawesome/pro-regular-svg-icons';
import Vue from 'vue';
import ColorPicker from '@/components/ColorPicker.vue';

library.add(faCheck);

Vue.component('font-awesome-icon', FontAwesomeIcon);

let wrapper: Wrapper<any>;

describe('AppButton', () => {
    const colors = ['red', 'green', 'blue', 'orange'];
    const defaultColor = 'orange';
    beforeEach(() => {
        wrapper = shallowMount(ColorPicker, {
            propsData: {
                colors,
                defaultColor,
            },
        });
    });

    test('is called', () => {
        expect(wrapper.name()).toBe('ColorPicker');
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('renders all supplied colors', () => {
        const dots = wrapper.findAll('.dot');

        expect(dots.length).toBe(4);

        dots.wrappers.forEach((wrapper, index) => {
            expect(wrapper.element.classList.contains(colors[index])).toBe(true);
        });
    });

    test('adds checkmark when clicked', () => {
        const dots = wrapper.findAll('.dot');
        dots.at(1).trigger('click');
        expect(dots.at(1).contains('.checked')).toBe(true);
        expect(wrapper.findAll('.checked').length).toBe(1);

        dots.at(3).trigger('click');
        expect(dots.at(3).contains('.checked')).toBe(true);
        expect(wrapper.findAll('.checked').length).toBe(1);
    });

    test('set default color as checked', () => {
        const colorIndex = colors.indexOf(defaultColor);
        const dot = wrapper.findAll('.dot').at(colorIndex);

        expect(dot.element.classList.contains(defaultColor)).toBe(true);
        expect(dot.find('.checked').exists()).toBe(true);
    });
});
