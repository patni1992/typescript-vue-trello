import { shallowMount } from '@vue/test-utils';
import MarkdownRender from '@/components/MarkdownRender.vue';

describe('MarkdownRender', () => {
    test('is called', () => {
        const wrapper = shallowMount(MarkdownRender, {});
        expect(wrapper.name()).toBe('MarkdownRender');
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('has .markdown-render class applied', () => {
        const wrapper = shallowMount(MarkdownRender, {});
        expect(wrapper.classes()).toContain('markdown-render');
    });

    test('has .markdown-render class applied', () => {
        const wrapper = shallowMount(MarkdownRender, {});
        expect(wrapper.classes()).toContain('markdown-render');
    });

    test('Output slot', () => {
        const wrapper = shallowMount(MarkdownRender, {
            slots: {
                default: '<div id="test-div">hello</div> ',
            },
        });

        expect(wrapper.find('#test-div').exists()).toBe(true);
    });
});
