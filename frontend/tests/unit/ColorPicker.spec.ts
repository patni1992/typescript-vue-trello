import { shallowMount, mount, Wrapper } from '@vue/test-utils';
import ColorPicker from '@/components/ColorPicker.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck } from '@fortawesome/pro-regular-svg-icons';
import Vue from 'vue';

library.add(faCheck);

Vue.component('font-awesome-icon', FontAwesomeIcon);

let wrapper: Wrapper<any>;

describe('AppButton', () => {
    const colors = ['rgb(2, 121, 191)', 'rgb(108, 162, 130)', 'rgb(141, 120, 42)', 'rgb(212, 100, 220)'];
    const defaultColor = 'rgb(141, 120, 42)';
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
            expect(wrapper.element.style.backgroundColor).toBe(colors[index]);
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

        expect(dot.element.style.backgroundColor).toBe(defaultColor);
        expect(dot.find('.checked').exists()).toBe(true);
    });
});
