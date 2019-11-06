import { shallowMount, mount, Wrapper } from '@vue/test-utils';
import FullScreenImage from '@/components/FullScreenImage.vue';

let wrapper: Wrapper<any>;

describe('FullScreenImage', () => {
    beforeEach(() => {
        wrapper = shallowMount(FullScreenImage);
    });

    test('is called', () => {
        expect(wrapper.name()).toBe('FullScreenImage');
        expect(wrapper.isVueInstance()).toBeTruthy();
    });
    test('renders children', () => {
        wrapper = shallowMount(FullScreenImage, {
            slots: {
                default: '<div class="some-component" />',
            },
        });

        expect(wrapper.find('.some-component').classes()[0]).toBe('some-component');
    });
});
