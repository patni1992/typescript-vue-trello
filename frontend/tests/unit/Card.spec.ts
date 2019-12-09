import { shallowMount, Wrapper } from '@vue/test-utils';

import Card from '@/components/Card.vue';

let wrapper: Wrapper<any>;

describe('Card', () => {
    beforeEach(() => {
        wrapper = shallowMount(Card, {
            propsData: {
                card: {
                    color: 'blue',
                    content: '# Test content 1234',
                },
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
});
